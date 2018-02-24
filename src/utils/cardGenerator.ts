import {
  CardStack,
  CardStackModelType,
  Card,
  CardModelType,
} from '../models/Card';
import * as uniqid from 'uniqid';
import {
  CardEffect,
  CardEffectKind,
  CardEffectCategory,
  InteractiveCardEffectCategory,
  InteractiveCardEffectResolveType,
} from '../types/cardEffect.types';
import {
  Card as CardType,
  CardCategory,
  CardLibraryRecord,
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

export function printCardById(id: string): CardModelType {
  const library: CardLibraryRecord = cardLibrary;
  const card = library[id];
  if (!card) {
    throw new Error(
      `Error! Card id '${id}' was not found in the card library JSON.`
    );
  }
  return printCard(card);
}

function printDuplicateCards(id: string, qty: number): CardModelType[] {
  return new Array(qty).fill(undefined).map(_ => printCardById(id));
}

export function generateStartingDeck(): CardStackModelType {
  return CardStack.create({
    cards: shuffle([
      ...printDuplicateCards('coin', 8),
      ...printDuplicateCards('shoppersFrenzy', 2),
    ]),
  });
}

export function generateTrashDeck(): CardStackModelType {
  return CardStack.create({
    cards: [printCardById('fishBones')],
  });
}

export function generateMarketDeck(): CardStackModelType {
  return CardStack.create({
    cards: shuffle([
      ...printDuplicateCards('baker', 2),
      ...printDuplicateCards('businessPerson', 1),
      ...printDuplicateCards('postalWorker', 3),
    ]),
  });
}

export function generateShopDeck(): CardStackModelType {
  return CardStack.create({
    cards: shuffle([
      ...printDuplicateCards('basketball', 2),
      ...printDuplicateCards('garbageBag', 1),
      ...printDuplicateCards('expressShipping', 1),
      ...printDuplicateCards('exchangeGoods', 1),
      ...printDuplicateCards('portableFurnace', 1),
    ]),
  });
}

export function generateAlwaysAvailableDeck(): CardStackModelType {
  return CardStack.create({
    cards: [printCardById('gem'), printCardById('shoppingBasket')],
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
  effects: CardEffect[]
): string {
  return (
    `${
      cardCategory === CardCategory.NPC && effects.length > 0 ? 'Defeat: ' : ''
    }` +
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
              return `Gain ${value} ${gainedCard && gainedCard.name}`;
            case CardEffectCategory.GainCardToHand:
              return `Add ${value} ${gainedCard &&
                gainedCard.name} to your hand`;
            case CardEffectCategory.GainMoney:
              return `+${value} Money`;
            case CardEffectCategory.Heal:
              return `Heal ${value}`;
            case CardEffectCategory.IncreaseMaxHealth:
              return `Increase max health by ${value}`;
            case CardEffectCategory.ShuffleCardToDeck:
              return `Shuffle ${value} ${gainedCard &&
                gainedCard.name} into your deck`;
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
