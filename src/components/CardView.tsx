import * as React from 'react';
import styled from 'styled-components';
import { CardModelType, CardCategory } from '../models/Card';
import { withProps } from '../withProps';

interface Props {
  model: CardModelType;
  onClick?: () => void;
}

interface StyledCardProps {
  category: string;
}

export const BasicCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 95px;
  height: 125px;
  padding: 8px;
  border-radius: 8px;
`;

const StyledCard = withProps<StyledCardProps>()(BasicCard.extend)`
  background-color: ${({ category }: StyledCardProps): string => {
    switch (category) {
      case CardCategory.attack:
        return 'tomato';
      case CardCategory.money:
        return '#66514A';
      default:
        return '#222222';
    }
  }};
  &:hover {
    animation: hover 1s infinite;

    @keyframes hover {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-4px);
      }
      0% {
        transform: translateY(0);
      }
    }
  }
`;

const CardName = styled.div`
  font-size: 14px;
  font-weight: bold;
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
    <StyledCard onClick={onClick} category={model.category}>
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
