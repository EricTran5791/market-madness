import { types, applySnapshot } from 'mobx-state-tree';
import { Card, CardModelSnapshotType, CardModelType } from './Card';
import cardLibrary from '../utils/cardLibrary.json';
import { CardLibrary as CardLibraryRecordType } from '../types/cardTypes';
import { printCardByIdNew } from '../utils/cardGenerator';

export const CardLibrary = types
  .model('CardLibrary', {
    cards: types.optional(types.array(Card), []),
  })
  .views(self => ({
    get cardLibraryJson() {
      return self.cards.map(_ => _.cardJson).join(',\n');
    },
    getCardById(id: string) {
      return self.cards.find(_ => _.id === id);
    },
  }))
  .actions(self => ({
    afterCreate() {
      const library = cardLibrary as CardLibraryRecordType;
      applySnapshot(
        self.cards,
        Object.keys(library).map(id => {
          return printCardByIdNew(id);
        })
      );
    },
    updateCard(id: string, snapshot: CardModelSnapshotType): boolean {
      // If the id was changed in the snapshot, check that there isn't a card with the same id as the snapshot
      const duplicateId = id !== snapshot.id && self.getCardById(snapshot.id);
      const updatedCard = self.cards.find(_ => _.id === id);
      if (updatedCard && !duplicateId) {
        applySnapshot(updatedCard, snapshot);
        return true;
      } else {
        return false;
      }
    },
    addCard(card: CardModelType): boolean {
      const duplicateId = self.getCardById(card.id);
      if (!duplicateId) {
        self.cards.push(card);
        return true;
      } else {
        return false;
      }
    },
    deleteCard(id: string) {
      const deletedCard = self.cards.find(_ => _.id === id);
      if (deletedCard) {
        self.cards.remove(deletedCard);
      }
    },
  }));

export type CardLibraryModelType = typeof CardLibrary.Type;
