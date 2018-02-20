import * as React from 'react';
import CardGrid from '../components/CardGrid';
import CardView from '../components/CardView';
import { CardStackModelType, CardModelType } from '../models/Card';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { StoreType } from '../models/Store';
import { CardCategory } from '../types/cardTypes';

interface Props {
  store?: StoreType;
}

interface State {
  cardStack: CardStackModelType;
  alwaysAvailableCardStack: CardStackModelType;
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
  margin-bottom: 16px;
`;

const MarketCardRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 24px;
`;

@inject('store')
@observer
class MarketArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cardStack: this.props.store!.market.cardStack,
      alwaysAvailableCardStack: this.props.store!.market
        .alwaysAvailableCardStack,
    };
  }
  displayMarketCards() {
    // Show the 3 first market cards
    const marketCards = this.state.cardStack.cards.slice(0, 3).map(card => {
      return (
        <CardView
          key={card.uniqid}
          model={card}
          onClick={
            !this.props.store!.gameState.isCardEffectActive
              ? () => this.onMarketCardClick(card)
              : undefined
          }
        />
      );
    });
    return marketCards;
  }
  displayAlwaysAvailableCards() {
    // Show the 2 always available cards
    const marketCards = this.state.alwaysAvailableCardStack.cards.map(card => {
      return (
        <CardView
          key={card.uniqid}
          model={card}
          onClick={
            !this.props.store!.gameState.isCardEffectActive
              ? () => this.props.store!.buyCard(card, true)
              : undefined
          }
        />
      );
    });
    return marketCards;
  }
  onMarketCardClick(card: CardModelType) {
    if (card.category === CardCategory.NPC) {
      this.props.store!.attackNPC(card);
    } else {
      this.props.store!.buyCard(card);
    }
  }
  render() {
    return (
      <StyledMarketArea>
        <Title>The Market</Title>
        <MarketCardRow>
          <CardGrid columns={3}>{this.displayMarketCards()}</CardGrid>
          <CardGrid columns={2}>{this.displayAlwaysAvailableCards()}</CardGrid>
        </MarketCardRow>
      </StyledMarketArea>
    );
  }
}

export default MarketArea;
