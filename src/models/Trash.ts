import { types, getParent, detach } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';
import { GameLogEntryCategory } from './GameState';

export const Trash = types
  .model('Trash', {
    cardStack: CardStack,
  })
  .actions(self => ({
    trashCard(card: CardModelType) {
      getParent(self).gameState.addGameLogEntry(GameLogEntryCategory.Buy, {
        cardName: card.name,
      });
      self.cardStack.add(detach(card));
    },
  }));
