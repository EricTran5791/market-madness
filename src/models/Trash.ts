import { types } from 'mobx-state-tree';
import { CardStack } from './Card';

export const Trash = types.model('Trash', {
  cardStack: CardStack,
});
