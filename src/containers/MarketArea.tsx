import * as React from 'react';
import CardGrid from '../components/CardGrid';
import CardView from '../components/CardView';
import { CardStackModelType, CardModelType } from '../models/Card';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { StoreType } from '../models/Store';
import { CardKind } from '../types/cardTypes';

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
`;

const MarketCardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
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
  displayMarketDeck() {
    const marketDeck = this.state.cardStack;
    return (
      marketDeck.cards.length > 0 && (
        <CardView
          model={marketDeck.cards[0]}
          onClick={
            !this.props.store!.gameState.isCardEffectActive
              ? () => this.onMarketCardClick(marketDeck.cards[0])
              : undefined
          }
        />
      )
    );
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
    if (card.kind === CardKind.NPC) {
      this.props.store!.attackNPC(card);
    } else {
      this.props.store!.buyCard(card);
    }
  }

  render() {
    return (
      <StyledMarketArea>
        <MarketCardRow>
          <CardGrid columns={1}>{this.displayMarketDeck()}</CardGrid>
          <CardGrid columns={2}>{this.displayAlwaysAvailableCards()}</CardGrid>
        </MarketCardRow>
      </StyledMarketArea>
    );
  }
}

export default MarketArea;
