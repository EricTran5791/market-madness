import {
  CardStack,
  CardStackModelType,
  Card,
  CardModelType,
  CardModelSnapshotType,
} from '../models/Card';
import * as cards from './cardLibrary';
import * as uniqid from 'uniqid';

export function generateEmptyDeck(): CardStackModelType {
  return CardStack.create({ cards: [] });
}

export function printCard(card: CardModelSnapshotType): CardModelType {
  return Card.create({ id: uniqid(), ...card });
}

function printDuplicateCards(
  card: CardModelSnapshotType,
  qty: number
): CardModelType[] {
  return new Array(qty).fill(undefined).map(_ => printCard(card));
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
    cards: [printCard(cards.ItemCards.fishBones)],
  });
}

export function generateMarketDeck(): CardStackModelType {
  return CardStack.create({
    cards: shuffle([
      ...printDuplicateCards(cards.ItemCards.apple, 2),
      ...printDuplicateCards(cards.ItemCards.bananas, 2),
      // printCard(cards.ItemCards.couponBook),
      printCard(cards.ItemCards.durian),
      ...printDuplicateCards(cards.AttackCards.basketball, 2),
      printCard(cards.AttackCards.tennisRacket),
      ...printDuplicateCards(cards.ActionCards.expressShipping, 2),
      // ...printDuplicateCards(cards.ItemCards.multivitamins, 2),
      ...printDuplicateCards(cards.ItemCards.garbageBag, 2),
      ...printDuplicateCards(cards.MoneyCards.gem, 2),
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

export function shuffleCardStackModel(
  cardStack: CardStackModelType
): CardStackModelType {
  for (let i = cardStack.cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    cardStack.cards.move(i, j);
  }
  return cardStack;
}
