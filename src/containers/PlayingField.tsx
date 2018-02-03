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
import DeckInfo from '../components/DeckInfo';

interface Props {
  store?: StoreType;
}

const StyledPlayingField = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 150px 1fr 3fr 1fr 150px;
  grid-template-areas:
    '. comp-portrait comp-portrait comp-portrait .'
    'game-log comp-hand comp-hand comp-hand comp-deck-info'
    'game-log trash market . game-info'
    'game-log p1-hand p1-hand p1-hand p1-deck-info'
    '. p1-portrait p1-portrait p1-portrait .';
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
`;

const MarketGridArea = GridArea.extend`
  grid-area: market;
`;

const GameInfoGridArea = GridArea.extend`
  grid-area: game-info;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P1HandGridArea = GridArea.extend`
  grid-area: p1-hand;
`;

const P1DeckInfoGridArea = GridArea.extend`
  grid-area: p1-deck-info;
`;

const P1GridArea = GridArea.extend`
  grid-area: p1-portrait;
`;

const CompHandGridArea = GridArea.extend`
  grid-area: comp-hand;
`;

const CompDeckInfoGridArea = GridArea.extend`
  grid-area: comp-deck-info;
`;

const CompGridArea = GridArea.extend`
  grid-area: comp-portrait;
`;

const GameLogGridArea = GridArea.extend`
  grid-area: game-log;
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
        <CompGridArea>
          <PlayerInfo
            id={this.props.store!.getPlayer(PlayerId.Player2).id}
            health={this.props.store!.getPlayer(PlayerId.Player2).health}
            maxHealth={this.props.store!.getPlayer(PlayerId.Player2).maxHealth}
            availableBuyingPower={
              this.props.store!.getPlayer(PlayerId.Player2).hand
                .availableBuyingPower
            }
            inverseLayout={true}
          />
        </CompGridArea>

        <CompHandGridArea>
          <HandArea
            playerId={this.props.store!.getPlayer(PlayerId.Player2).id}
          />
        </CompHandGridArea>

        <CompDeckInfoGridArea>
          <DeckInfo
            deckTotal={
              this.props.store!.getPlayer(PlayerId.Player2).deck.totalCards
            }
            discardPileTotal={
              this.props.store!.getPlayer(PlayerId.Player2).discardPile
                .totalCards
            }
          />
        </CompDeckInfoGridArea>

        <GameLogGridArea>
          <GameLog />
        </GameLogGridArea>

        <TrashGridArea>
          <TrashArea />
        </TrashGridArea>

        <MarketGridArea>
          <MarketArea />
        </MarketGridArea>

        <GameInfoGridArea>
          <TurnButton />
        </GameInfoGridArea>

        <P1HandGridArea>
          <HandArea
            playerId={this.props.store!.getPlayer(PlayerId.Player1).id}
          />
        </P1HandGridArea>

        <P1DeckInfoGridArea>
          <DeckInfo
            deckTotal={
              this.props.store!.getPlayer(PlayerId.Player1).deck.totalCards
            }
            discardPileTotal={
              this.props.store!.getPlayer(PlayerId.Player1).discardPile
                .totalCards
            }
          />
        </P1DeckInfoGridArea>

        <P1GridArea>
          <PlayerInfo
            id={this.props.store!.getPlayer(PlayerId.Player1).id}
            health={this.props.store!.getPlayer(PlayerId.Player1).health}
            maxHealth={this.props.store!.getPlayer(PlayerId.Player1).maxHealth}
            availableBuyingPower={
              this.props.store!.getPlayer(PlayerId.Player1).hand
                .availableBuyingPower
            }
          />
        </P1GridArea>
      </StyledPlayingField>
    );
  }
}

export default PlayingField;
