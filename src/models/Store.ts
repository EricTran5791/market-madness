import { types, detach } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';
import { GameState, GamePhase, GameLogEntryCategory } from './GameState';
import { Player } from './Player';
import { CardEffectCategory } from './CardEffect';

export const Store = types
  .model('Store', {
    shopDeck: CardStack,
    players: types.array(Player),
    gameState: GameState,
  })
  .views(self => ({
    getPlayer(id: string) {
      return self.players.find(player => player.id === id);
    },
    get currentPlayer() {
      return self.players.find(
        player => player.id === self.gameState.currentPlayerId
      );
    },
    get otherPlayer() {
      return self.players.find(
        player => player.id !== self.gameState.currentPlayerId
      );
    },
  }))
  .actions(self => ({
    buyShopCard(card: CardModelType) {
      if (self.currentPlayer.hand.spendBuyingPower(card.cost)) {
        self.gameState.addGameLogEntry(GameLogEntryCategory.Buy, {
          cardName: card.name,
        });
        self.currentPlayer.hand.gainedCardStack.add(detach(card));
      }
    },
    playCard(card: CardModelType) {
      // TODO: Move this logic to utils
      card.effects.forEach(effect => {
        const { category, value } = effect;
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
            const cardsDrawn = self.currentPlayer.drawFromDeck(value);
            self.gameState.addGameLogEntry(GameLogEntryCategory.Draw, {
              cardName: card.name,
              value: cardsDrawn,
            });
            break;
          case CardEffectCategory.Heal:
            self.gameState.addGameLogEntry(GameLogEntryCategory.Heal, {
              cardName: card.name,
              value: value,
            });
            self.currentPlayer.health += value;
            break;
          default:
            break;
        }
      });
      card.isPlayed = true;
    },
    changeCurrentPlayer() {
      self.gameState.currentPlayerId = self.players.find(
        player => player.id !== self.gameState.currentPlayerId
      ).id;
    },
    startGame() {
      self.gameState.currentGamePhase = GamePhase.turnStart;
    },
    endTurn() {
      self.gameState.currentGamePhase = GamePhase.turnEnd;
    },
  }));

export type StoreType = typeof Store.Type;
