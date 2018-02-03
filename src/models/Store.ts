import { types, detach, flow } from 'mobx-state-tree';
import { GameState, GamePhase, GameLogEntryCategory } from './GameState';
import { Player, PlayerId } from './Player';
import { Market } from './Market';
import { Trash } from './Trash';
import {
  CardEffectCategory,
  CardEffectKind,
  BasicCardEffectSnapshotType,
} from '../models/CardEffect';
import { CardModelType } from '../models/Card';

export const Store = types
  .model('Store', {
    trash: Trash,
    market: Market,
    players: types.array(Player),
    gameState: GameState,
  })
  .views(self => ({
    get currentGamePhase() {
      return self.gameState.currentGamePhase;
    },
    getPlayer(id: string) {
      return self.players.find(player => player.id === id);
    },
    get currentPlayer() {
      return self.gameState.currentPlayer;
    },
    get otherPlayer() {
      return self.players.find(
        player => player.id !== self.gameState.currentPlayer.id
      );
    },
  }))
  .actions(self => {
    function changeCurrentPlayer() {
      self.gameState.currentPlayer = self.otherPlayer;
    }

    function createNewGame() {
      self.gameState.currentGamePhase = GamePhase.Player1Turn;
    }

    function endTurn() {
      self.gameState.currentGamePhase =
        self.otherPlayer.id === PlayerId.Player1
          ? GamePhase.Player2Turn
          : GamePhase.Player1Turn;
    }

    function buyMarketCard(card: CardModelType) {
      if (self.currentPlayer.hand.spendBuyingPower(card.cost)) {
        self.gameState.addGameLogEntry(GameLogEntryCategory.Buy, {
          cardName: card.name,
        });
        self.currentPlayer.hand.gainedCardStack.add(detach(card));
      }
    }

    const processEffects = flow(function*(
      card: CardModelType,
      effects: BasicCardEffectSnapshotType[]
    ) {
      if (effects.length > 0) {
        yield processEffect(card, effects[0]);
        processEffects(card, effects.slice(1));
      }
    });

    function processEffect(
      card: CardModelType,
      effect: BasicCardEffectSnapshotType
    ): Promise<void> {
      const promise = new Promise<void>((resolve, reject) => {
        const currentPlayer = self.currentPlayer;
        if (effect.kind === CardEffectKind.Basic) {
          const { category, value }: BasicCardEffectSnapshotType = effect;
          switch (category) {
            case CardEffectCategory.Damage:
              self.gameState.addGameLogEntry(GameLogEntryCategory.Attack, {
                cardName: card.name,
                targets: [self.otherPlayer.id],
                value: value,
              });
              self.otherPlayer.takeDamage(value);
              break;
            case CardEffectCategory.Draw:
              const cardsDrawn = currentPlayer.drawFromDeck(value);
              self.gameState.addGameLogEntry(GameLogEntryCategory.Draw, {
                cardName: card.name,
                value: cardsDrawn,
              });
              break;
            case CardEffectCategory.Heal:
              const amtHealed = currentPlayer.heal(value);
              self.gameState.addGameLogEntry(GameLogEntryCategory.Heal, {
                cardName: card.name,
                value: amtHealed,
              });
              break;
            case CardEffectCategory.IncreaseMaxHealth:
              currentPlayer.increaseMaxHealth(value);
              self.gameState.addGameLogEntry(
                GameLogEntryCategory.IncreaseMaxHealth,
                {
                  cardName: card.name,
                  value: value,
                }
              );
              break;
            case CardEffectCategory.TrashSelf:
              self.trash.trashCard(card);
              self.gameState.addGameLogEntry(GameLogEntryCategory.Trash, {
                cardName: card.name,
                targets: [card.name],
              });
              break;
            default:
              break;
          }
        }
        resolve();
      });
      return promise;
    }

    function playCard(card: CardModelType) {
      card.isPlayed = true;
      processEffects(card, card.effects);
      return;
    }

    return {
      changeCurrentPlayer,
      createNewGame,
      endTurn,
      buyMarketCard,
      processEffects,
      processEffect,
      playCard,
    };
  });

export type StoreType = typeof Store.Type;
