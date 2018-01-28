import * as React from 'react';
import CardGrid from '../components/CardGrid';
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
  gainedCardStack: CardStackModelType;
}

const StyledHandArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
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
        <CardView key={i} model={card} onClick={() => this.onClick(card)} />
      );
    });
  }
  displayGainedCards() {
    return this.state.gainedCardStack.cards.map((card, i) => {
      return <CardView key={i} model={card} />;
    });
  }
  onClick(card: CardModelType) {
    this.props.store!.playCard(card);
  }
  render() {
    return (
      <StyledHandArea>
        <CardGrid columns={1}>{this.displayGainedCards()}</CardGrid>
        <CardGrid columns={5}>{this.displayCards()}</CardGrid>
      </StyledHandArea>
    );
  }
}

export default HandArea;
