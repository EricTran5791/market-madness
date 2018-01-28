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

export function generateMarketDeck(): CardStackModelType {
  return CardStack.create({
    cards: shuffle([
      ...printDuplicateCards(cards.ItemCards.apple, 2),
      ...printDuplicateCards(cards.ItemCards.bananas, 2),
      Card.create(cards.ItemCards.couponBook),
      Card.create(cards.ItemCards.dragonFruit),
      ...printDuplicateCards(cards.AttackCards.basketball, 2),
      Card.create(cards.AttackCards.tennisRacket),
      ...printDuplicateCards(cards.MoneyCards.gem, 2),
      ...printDuplicateCards(cards.ActionCards.expressShipping, 2),
      ...printDuplicateCards(cards.ItemCards.multivitamins, 2),
    ]),
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
