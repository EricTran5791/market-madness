import { types, getParent, getSnapshot } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';
import { GameLogEntryCategory } from './GameState';
import { printCard } from '../utils/cardGenerator';

export const Bank = types
  .model('Bank', {
    cardStack: CardStack,
  })
  .actions(self => ({
    buyBankCard(card: CardModelType) {
      if (getParent(self).currentPlayer.hand.spendBuyingPower(card.cost)) {
        getParent(self).gameState.addGameLogEntry(GameLogEntryCategory.Buy, {
          cardName: card.name,
        });
        getParent(self).currentPlayer.hand.gainedCardStack.add(
          printCard(getSnapshot(card))
        );
      }
    },
  }));
