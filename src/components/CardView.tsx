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

const StyledCard = withProps<StyledCardProps>()(styled.div)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  color: white;
  width: 80px;
  height: 110px;
  padding: 8px;
  border-radius: 8px;

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
  width: 16px;
  height: 16px;
  border-radius: 100%;
`;

const CardBuyingPower = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1c40f;
  color: #212121;
  font-family: serif;
  font-size: 22px;
  font-weight: bold;
  width: 32px;
  height: 32px;
  border-radius: 100%;
`;

function CardView({ model, onClick }: Props) {
  return (
    <StyledCard onClick={onClick} category={model.category}>
      <CardName>{model.name}</CardName>
      {model.buyingPower ? (
        <CardBuyingPower>{model.buyingPower}</CardBuyingPower>
      ) : null}
      <CardFooter>
        <CardCost>{model.cost}</CardCost>
        {model.category}
      </CardFooter>
    </StyledCard>
  );
}

export default CardView;
