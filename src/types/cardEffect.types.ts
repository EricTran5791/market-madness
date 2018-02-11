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
