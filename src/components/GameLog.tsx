import * as React from 'react';
import { GameLogEntryModelType } from '../models/GameState';
import styled from 'styled-components';

interface Props {
  entries: GameLogEntryModelType[];
}

const StyledGameLog = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const GameLogEntry = styled.div`
  font-size: 12px;
  margin: 8px 0;
`;

export class GameLog extends React.Component<Props, object> {
  displayEntries() {
    return this.props.entries
      .slice(Math.max(this.props.entries.length - 11, 0))
      .map((entry, index) => {
        return <GameLogEntry key={index}>{entry.message}</GameLogEntry>;
      });
  }
  render() {
    return <StyledGameLog>{this.displayEntries()}</StyledGameLog>;
  }
}

export default GameLog;
