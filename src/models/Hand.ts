import { types, getParent } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';
import { StoreType } from './Store';

export const Hand = types
  .model('Hand', {
    cardStack: CardStack,
    availableMoney: types.optional(types.number, 0),
    spentMoney: types.optional(types.number, 0),
    availableAttackValue: types.optional(types.number, 0),
    spentAttackValue: types.optional(types.number, 0),
  })
  .actions(self => ({
    increaseMoney(num: number) {
      self.availableMoney += num;
    },
    spendMoney(num: number): boolean {
      if (num <= self.availableMoney) {
        self.availableMoney -= num;
        self.spentMoney += num;
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
