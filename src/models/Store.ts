import { types } from 'mobx-state-tree';
import { CardModelType } from './Card';
import { GameState, GamePhase, GameLogEntryCategory } from './GameState';
import { Player, PlayerId } from './Player';
import { CardEffectCategory } from './CardEffect';
import { Market } from './Market';
import { Bank } from './Bank';

export const Store = types
  .model('Store', {
    market: Market,
    bank: Bank,
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
    playCard(card: CardModelType) {
      // TODO: Move this logic to utils
      card.effects.forEach(effect => {
        const { category, value } = effect;
        const currentPlayer = self.currentPlayer;
        switch (category) {
          case CardEffectCategory.Damage:
            self.gameState.addGameLogEntry(GameLogEntryCategory.Attack, {
              cardName: card.name,
              target: self.otherPlayer.id,
              value: value,
            });
            self.otherPlayer.health -= value;
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
    },
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
  }));

export type StoreType = typeof Store.Type;
