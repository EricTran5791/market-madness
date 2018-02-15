import {
  CardStack,
  CardStackModelType,
  Card,
  CardModelType,
} from '../models/Card';
import * as cards from './cardLibrary';
import * as uniqid from 'uniqid';
import {
  CardEffect,
  CardEffectKind,
  CardEffectCategory,
  InteractiveCardEffectCategory,
  InteractiveCardEffectResolveType,
} from '../types/cardEffect.types';
import { List } from 'immutable';
import {
  Card as CardType,
  CardCategory,
  CardLibrary,
} from '../types/cardTypes';

import cardLibrary from './cardLibrary.json';

export function generateEmptyDeck(): CardStackModelType {
  return CardStack.create({ cards: [] });
}

export function printCard(card: CardType): CardModelType {
  return Card.create({
    uniqid: uniqid(),
    ...card,
  });
}

export function printCardByIdNew(id: string): CardModelType {
  const library: CardLibrary = cardLibrary;
  const card = library[id];
  if (!card) {
    throw new Error(
      `Error! Card id '${id}' was not found in the card library JSON.`
    );
  }
  return printCard(card);
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

function printDuplicateCards(card: CardType, qty: number): CardModelType[] {
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
      ...printDuplicateCards(cards.ActionCards.exchangeGoods, 3),
      ...printDuplicateCards(cards.ActionCards.expressShipping, 2),
      ...printDuplicateCards(cards.ConsumableCards.energyDrink, 2),
      ...printDuplicateCards(cards.ItemCards.basketball, 3),
      ...printDuplicateCards(cards.ItemCards.garbageBag, 2),
      ...printDuplicateCards(cards.ItemCards.portableFurnace, 2),
      ...printDuplicateCards(cards.NPCCards.baker, 1),
      ...printDuplicateCards(cards.NPCCards.businessPerson, 1),
      ...printDuplicateCards(cards.NPCCards.dietician, 1),
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

export function generateCardDescription(
  cardCategory: CardCategory,
  effects: List<CardEffect>
): string {
  return (
    `${cardCategory === CardCategory.NPC ? 'Defeat: ' : ''}` +
    effects
      .map((effect: CardEffect) => {
        if (effect.kind === CardEffectKind.Basic) {
          const { category, value, gainedCard } = effect;
          switch (category) {
            case CardEffectCategory.Draw:
              return `Draw ${value} card${value > 1 ? 's' : ''}`;
            case CardEffectCategory.GainAttack:
              return `+${value} Attack`;
            case CardEffectCategory.GainCardToDiscardPile:
              // TODO: Map card id to card name once the JSON card library is done
              return `Gain ${value} ${gainedCard && gainedCard.name}`;
            case CardEffectCategory.GainCardToHand:
              // TODO: Map card id to card name once the JSON card library is done
              return `Add ${value} ${gainedCard &&
                gainedCard.name} to your hand`;
            case CardEffectCategory.GainMoney:
              return `+${value} Money`;
            case CardEffectCategory.Heal:
              return `Heal ${value}`;
            case CardEffectCategory.IncreaseMaxHealth:
              return `Increase max health by ${value}`;
            case CardEffectCategory.TrashSelf:
              return `Trash this card`;
            default:
              console.error(
                `Error: No description template available for basic card effect category '${category}'.`
              );
              return '';
          }
        } else if (effect.kind === CardEffectKind.Interactive) {
          const { category, numCardsToResolve, resolveType } = effect;
          const optionalText =
            resolveType === InteractiveCardEffectResolveType.Optional
              ? 'up to '
              : '';
          switch (category) {
            case InteractiveCardEffectCategory.Discard:
              return `Discard ${optionalText}${numCardsToResolve} cards`;
            case InteractiveCardEffectCategory.Trash:
              return `Trash ${optionalText}${numCardsToResolve} cards`;
            default:
              console.error(
                `Error: No description template available for interactive card effect category '${category}'.`
              );
              return '';
          }
        }
        return '';
      })
      .join(', ')
  );
}

/** Converts a name to a camel case id.
 * https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case?noredirect=1&lq=1
 */
export function generateIdFromName(name: string) {
  return (
    name
      .toLowerCase()
      // Replaces any - or _ characters with a space
      .replace(/[-_]+/g, ' ')
      // Removes any non alphanumeric characters
      .replace(/[^\w\s]/g, '')
      // Uppercases the first character in each group immediately following a space (delimited by spaces)
      .replace(/ (.)/g, _ => {
        return _.toUpperCase();
      })
      // Removes spaces
      .replace(/ /g, '')
  );
}
