import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { CardModelType, CardCategory } from '../models/Card';
import { withProps } from '../withProps';

interface Props {
  model: CardModelType;
  onClick?: () => void;
}

interface StyledCardProps {
  category: string;
  showHoverAnimation: boolean;
  isPlayed: boolean;
}

export const BasicCard = styled.div`
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

const hover = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
`;

const StyledCard = withProps<StyledCardProps>()(BasicCard.extend)`
  cursor: ${({ showHoverAnimation }: StyledCardProps): string =>
    showHoverAnimation ? 'pointer' : 'default'};
  background-color: ${({ category }: StyledCardProps): string => {
    switch (category) {
      case CardCategory.Attack:
        return 'tomato';
      case CardCategory.Consumable:
        return 'seagreen';
      case CardCategory.Money:
        return '#66514A';
      default:
        return '#222222';
    }
  }};
  transform: ${({ isPlayed }: StyledCardProps): string =>
    isPlayed ? 'translateY(-8px)' : ''};
  opacity: ${({ isPlayed }: StyledCardProps): string =>
    isPlayed ? '0.75' : '1'};
  &:hover {
    animation: ${({ showHoverAnimation }: StyledCardProps): string =>
      showHoverAnimation ? `${hover} 1s infinite` : ''};
  }
`;

const CardName = styled.div`
  font-family: 'Acme';
  font-size: 14px;
  text-align: center;
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
  width: 18px;
  height: 18px;
  border-radius: 100%;
`;

const CardBuyingPower = styled.div`
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

function CardView({ model, onClick }: Props) {
  return (
    <StyledCard
      onClick={onClick}
      category={model.category}
      showHoverAnimation={onClick !== undefined}
      isPlayed={model.isPlayed}
    >
      <CardName>{model.name}</CardName>
      {model.buyingPower ? (
        <CardBuyingPower>{model.buyingPower}</CardBuyingPower>
      ) : (
        <CardDescription>{model.description}</CardDescription>
      )}
      <CardFooter>
        <CardCost>{model.cost}</CardCost>
        {model.category}
      </CardFooter>
    </StyledCard>
  );
}

export default CardView;
