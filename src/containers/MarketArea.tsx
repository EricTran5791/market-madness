import * as React from 'react';
import CardGrid from '../components/CardGrid';
import CardView from '../components/CardView';
import { CardStackModelType, CardModelType } from '../models/Card';
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
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.33);
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
          <CardView key={i} model={card} onClick={() => this.onClick(card)} />
        );
      });
  }
  onClick(card: CardModelType) {
    this.props.store!.buyMarketCard(card);
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
