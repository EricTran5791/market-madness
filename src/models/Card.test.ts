import { Card, CardModelType, CardStack, CardStackModelType } from './Card';
import * as cards from '../utils/cardLibrary';
import { getSnapshot } from 'mobx-state-tree';

let mockCard: CardModelType;
let mockCardStack: CardStackModelType;

beforeEach(() => {
  mockCard = Card.create(cards.ActionCards.apple);
  mockCardStack = CardStack.create({
    cards: [mockCard],
  });
});

it('creates a Card', () => {
  expect(getSnapshot(mockCard)).toMatchSnapshot();
});

it('creates a CardStack', () => {
  expect(getSnapshot(mockCardStack)).toMatchSnapshot();
});

it('adds a card to the CardStack', () => {
  mockCardStack.add(Card.create(cards.ActionCards.bananas));
  expect(getSnapshot(mockCardStack)).toMatchSnapshot();
});

it('removes a card from the CardStack', () => {
  mockCardStack.remove(mockCard);
  expect(getSnapshot(mockCardStack)).toMatchSnapshot();
});
