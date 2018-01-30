import { types, detach } from 'mobx-state-tree';
import { GameState, GamePhase, GameLogEntryCategory } from './GameState';
import { Player, PlayerId } from './Player';
import { Market } from './Market';
import { Trash } from './Trash';
import { CardEffectCategory } from '../models/CardEffect';
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
  .actions(self => ({
    changeCurrentPlayer() {
      self.gameState.currentPlayer = self.otherPlayer;
    },
    createNewGame() {
      self.gameState.currentGamePhase = GamePhase.PlayersTurn;
    },
    endTurn() {
      self.gameState.currentGamePhase =
        self.otherPlayer.id === PlayerId.Player1
          ? GamePhase.ComputersTurn
          : GamePhase.PlayersTurn;
    },
    buyMarketCard(card: CardModelType) {
      if (self.currentPlayer.hand.spendBuyingPower(card.cost)) {
        self.gameState.addGameLogEntry(GameLogEntryCategory.Buy, {
          cardName: card.name,
        });
        self.currentPlayer.hand.gainedCardStack.add(detach(card));
      }
    },
    trashCard(card: CardModelType) {
      self.gameState.addGameLogEntry(GameLogEntryCategory.Buy, {
        cardName: card.name,
      });
      self.trash.cardStack.add(detach(card));
    },
    playCard(card: CardModelType) {
      card.effects.forEach(effect => {
        const { category, value } = effect;
        const currentPlayer = self.currentPlayer;
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
          default:
            break;
        }
      });
      card.isPlayed = true;
      return;
    },
  }));

export type StoreType = typeof Store.Type;
