import * as React from 'react';
import { withProps } from '../types/withProps';
import styled from 'styled-components';
import { CardStackModelType } from '../models/Card';
import CardView from './CardView';
import { observer } from 'mobx-react';

interface Props {
  cardStack: CardStackModelType;
}

const StyledCardPile = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

interface CardPileItemProps {
  rotation: number;
  yPos: number;
}

// Staggers cards by applying different rotations and translations
const CardPileItem = withProps<CardPileItemProps>()(styled.div)`
position: absolute;
transform: rotate(${({ rotation }: CardPileItemProps) => rotation}deg)
 translate(0, ${({ yPos }: CardPileItemProps) => yPos}px);
`;

@observer
class CardPile extends React.Component<Props, object> {
  displayCards() {
    return this.props.cardStack.cards
      .slice(Math.max(this.props.cardStack.cards.length - 6, 0)) // Take the 6 most recent cards
      .map((card, i) => {
        const remainder3 = i % 3;
        const rotation = remainder3 === 0 ? 0 : remainder3 === 1 ? -5 : 4.5;
        const yPos = i % 2 === 0 ? 0 : 8;
        return (
          <CardPileItem key={i} rotation={rotation} yPos={yPos}>
            <CardView model={card} />
          </CardPileItem>
        );
      });
  }
  render() {
    return <StyledCardPile>{this.displayCards()}</StyledCardPile>;
  }
}

export default CardPile;
