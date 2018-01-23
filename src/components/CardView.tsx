import * as React from 'react';
import styled from 'styled-components';
import { CardModelType } from '../models/Card';

interface Props {
  model: CardModelType;
  onClick?: () => void;
}

const StyledCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: burlywood;
  color: white;
  width: 120px;
  height: 180px;
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
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`;

const CardCost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gold;
  font-size: 22px;
  font-weight: bold;
  width: 32px;
  height: 32px;
  border-radius: 100%;
`;

function CardView({ model, onClick }: Props) {
  return (
    <StyledCard onClick={onClick}>
      <CardName>{model.name}</CardName>
      <CardCost>{model.cost}</CardCost>
    </StyledCard>
  );
}

export default CardView;
