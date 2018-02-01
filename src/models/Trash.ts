import { types, detach } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';

export const Trash = types
  .model('Trash', {
    cardStack: CardStack,
  })
  .actions(self => ({
    trashCard(card: CardModelType) {
      self.cardStack.add(detach(card));
    },
  }));
