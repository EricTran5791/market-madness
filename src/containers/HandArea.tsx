import * as React from 'react';
import CardGrid from '../components/CardGrid';
import CardView from '../components/CardView';
import { CardStackModelType, CardModelType } from '../models/Card';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { StoreType } from '../models/Store';
import { ActiveCardEffectInfo } from '../components/ActiveCardEffectInfo';

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
  displayCards() {
    return this.state.cardStack.cards.map((card, i) => {
      return (
        <CardView
          key={i}
          model={card}
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
        <CardGrid columns={5}>{this.displayCards()}</CardGrid>
        {this.props.playerId === this.props.store!.currentPlayer.id && (
          <ActiveCardEffectInfo />
        )}
      </StyledHandArea>
    );
  }
}

export default HandArea;
