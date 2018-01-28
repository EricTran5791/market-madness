import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import CardView from '../components/CardView';
import MarketArea from './MarketArea';
import { StoreType } from '../models/Store';
import { CardStackModelType } from '../models/Card';
import { withProps } from '../withProps';
import CardDeck from '../components/CardDeck';
import PlayerInfo from '../components/PlayerInfo';
import { PlayerId } from '../models/Player';
import { GameLog } from '../components/GameLog';
import HandArea from './HandArea';

interface Props {
  store?: StoreType;
}

const StyledPlayingField = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr 4fr 1fr;
  grid-template-areas:
    '. . comp-portrait .'
    'game-log comp-discard-pile comp-hand comp-deck'
    'game-log . market end-turn'
    'game-log p1-discard-pile p1-hand p1-deck'
    '. . p1-portrait .';
  background-color: #e4e4e4;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 16px;
`;

const AreaTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const GridArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MarketAreaGridArea = GridArea.extend`
  grid-area: market;
`;

const EndTurnGridArea = GridArea.extend`
  grid-area: end-turn;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P1DiscardPileGridArea = GridArea.extend`
  grid-area: p1-discard-pile;
`;

const P1HandGridArea = GridArea.extend`
  grid-area: p1-hand;
`;

const P1DeckGridArea = GridArea.extend`
  grid-area: p1-deck;
`;

const P1GridArea = GridArea.extend`
  grid-area: p1-portrait;
`;

const CompDiscardPileGridArea = GridArea.extend`
  grid-area: comp-discard-pile;
`;

const CompHandGridArea = GridArea.extend`
  grid-area: comp-hand;
`;

const CompDeckGridArea = GridArea.extend`
  grid-area: comp-deck;
`;

const CompGridArea = GridArea.extend`
  grid-area: comp-portrait;
`;

const GameLogGridArea = GridArea.extend`
  grid-area: game-log;
`;

interface TurnButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const TurnButton = withProps<TurnButtonProps>()(styled.button)`
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
        <CompGridArea>
          <PlayerInfo
            id={this.props.store!.getPlayer(PlayerId.Computer).id}
            health={this.props.store!.getPlayer(PlayerId.Computer).health}
            maxHealth={this.props.store!.getPlayer(PlayerId.Computer).maxHealth}
            availableBuyingPower={
              this.props.store!.getPlayer(PlayerId.Computer).hand
                .availableBuyingPower
            }
          />
        </CompGridArea>

        <CompDiscardPileGridArea>
          <AreaTitle>Discard Pile</AreaTitle>
          <CardDeck
            count={
              this.props.store!.getPlayer(PlayerId.Computer).discardPile
                .totalCards
            }
          />
        </CompDiscardPileGridArea>

        <CompHandGridArea>
          <HandArea
            playerId={this.props.store!.getPlayer(PlayerId.Computer).id}
          />
        </CompHandGridArea>

        <CompDeckGridArea>
          <AreaTitle>Deck</AreaTitle>
          <CardDeck
            count={
              this.props.store!.getPlayer(PlayerId.Computer).deck.totalCards
            }
          />
        </CompDeckGridArea>

        <GameLogGridArea>
          <AreaTitle>Game Log</AreaTitle>
          <GameLog entries={this.props.store!.gameState.gameLog} />
        </GameLogGridArea>

        <MarketAreaGridArea>
          <MarketArea />
        </MarketAreaGridArea>

        <EndTurnGridArea>
          <TurnButton
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              this.props.store!.endTurn()
            }
          >
            End Turn
          </TurnButton>
        </EndTurnGridArea>

        <P1HandGridArea>
          <HandArea
            playerId={this.props.store!.getPlayer(PlayerId.Player1).id}
          />
        </P1HandGridArea>

        <P1DiscardPileGridArea>
          <AreaTitle>Discard Pile</AreaTitle>
          <CardDeck
            count={
              this.props.store!.getPlayer(PlayerId.Player1).discardPile
                .totalCards
            }
          />
        </P1DiscardPileGridArea>

        <P1DeckGridArea>
          <AreaTitle>Deck</AreaTitle>
          <CardDeck
            count={
              this.props.store!.getPlayer(PlayerId.Player1).deck.totalCards
            }
          />
        </P1DeckGridArea>

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
