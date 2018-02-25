import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { CardModelType } from '../models/Card';
import { withProps } from '../types/withProps';
import { CardCategory, CardCostKind, CardKind } from '../types/cardTypes';

type CardPosition = {
  zIndex?: number;
  xPos?: number;
  yPos?: number;
  rotationDeg?: number;
  position?: string;
};

interface Props {
  model?: CardModelType;
  cardPosition?: CardPosition;
  onClick?: () => void;
}

interface StyledCardProps {
  kind: string;
  category: string;
  cardPosition?: CardPosition;
  showHoverAnimation: boolean;
  isPlayed: boolean;
}

const BasicCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 95px;
  height: 125px;
  padding: 8px;
  border-radius: 8px;
  border: 3px solid #111;
`;

const FaceDownCard = BasicCard.extend`
  background-color: #222222;
`;

const hover = keyframes`
  0% {
    transform: translateY(-10%) scale(1.08);
  }
  100% {
    transform: translateY(-15%) scale(1.08);
  }
`;

const StyledCard = withProps<StyledCardProps>()(BasicCard.extend)`
  cursor: ${({ showHoverAnimation }: StyledCardProps): string =>
    showHoverAnimation ? 'pointer' : 'default'};
  ${({ cardPosition }: StyledCardProps): string =>
    cardPosition && cardPosition.zIndex
      ? `z-index: ${cardPosition.zIndex}`
      : ''};
  background-color: ${({ category, kind }: StyledCardProps): string => {
    switch (category) {
      case CardCategory.Groceries:
        return '#03A93B';
      case CardCategory.Artisanal:
        return '#f9f9f9';
      case CardCategory.Sports:
        return '#304DFF';
      default:
        return kind === CardKind.Money
          ? '#66514A'
          : kind === CardKind.NPC ? '#212F3D' : '#222222';
    }
  }};
  color: ${({ category }: StyledCardProps): string => {
    switch (category) {
      case CardCategory.Artisanal:
        return '#222222';
      default:
        return 'white';
    }
  }};
  ${({ cardPosition }: StyledCardProps): string =>
    cardPosition && cardPosition.position
      ? `position: ${cardPosition.position}`
      : 'position: relative'};
  user-select: none;
  ${({ cardPosition }: StyledCardProps): string =>
    cardPosition && cardPosition.yPos ? `top: ${cardPosition.yPos}px` : ''};
  ${({ cardPosition }: StyledCardProps): string =>
    cardPosition && cardPosition.xPos ? `left: ${cardPosition.xPos}px` : ''};
  transform: ${({ isPlayed, cardPosition }: StyledCardProps): string =>
    (isPlayed ? `translateY(-15%)` : `translateY(0)`).concat(
      cardPosition && cardPosition.rotationDeg
        ? `rotate(${cardPosition.rotationDeg}deg)`
        : ''
    )};
  opacity: ${({ isPlayed }: StyledCardProps): string =>
    isPlayed ? '0.9' : '1'};
  &:hover {
    animation: ${({ showHoverAnimation }: StyledCardProps): string =>
      showHoverAnimation
        ? `${hover} 0.15s forwards cubic-bezier(0.445, 0.05, 0.55, 0.95)`
        : ''};
    ${({ cardPosition }: StyledCardProps): string =>
      cardPosition && cardPosition.zIndex
        ? `z-index: ${cardPosition.zIndex * 100}`
        : ''};
  }
`;

const CardName = styled.div`
  font-family: 'Acme';
  font-size: 14px;
  text-align: center;
  word-break: break-word;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 12px;
`;

const CardCost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1c40f;
  color: #212121;
  font-family: serif;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  width: 18px;
  height: 18px;
  border-radius: 100%;
`;

const CardHealth = CardCost.extend`
  background-color: red;
  color: white;
  border-radius: 100%;
`;

const CardMoney = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1c40f;
  color: #212121;
  font-family: serif;
  font-size: 32px;
  font-weight: bold;
  width: 44px;
  height: 44px;
  border-radius: 100%;
`;

const CardDescription = styled.div`
  font-size: 12px;
  text-align: center;
`;

function CardView({ model, cardPosition, onClick }: Props) {
  return (
    <>
      {model ? (
        <StyledCard
          onClick={onClick}
          kind={model.kind}
          category={model.category}
          cardPosition={cardPosition}
          showHoverAnimation={onClick !== undefined}
          isPlayed={model.isPlayed}
        >
          <CardName>{model.name}</CardName>
          {model.category === CardCategory.Money ? (
            <CardMoney>{model.totalMoneyValue}</CardMoney>
          ) : (
            <CardDescription>{model.description}</CardDescription>
          )}
          <CardFooter>
            {model.cost.kind === CardCostKind.Health ? (
              <CardHealth>{model.cost.value}</CardHealth>
            ) : (
              <CardCost>{model.cost.value}</CardCost>
            )}
            {model.kind !== CardKind.Normal ? model.kind : ''}
          </CardFooter>
        </StyledCard>
      ) : (
        <FaceDownCard />
      )}
    </>
  );
}

export default CardView;
