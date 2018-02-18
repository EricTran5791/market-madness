import { types, applySnapshot } from 'mobx-state-tree';
import { Card } from './Card';
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
  }));

export type CardLibraryModelType = typeof CardLibrary.Type;
