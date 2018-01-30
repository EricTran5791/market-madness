import { types } from 'mobx-state-tree';
import { CardStack } from './Card';

export const Market = types.model('Market', {
  cardStack: CardStack,
});
