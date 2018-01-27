import { types } from 'mobx-state-tree';
import { Hand } from './Hand';
import { CardStack } from './Card';

export enum PlayerId {
  Player1 = 'Player 1',
  Computer = 'Computer',
}

export const Player = types.model('Player', {
  id: types.string,
  name: types.string,
  health: types.optional(types.number, 15),
  discardPile: CardStack,
  hand: Hand,
  deck: CardStack,
});
