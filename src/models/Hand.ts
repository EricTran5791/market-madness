import { types, getParent } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';
import { StoreType } from './Store';

export const Hand = types
  .model('Hand', {
    cardStack: CardStack,
    availableMoney: types.optional(types.number, 0),
    spentMoney: types.optional(types.number, 0),
    availableAttack: types.optional(types.number, 0),
    spentAttack: types.optional(types.number, 0),
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
    increaseAttack(num: number) {
      self.availableAttack += num;
    },
    spendAttack(num: number): boolean {
      if (num <= self.availableAttack) {
        self.availableAttack -= num;
        self.spentAttack += num;
        return true;
      }
      return false;
    },
    trashCard(card: CardModelType) {
      const store: StoreType = getParent(getParent(getParent(self)));
      store.trash.trashCard(card);
    },
  }));
