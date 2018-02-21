import * as React from 'react';
import styled from 'styled-components';
import { StoreType } from '../models/Store';
import { observer, inject } from 'mobx-react';
import { GameLogEntryModelType } from '../models/GameState';

interface Props {
  store?: StoreType;
}

interface State {
  gameLog: GameLogEntryModelType[];
}

const StyledGameLog = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const GameLogEntry = styled.div`
  font-size: 12px;
  margin: 4px 0;
`;

@inject('store')
@observer
export class GameLog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gameLog: this.props.store!.gameState.gameLog,
    };
  }
  displayEntries() {
    return this.state.gameLog
      .slice(Math.max(this.state.gameLog.length - 9, 0)) // Take the 9 most recent entries
      .map(entry => {
        return <GameLogEntry key={entry.uniqid}>{entry.message}</GameLogEntry>;
      });
  }
  render() {
    return <StyledGameLog>{this.displayEntries()}</StyledGameLog>;
  }
}

export default GameLog;
