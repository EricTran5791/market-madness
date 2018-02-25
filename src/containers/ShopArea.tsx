import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { StoreType } from '../models/Store';
import CardView from '../components/CardView';
import { CardModelType } from '../models/Card';
import { CardKind } from '../types/cardTypes';

interface Props {
  playerId: string;
  store?: StoreType;
}

const StyledShopArea = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px;
`;

const SoldOutSign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 117px;
  height: 147px;
  border: 1px dotted;
  border-radius: 8px;
  box-sizing: border-box;
  font-family: 'Acme';
`;

@inject('store')
@observer
class ShopArea extends React.Component<Props, object> {
  get player() {
    return this.props.store!.getPlayer(this.props.playerId);
  }

  displayShopDeck(deckIndex: number) {
    const shopDeck = this.player.shopDeck[deckIndex];
    return shopDeck.cards.length > 0 ? (
      <CardView
        key={shopDeck.cards[0].uniqid}
        model={shopDeck.cards[0]}
        onClick={
          this.props.store!.currentPlayer.id === this.props.playerId &&
          !this.props.store!.gameState.isCardEffectActive
            ? () => this.onCardClick(shopDeck.cards[0])
            : undefined
        }
      />
    ) : (
      <SoldOutSign>Sold Out</SoldOutSign>
    );
  }

  onCardClick(card: CardModelType) {
    switch (card.kind) {
      case CardKind.NPC:
        this.props.store!.attackNPC(card);
        return;
      case CardKind.Instant:
        this.props.store!.playInstant(card);
        return;
      default:
        this.props.store!.buyCard(card);
        return;
    }
  }

  render() {
    return (
      <StyledShopArea>
        {this.player.shopDeck.map((deck, i) => {
          return this.displayShopDeck(i);
        })}
      </StyledShopArea>
    );
  }
}

export default ShopArea;
