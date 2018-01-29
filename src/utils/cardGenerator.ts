import {
  CardStack,
  CardStackModelType,
  Card,
  CardModelType,
  CardModelSnapshotType,
} from '../models/Card';
import * as cards from './cardLibrary';

export function generateEmptyDeck(): CardStackModelType {
  return CardStack.create({ cards: [] });
}

function printDuplicateCards(
  card: CardModelSnapshotType,
  qty: number
): CardModelType[] {
  return new Array(qty).fill(undefined).map(_ => Card.create(card));
}

export function generateStartingDeck(): CardStackModelType {
  return CardStack.create({
    cards: shuffle([
      ...printDuplicateCards(cards.MoneyCards.coin, 7),
      ...printDuplicateCards(cards.AttackCards.slap, 3),
    ]),
  });
}

export function generateTrashDeck(): CardStackModelType {
  return CardStack.create({
    cards: [Card.create(cards.ItemCards.fishBones)],
  });
}

export function generateMarketDeck(): CardStackModelType {
  return CardStack.create({
    cards: shuffle([
      ...printDuplicateCards(cards.ItemCards.apple, 2),
      ...printDuplicateCards(cards.ItemCards.bananas, 2),
      // Card.create(cards.ItemCards.couponBook),
      ...printDuplicateCards(cards.ItemCards.durian, 2),
      ...printDuplicateCards(cards.AttackCards.basketball, 2),
      Card.create(cards.AttackCards.tennisRacket),
      ...printDuplicateCards(cards.ActionCards.expressShipping, 2),
      ...printDuplicateCards(cards.ItemCards.multivitamins, 2),
    ]),
  });
}

export function generateBankDeck(): CardStackModelType {
  return CardStack.create({
    cards: [
      Card.create(cards.MoneyCards.coin),
      Card.create(cards.MoneyCards.gem),
      Card.create(cards.AttackCards.slap),
    ],
  });
}
// Durstenfeld Shuffle
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function shuffleCardStackModel(
  cardStack: CardStackModelType
): CardStackModelType {
  for (let i = cardStack.cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    cardStack.cards.move(i, j);
  }
  return cardStack;
}
