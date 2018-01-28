import * as React from 'react';
import CardGrid from '../components/CardGrid';
import CardView from '../components/CardView';
import {
  CardStackModelType,
  CardModelType,
  CardCategory,
} from '../models/Card';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { StoreType } from '../models/Store';
import { withProps } from '../withProps';

interface Props {
  playerId: string;
  store?: StoreType;
}

interface State {
  cardStack: CardStackModelType;
  gainedCardStack: CardStackModelType;
}

const StyledHandArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`;

const CardPile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

interface CardPileItemProps {
  index: number;
}

const CardPileItem = withProps<CardPileItemProps>()(styled.div)`
  position: absolute;
  top: ${({ index }: CardPileItemProps) => index * 32}px;
  transform: rotate(${({ index }: CardPileItemProps) => {
    const i = index % 3;
    return i === 0 ? 0 : i === 1 ? 2 : -2;
  }}deg); // Stagger the cards in the pile
`;

@inject('store')
@observer
class HandArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cardStack: this.props.store!.getPlayer(this.props.playerId).hand
        .cardStack,
      gainedCardStack: this.props.store!.getPlayer(this.props.playerId).hand
        .gainedCardStack,
    };
  }
  displayCards() {
    return this.state.cardStack.cards.map((card, i) => {
      return (
        <CardView
          key={i}
          model={card}
          onClick={
            card.isPlayed || card.category === CardCategory.money
              ? undefined
              : () => this.onClick(card)
          }
        />
      );
    });
  }
  displayGainedCards() {
    return this.state.gainedCardStack.cards.map((card, i) => {
      return (
        <CardPileItem key={i} index={i}>
          <CardView model={card} />
        </CardPileItem>
      );
    });
  }
  onClick(card: CardModelType) {
    this.props.store!.playCard(card);
  }
  render() {
    return (
      <StyledHandArea>
        <CardPile>{this.displayGainedCards()}</CardPile>
        <CardGrid columns={5}>{this.displayCards()}</CardGrid>
      </StyledHandArea>
    );
  }
}

export default HandArea;
