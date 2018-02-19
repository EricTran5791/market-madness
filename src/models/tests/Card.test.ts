import { Card, CardModelType, CardStack, CardStackModelType } from '../Card';
import { getSnapshot } from 'mobx-state-tree';
import { initialCardState } from '../../types/cardTypes';

describe('Card and CardStack Model', () => {
  let mockCard: CardModelType;
  let mockCardStack: CardStackModelType;

  beforeEach(() => {
    mockCard = Card.create({
      ...initialCardState,
      uniqid: '1',
      id: '1',
      name: 'Card 1',
    });
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
    mockCardStack.add(
      Card.create({
        ...initialCardState,
        uniqid: '2',
        id: '2',
        name: 'Card 2',
      })
    );
    expect(getSnapshot(mockCardStack)).toMatchSnapshot();
  });

  it('removes a card from the CardStack', () => {
    mockCardStack.remove(mockCard);
    expect(getSnapshot(mockCardStack)).toMatchSnapshot();
  });
});
