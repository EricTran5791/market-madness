import { types } from 'mobx-state-tree';
import { CardStack } from './Card';

export const Hand = types
  .model('Hand', {
    cardStack: CardStack,
    spentBuyingPower: types.optional(types.number, 0),
    spentAttackValue: types.optional(types.number, 0),
  })
  .views(self => ({
    get availableBuyingPower() {
      return self.cardStack.totalBuyingPower - self.spentBuyingPower;
    },
    get availableAttackValue() {
      return self.cardStack.totalAttackValue - self.spentAttackValue;
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
    spendAttackValue(num: number): boolean {
      if (num <= self.availableAttackValue) {
        self.spentAttackValue += num;
        return true;
      }
      return false;
    },
  }));
