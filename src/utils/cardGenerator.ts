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
    cards: [
      ...printDuplicateCards(cards.MoneyCards.coin, 7),
      ...printDuplicateCards(cards.AttackCards.punch, 3),
    ],
  });
}

export function generateShopDeck(): CardStackModelType {
  return CardStack.create({
    cards: [
      Card.create(cards.ActionCards.apple),
      Card.create(cards.ActionCards.bananas),
      Card.create(cards.ActionCards.couponBook),
    ],
  });
}
