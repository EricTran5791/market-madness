import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import CardView from '../components/CardView';
import MarketArea from './MarketArea';
import { StoreType } from '../models/Store';
import { CardStackModelType } from '../models/Card';
import PlayerInfo from '../components/PlayerInfo';
import { PlayerId } from '../models/Player';
import { GameLog } from '../components/GameLog';
import HandArea from './HandArea';
import CardPile from '../components/CardPile';
import TurnControls from '../components/TurnControls';
import ShopArea from './ShopArea';
import OptionsButton from '../components/OptionsButton';

interface Props {
  store?: StoreType;
}

const StyledPlayingField = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr 3fr 1fr;
  grid-template-rows: 1fr 170px 170px 170px 1fr;
  grid-template-areas:
    'game-log p2-discard p2-hand p2-deck'
    'game-log . p2-shop .'
    'player-info trash market turn-controls'
    '. . p1-shop turn-controls'
    'options p1-discard p1-hand p1-deck';
  background-color: #e4e4e4;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 16px;
`;

const GridArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrashGridArea = GridArea.extend`
  grid-area: trash;
  justify-content: center;
`;

const MarketGridArea = GridArea.extend`
  grid-area: market;
  justify-content: center;
`;

const TurnControlsGridArea = GridArea.extend`
  grid-area: turn-controls;
  align-items: center;
`;

const P1ShopGridArea = GridArea.extend`
  grid-area: p1-shop;
  justify-content: center;
`;

const P1HandGridArea = GridArea.extend`
  grid-area: p1-hand;
`;

const P1DiscardGridArea = GridArea.extend`
  grid-area: p1-discard;
  justify-content: center;
`;

const P1DeckGridArea = GridArea.extend`
  grid-area: p1-deck;
  justify-content: center;
`;

const PlayerInfoGridArea = GridArea.extend`
  grid-area: player-info;
  justify-content: center;
`;

const P2ShopGridArea = GridArea.extend`
  grid-area: p2-shop;
  justify-content: center;
`;

const P2HandGridArea = GridArea.extend`
  grid-area: p2-hand;
  justify-content: center;
`;

const P2DiscardGridArea = GridArea.extend`
  grid-area: p2-discard;
  justify-content: center;
`;

const P2DeckGridArea = GridArea.extend`
  grid-area: p2-deck;
  justify-content: center;
`;

const GameLogGridArea = GridArea.extend`
  grid-area: game-log;
`;

const OptionsArea = GridArea.extend`
  grid-area: options;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
`;

@inject('store')
@observer
class PlayingField extends React.Component<Props, object> {
  displayCards(cardStack: CardStackModelType) {
    return cardStack.cards.map(card => {
      return <CardView key={card.uniqid} model={card} />;
    });
  }
  render() {
    return (
      <StyledPlayingField>
        <P2DiscardGridArea>
          <CardPile
            cardStack={
              this.props.store!.getPlayer(PlayerId.Player2).discardPile
            }
          />
        </P2DiscardGridArea>

        <P2HandGridArea>
          <HandArea
            playerId={this.props.store!.getPlayer(PlayerId.Player2).id}
          />
        </P2HandGridArea>

        <P2DeckGridArea>
          {this.props.store!.getPlayer(PlayerId.Player2).deck.cards.length >
            0 && <CardView />}
        </P2DeckGridArea>

        <P2ShopGridArea>
          <ShopArea
            playerId={this.props.store!.getPlayer(PlayerId.Player2).id}
          />
        </P2ShopGridArea>

        <PlayerInfoGridArea>
          <PlayerInfo
            playerId={this.props.store!.getPlayer(PlayerId.Player2).id}
          />
          <PlayerInfo
            playerId={this.props.store!.getPlayer(PlayerId.Player1).id}
          />
        </PlayerInfoGridArea>

        <TrashGridArea>
          <CardPile cardStack={this.props.store!.trash.cardStack} />
        </TrashGridArea>

        <MarketGridArea>
          <MarketArea />
        </MarketGridArea>

        <TurnControlsGridArea>
          <TurnControls />
        </TurnControlsGridArea>

        <GameLogGridArea>
          <GameLog />
        </GameLogGridArea>

        <OptionsArea>
          <OptionsButton />
        </OptionsArea>

        <P1ShopGridArea>
          <ShopArea
            playerId={this.props.store!.getPlayer(PlayerId.Player1).id}
          />
        </P1ShopGridArea>

        <P1DiscardGridArea>
          <CardPile
            cardStack={
              this.props.store!.getPlayer(PlayerId.Player1).discardPile
            }
          />
        </P1DiscardGridArea>

        <P1HandGridArea>
          <HandArea
            playerId={this.props.store!.getPlayer(PlayerId.Player1).id}
          />
        </P1HandGridArea>

        <P1DeckGridArea>
          {this.props.store!.getPlayer(PlayerId.Player1).deck.cards.length >
            0 && <CardView />}
        </P1DeckGridArea>
      </StyledPlayingField>
    );
  }
}

export default PlayingField;
