import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import CardView from '../components/CardView';
import TrashArea from './TrashArea';
import MarketArea from './MarketArea';
import { StoreType } from '../models/Store';
import { CardStackModelType } from '../models/Card';
import PlayerInfo from '../components/PlayerInfo';
import { PlayerId } from '../models/Player';
import { GameLog } from '../components/GameLog';
import HandArea from './HandArea';
import { TurnButton } from '../components/TurnButton';
import ActiveCardEffectInfo from '../components/ActiveCardEffectInfo';

interface Props {
  store?: StoreType;
}

const StyledPlayingField = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr 3fr 1fr;
  grid-template-rows: 1fr 170px 170px 170px 1fr;
  grid-template-areas:
    'game-log comp-hand comp-hand comp-hand'
    'game-log . . .'
    'player-info trash market game-info'
    '. . . .'
    '. p1-hand p1-hand p1-hand';
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

const GameInfoGridArea = GridArea.extend`
  grid-area: game-info;
  align-items: center;
`;

const P1HandGridArea = GridArea.extend`
  grid-area: p1-hand;
`;

const PlayerInfoGridArea = GridArea.extend`
  grid-area: player-info;
  justify-content: center;
`;

const CompHandGridArea = GridArea.extend`
  grid-area: comp-hand;
  justify-content: center;
`;

const GameLogGridArea = GridArea.extend`
  grid-area: game-log;
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
        <CompHandGridArea>
          <HandArea
            playerId={this.props.store!.getPlayer(PlayerId.Player2).id}
          />
        </CompHandGridArea>

        <PlayerInfoGridArea>
          <PlayerInfo
            playerId={this.props.store!.getPlayer(PlayerId.Player2).id}
          />
          <PlayerInfo
            playerId={this.props.store!.getPlayer(PlayerId.Player1).id}
          />
        </PlayerInfoGridArea>

        <TrashGridArea>
          <TrashArea />
        </TrashGridArea>

        <MarketGridArea>
          <MarketArea />
        </MarketGridArea>

        <GameInfoGridArea>
          <TurnButton />
          <ActiveCardEffectInfo />
        </GameInfoGridArea>

        <GameLogGridArea>
          <GameLog />
        </GameLogGridArea>

        <P1HandGridArea>
          <HandArea
            playerId={this.props.store!.getPlayer(PlayerId.Player1).id}
          />
        </P1HandGridArea>
      </StyledPlayingField>
    );
  }
}

export default PlayingField;
