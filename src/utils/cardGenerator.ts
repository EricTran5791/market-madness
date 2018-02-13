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
import { Card as CardType, CardCategory } from '../types/cardTypes';

export function generateEmptyDeck(): CardStackModelType {
  return CardStack.create({ cards: [] });
}

export function printCard(card: CardType): CardModelType {
  return Card.create({
    id: uniqid(),
    ...card,
  });
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
      ...printDuplicateCards(cards.NPCCards.janitor, 1),
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
          const { category, value, gainedCardId } = effect;
          switch (category) {
            case CardEffectCategory.Draw:
              return `Draw ${value} card${value > 1 ? 's' : ''}`;
            case CardEffectCategory.GainAttack:
              return `+${value} Attack`;
            case CardEffectCategory.GainCardToDiscardPile:
              // TODO: Map card id to card name once the JSON card library is done
              return `Gain ${value} ${gainedCardId}`;
            case CardEffectCategory.GainCardToHand:
              // TODO: Map card id to card name once the JSON card library is done
              return `Add ${value} ${gainedCardId} to your hand`;
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
