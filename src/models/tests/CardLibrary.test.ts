import { CardLibraryModelType, CardLibrary } from '../CardLibrary';
import { getSnapshot } from 'mobx-state-tree';
import { Card } from '../Card';
import { initialCardState } from '../../types/cardTypes';

describe('Card Library', () => {
  let mockCardLibrary: CardLibraryModelType;
  const mockCard = {
    ...initialCardState,
    uniqid: '1',
    id: '1',
    name: 'Card 1',
  };

  beforeEach(() => {
    mockCardLibrary = CardLibrary.create({
      cards: [
        Card.create({ ...mockCard }),
        Card.create({
          ...initialCardState,
          uniqid: '2',
          id: '2',
          name: 'Card 2',
        }),
        Card.create({
          ...initialCardState,
          uniqid: '3',
          id: '3',
          name: 'Card 3',
        }),
      ],
    });
  });

  it('creates a Card Library', () => {
    expect(getSnapshot(mockCardLibrary)).toMatchSnapshot();
  });

  it('gets a card by id from the library', () => {
    expect(mockCardLibrary.getCardById('1')).toMatchSnapshot();
    expect(mockCardLibrary.getCardById('2')).toMatchSnapshot();
    expect(mockCardLibrary.getCardById('undefined')).toMatchSnapshot();
  });

  it('updates a card in the library', () => {
    expect(
      mockCardLibrary.updateCard('1', { ...mockCard, name: 'Card 1 New' })
    ).toMatchSnapshot();
    expect(mockCardLibrary.getCardById('1')).toMatchSnapshot();
  });

  it('fails to update a card in the library when the snapshot id is being used by another card in the library', () => {
    expect(
      mockCardLibrary.updateCard('1', {
        ...mockCard,
        id: '2',
        name: 'Card 1 New',
      })
    ).toMatchSnapshot();
    expect(mockCardLibrary.getCardById('1')).toMatchSnapshot();
    expect(mockCardLibrary.getCardById('2')).toMatchSnapshot();
  });

  it('adds a new card to the library', () => {
    expect(
      mockCardLibrary.addCard(
        Card.create({
          ...initialCardState,
          uniqid: 'new',
          id: 'new',
          name: 'New Card',
        })
      )
    ).toMatchSnapshot();
  });

  it(`fails to add a new card to the library when the new card id
    is already being used by another card in the library`, () => {
    expect(
      mockCardLibrary.addCard(
        Card.create({
          ...initialCardState,
          uniqid: 'new',
          id: '1',
          name: 'New Card',
        })
      )
    ).toMatchSnapshot();
    expect(mockCardLibrary.getCardById('1')).toMatchSnapshot();
  });

  it('deletes a card in the library', () => {
    expect(mockCardLibrary.getCardById('1')).toMatchSnapshot();
    mockCardLibrary.deleteCard('1');
    expect(mockCardLibrary.getCardById('1')).toMatchSnapshot();
  });

  it('validates a valid card', () => {
    expect(
      mockCardLibrary.validateCard({ card: mockCard, targetId: '' })
    ).toMatchSnapshot();
  });

  it('invalidates a card where the target id is already present in the library', () => {
    expect(
      mockCardLibrary.validateCard({ card: mockCard, targetId: '2' })
    ).toMatchSnapshot();
  });

  it('invalidates a card where the id or name is empty', () => {
    expect(
      mockCardLibrary.validateCard({
        card: { ...initialCardState, id: '' },
        targetId: '',
      })
    ).toMatchSnapshot();
    expect(
      mockCardLibrary.validateCard({
        card: { ...initialCardState, id: 'new', name: '' },
        targetId: '',
      })
    ).toMatchSnapshot();
  });
});
