import {
  CardEffectKind,
  CardEffectCategory,
  InteractiveCardEffectCategory,
  InteractiveCardEffectResolveType,
} from '../models/CardEffect';

interface BasicCardEffect {
  kind: CardEffectKind.Basic;
  category: CardEffectCategory;
  value?: number;
  gainedCardName?: string;
}

interface InteractiveCardEffect {
  kind: CardEffectKind.Interactive;
  category: InteractiveCardEffectCategory;
  numCardsToResolve?: number;
  resolveType: InteractiveCardEffectResolveType;
}

export type CardEffect = BasicCardEffect | InteractiveCardEffect;

export const initialBasicCardEffect: BasicCardEffect = {
  kind: CardEffectKind.Basic,
  category: CardEffectCategory.Draw,
  value: 0,
  gainedCardName: '',
};

export const initialInteractiveCardEffect: InteractiveCardEffect = {
  kind: CardEffectKind.Interactive,
  category: InteractiveCardEffectCategory.OptionalTrash,
  numCardsToResolve: 0,
  resolveType: InteractiveCardEffectResolveType.Optional,
};
