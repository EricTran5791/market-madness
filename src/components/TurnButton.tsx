import * as React from 'react';
import styled from 'styled-components';
import { StoreType } from '../models/Store';
import { withProps } from '../withProps';
import { observer, inject } from 'mobx-react';
import { GamePhase } from '../models/GameState';

interface Props {
  store?: StoreType;
}

interface TurnButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const StyledTurnButton = withProps<TurnButtonProps>()(styled.button)`
  cursor: pointer;
  width: 128px;
  height: 64px;
  font-family: 'Acme';
  font-size: 18px;
`;

@inject('store')
@observer
export class TurnButton extends React.Component<Props, object> {
  turnButtonCallback() {
    if (this.props.store!.currentGamePhase === GamePhase.GameOver) {
      this.props.store!.createNewGame();
    } else {
      this.props.store!.endTurn();
    }
  }

  getTurnButtonText(): string {
    return this.props.store!.currentGamePhase === GamePhase.GameOver
      ? 'New Game'
      : 'End Turn';
  }

  render() {
    return (
      <StyledTurnButton
        onClick={(e: React.MouseEvent<HTMLElement>) =>
          this.turnButtonCallback()
        }
      >
        {this.getTurnButtonText()}
      </StyledTurnButton>
    );
  }
}

export default TurnButton;
