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

// TODO: Improve with JSON card database
export function printCardById(id: string): CardModelType {
  const card =
    cards.ActionCards[id] ||
    cards.ConsumableCards[id] ||
    cards.ItemCards[id] ||
    cards.MoneyCards[id];
  return printCard(card);
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
      ...printDuplicateCards(cards.MoneyCards.coin, 8),
      ...printDuplicateCards(cards.ActionCards.dropShipment, 2),
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
      ...printDuplicateCards(cards.ConsumableCards.apple, 2),
      printCard(cards.ItemCards.wetMop),
      printCard(cards.ItemCards.coatRack),
      ...printDuplicateCards(cards.ActionCards.exchangeGoods, 2),
      ...printDuplicateCards(cards.ActionCards.expressShipping, 2),
      ...printDuplicateCards(cards.ItemCards.garbageBag, 2),
      ...printDuplicateCards(cards.NPCCards.baker, 2),
      ...printDuplicateCards(cards.NPCCards.businessPerson, 1),
      ...printDuplicateCards(cards.NPCCards.postalWorker, 2),
    ]),
  });
}

export function generateAlwaysAvailableDeck(): CardStackModelType {
  return CardStack.create({
    cards: [
      printCard(cards.MoneyCards.gem),
      printCard(cards.ItemCards.shoppingBasket),
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
