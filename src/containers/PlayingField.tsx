import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import CardView from '../components/CardView';
import ShopArea from './ShopArea';
import CardGrid from '../components/CardGrid';
import { StoreType } from '../models/Store';
import { CardStackModelType } from '../models/Card';
import { withProps } from '../withProps';
import CardDeck from '../components/CardDeck';

interface Props {
  name: string;
  store?: StoreType;
}

const StyledPlayingField = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas:
    '. shop end-turn'
    'discard-pile hand deck';
  background-color: #e4e4e4;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 16px;
`;

const AreaTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const GridArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShopGridArea = GridArea.extend`
  grid-area: shop;
`;

const EndTurnGridArea = GridArea.extend`
  grid-area: end-turn;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HandGridArea = GridArea.extend`
  grid-area: hand;
`;

const DiscardPileGridArea = GridArea.extend`
  grid-area: discard-pile;
`;

const DeckGridArea = GridArea.extend`
  grid-area: deck;
`;

const HandStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 16px;
`;

const HandStat = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 16px;
`;

interface EndTurnButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const EndTurnButton = withProps<EndTurnButtonProps>()(styled.button)`
  cursor: pointer;
  width: 128px;
  height: 64px;
  font-size: 16px;
  font-weight: bold;
`;

@inject('store')
@observer
class PlayingField extends React.Component<Props, object> {
  displayCards(cardStack: CardStackModelType) {
    return cardStack.cards.map((card, i) => {
      return <CardView key={i} model={card} />;
    });
  }
  render() {
    return (
      <StyledPlayingField>
        <ShopGridArea>
          <ShopArea />
        </ShopGridArea>

        <EndTurnGridArea>
          <EndTurnButton
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              this.props.store!.endTurn()
            }
          >
            End Turn
          </EndTurnButton>
        </EndTurnGridArea>

        <HandGridArea>
          <AreaTitle>Hand</AreaTitle>
          <HandStats>
            <HandStat>
              {this.props.store!.hand.availableAttackValue} Attack
            </HandStat>
            <HandStat>
              {this.props.store!.hand.availableBuyingPower} Buying Power
            </HandStat>
          </HandStats>
          <CardGrid columns={5}>
            {this.displayCards(this.props.store!.hand.cardStack)}
          </CardGrid>
        </HandGridArea>

        <DiscardPileGridArea>
          <AreaTitle>Discard Pile</AreaTitle>
          <CardDeck count={this.props.store!.discardPile.totalCards} />
        </DiscardPileGridArea>

        <DeckGridArea>
          <AreaTitle>Deck</AreaTitle>
          <CardDeck count={this.props.store!.deck.totalCards} />
        </DeckGridArea>
      </StyledPlayingField>
    );
  }
}

export default PlayingField;
