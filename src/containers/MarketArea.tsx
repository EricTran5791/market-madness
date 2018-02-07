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

interface Props {
  store?: StoreType;
}

interface State {
  cardStack: CardStackModelType;
}

const StyledMarketArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  border-radius: 2px;
  padding: 8px;
  background-color: whitesmoke;
`;

const Title = styled.div`
  font-family: 'Acme';
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
`;

@inject('store')
@observer
class MarketArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cardStack: this.props.store!.market.cardStack,
    };
  }
  displayCards() {
    return this.state.cardStack.cards
      .filter((card, i) => i < 4)
      .map((card, i) => {
        return (
          <CardView
            key={i}
            model={card}
            onClick={
              !this.props.store!.gameState.isCardEffectActive
                ? () => this.onClick(card)
                : undefined
            }
          />
        );
      });
  }
  onClick(card: CardModelType) {
    if (card.category === CardCategory.NPC) {
      this.props.store!.attackNPC(card);
    } else {
      this.props.store!.buyMarketCard(card);
    }
  }
  render() {
    return (
      <StyledMarketArea>
        <Title>The Market</Title>
        <CardGrid columns={4}>{this.displayCards()}</CardGrid>
      </StyledMarketArea>
    );
  }
}

export default MarketArea;
