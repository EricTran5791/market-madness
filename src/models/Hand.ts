import { types, getParent } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';
import { StoreType } from './Store';
import { CardKind } from '../types/cardTypes';

export const Hand = types
  .model('Hand', {
    cardStack: CardStack,
    availableMoney: types.optional(types.number, 0),
    spentMoney: types.optional(types.number, 0),
    availableAttack: types.optional(types.number, 0),
    spentAttack: types.optional(types.number, 0),
  })
  .views(self => ({
    get unplayedMoneyCards() {
      return self.cardStack.cards.filter(
        _ => !_.isPlayed && _.kind === CardKind.Money
      );
    },
  }))
  .actions(self => ({
    addCard(card: CardModelType) {
      self.cardStack.add(card);
    },
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
    playAllMoneyCards() {
      const store: StoreType = getParent(getParent(getParent(self)));
      self.unplayedMoneyCards.forEach(_ => store.playCard(_));
    },
  }));
