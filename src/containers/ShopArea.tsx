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

const StyledShopArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

@inject('store')
@observer
class ShopArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cardStack: this.props.store!.shopDeck,
    };
  }
  displayCards() {
    return this.state.cardStack.cards
      .filter((card, i) => i < 3)
      .map((card, i) => {
        return (
          <CardView key={i} model={card} onClick={() => this.onClick(card)} />
        );
      });
  }
  onClick(card: CardModelType) {
    this.props.store!.buyShopCard(card);
  }
  render() {
    return (
      <StyledShopArea>
        <Title>Shop</Title>
        <CardGrid columns={3}>{this.displayCards()}</CardGrid>
      </StyledShopArea>
    );
  }
}

export default ShopArea;
