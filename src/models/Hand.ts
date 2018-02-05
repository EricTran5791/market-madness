import { types, getParent } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';
import { StoreType } from './Store';

export const Hand = types
  .model('Hand', {
    cardStack: CardStack,
    availableBuyingPower: types.optional(types.number, 0),
    spentBuyingPower: types.optional(types.number, 0),
    availableAttackValue: types.optional(types.number, 0),
    spentAttackValue: types.optional(types.number, 0),
    gainedCardStack: CardStack, // Cards that have been gained by the player on their current turn
  })
  .actions(self => ({
    increaseBuyingPower(card: CardModelType) {
      self.availableBuyingPower += card.buyingPower;
    },
    spendBuyingPower(num: number): boolean {
      if (num <= self.availableBuyingPower) {
        self.availableBuyingPower -= num;
        self.spentBuyingPower += num;
        return true;
      }
      return false;
    },
    increaseAttackValue(num: number) {
      self.availableAttackValue += num;
    },
    spendAttackValue(num: number): boolean {
      if (num <= self.availableAttackValue) {
        self.availableAttackValue -= num;
        self.spentAttackValue += num;
        return true;
      }
      return false;
    },
    trashCard(card: CardModelType) {
      const store: StoreType = getParent(getParent(getParent(self)));
      store.trash.trashCard(card);
    },
  }));
