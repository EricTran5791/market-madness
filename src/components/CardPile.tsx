import * as React from 'react';
import styled from 'styled-components';
import { CardStackModelType } from '../models/Card';
import CardView from './CardView';
import { observer } from 'mobx-react';

interface Props {
  cardStack: CardStackModelType;
}

const StyledCardPile = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
`;

@observer
class CardPile extends React.Component<Props, object> {
  displayCards() {
    return this.props.cardStack.cards
      .slice(Math.max(this.props.cardStack.cards.length - 6, 0)) // Take the 6 most recent cards
      .map((card, i) => {
        const remainder3 = i % 3;
        const rotation =
          remainder3 === 0 ? 0 : remainder3 === 1 ? i * -1.6 : i * 1.2;
        const yPos = remainder3 === 0 ? 0 : remainder3 === 1 ? i : 0;
        return (
          <CardView
            key={card.uniqid}
            model={card}
            cardPosition={{ yPos, rotationDeg: rotation, position: 'absolute' }}
          />
        );
      });
  }
  render() {
    return <StyledCardPile>{this.displayCards()}</StyledCardPile>;
  }
}

export default CardPile;
