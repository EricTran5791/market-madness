import { types } from 'mobx-state-tree';
import { CardStack } from './Card';

export const Hand = types
  .model('Hand', {
    cardStack: CardStack,
    spentBuyingPower: types.optional(types.number, 0),
    gainedCardStack: CardStack, // Cards that have been gained by the player on their current turn
  })
  .views(self => ({
    get availableBuyingPower() {
      return self.cardStack.totalBuyingPower - self.spentBuyingPower;
    },
  }))
  .actions(self => ({
    spendBuyingPower(num: number): boolean {
      if (num <= self.availableBuyingPower) {
        self.spentBuyingPower += num;
        return true;
      }
      return false;
    },
  }));
