import { types } from 'mobx-state-tree';
import { CardStack } from './Card';

export const Store = types.model('Store', {
  deck: CardStack,
  shopDeck: CardStack,
});

export type StoreType = typeof Store.Type;
