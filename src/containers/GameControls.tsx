import * as React from 'react';
import styled from 'styled-components';
import { StoreType } from '../models/Store';
import { withProps } from '../withProps';
import { observer, inject } from 'mobx-react';
import { GamePhase } from '../models/GameState';

interface Props {
  store?: StoreType;
}

const StyledGameControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CurrentGamePhase = styled.div`
  font-family: 'Acme';
  font-size: 24px;
  margin-bottom: 16px;
`;

interface TurnButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const TurnButton = withProps<TurnButtonProps>()(styled.button)`
  cursor: pointer;
  width: 128px;
  height: 64px;
  font-family: 'Acme';
  font-size: 18px;
`;

@inject('store')
@observer
export class GameControls extends React.Component<Props, object> {
  turnButtonCallback() {
    if (this.props.store!.currentGamePhase === GamePhase.GameOver) {
      this.props.store!.createNewGame();
    } else {
      this.props.store!.endTurn();
    }
  }

  // TODO: Move to store
  getTurnButtonText(): string {
    return this.props.store!.currentGamePhase === GamePhase.GameOver
      ? 'New Game'
      : 'End Turn';
  }

  render() {
    return (
      <StyledGameControls>
        <CurrentGamePhase>
          {this.props.store!.currentGamePhase}
        </CurrentGamePhase>
        <TurnButton
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            this.turnButtonCallback()
          }
        >
          {this.getTurnButtonText()}
        </TurnButton>
      </StyledGameControls>
    );
  }
}

export default GameControls;
