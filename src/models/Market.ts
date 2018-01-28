import { types, getParent, detach } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';
import { GameLogEntryCategory } from './GameState';

export const Market = types
  .model('Market', {
    cardStack: CardStack,
  })
  .actions(self => ({
    buyMarketCard(card: CardModelType) {
      if (getParent(self).currentPlayer.hand.spendBuyingPower(card.cost)) {
        getParent(self).gameState.addGameLogEntry(GameLogEntryCategory.Buy, {
          cardName: card.name,
        });
        getParent(self).currentPlayer.hand.gainedCardStack.add(detach(card));
      }
    },
  }));
