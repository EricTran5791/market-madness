import * as React from 'react';
import CardView from '../components/CardView';
import { CardStackModelType, CardModelType } from '../models/Card';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { StoreType } from '../models/Store';

interface Props {
  playerId: string;
  store?: StoreType;
}

interface State {
  cardStack: CardStackModelType;
}

const StyledHandArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 160px;
`;

const HandContainer = styled.div`
  position: absolute;
  display: flex;
  /** Centers the hand on the screen. */
  transform: translateX(calc(-25% - 46px));
`;

@inject('store')
@observer
class HandArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cardStack: this.props.store!.getPlayer(this.props.playerId).hand
        .cardStack,
    };
  }

  calculateCardYPos(
    index: number,
    isEven: boolean,
    handMedian: number
  ): number {
    const adjustedIndex = index + 1;
    if (isEven) {
      return adjustedIndex === handMedian || adjustedIndex - 1 === handMedian
        ? 5
        : Math.pow(
            1.5,
            Math.abs(
              (adjustedIndex > handMedian ? index : adjustedIndex) - handMedian
            )
          ) * 10;
    } else {
      return adjustedIndex === Math.round(handMedian)
        ? 5
        : Math.pow(
            1.5,
            Math.abs(
              (adjustedIndex > Math.round(handMedian) ? index : adjustedIndex) -
                handMedian
            )
          ) * 10;
    }
  }

  calculateCardRotationDeg(
    index: number,
    isEven: boolean,
    handMedian: number
  ): number {
    const adjustedIndex = index + 1;
    const direction = adjustedIndex < handMedian ? -1 : 1;
    if (isEven) {
      return adjustedIndex === handMedian || adjustedIndex - 1 === handMedian
        ? 0
        : Math.pow(
            2.3,
            Math.abs(
              (adjustedIndex > handMedian ? index : adjustedIndex) - handMedian
            )
          ) * direction;
    } else {
      return adjustedIndex === Math.round(handMedian)
        ? 0
        : Math.pow(2.3, Math.abs(adjustedIndex - Math.round(handMedian))) *
            direction;
    }
  }

  displayCards() {
    const isEven = this.state.cardStack.cards.length % 2 === 0;
    const handMedian = this.state.cardStack.cards.length / 2;
    return this.state.cardStack.cards.map((card, i) => {
      return (
        <CardView
          key={card.uniqid}
          model={card}
          cardPosition={{
            zIndex: (i + 1) * 10,
            xPos: -1 * i * 50,
            yPos: this.calculateCardYPos(i, isEven, handMedian),
            rotationDeg: this.calculateCardRotationDeg(i, isEven, handMedian),
          }}
          onClick={!card.isPlayed ? () => this.onClick(card) : undefined}
        />
      );
    });
  }
  onClick(card: CardModelType) {
    this.props.store!.playCard(card);
  }
  render() {
    return (
      <StyledHandArea>
        <HandContainer>{this.displayCards()}</HandContainer>
      </StyledHandArea>
    );
  }
}

export default HandArea;
