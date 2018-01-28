import * as React from 'react';
import styled from 'styled-components';
import { withProps } from '../withProps';

interface Props {
  id: string;
  health: number;
  maxHealth: number;
  availableBuyingPower: number;
  inverseLayout?: boolean;
}

interface StyledPlayerInfoProps {
  inverseLayout: boolean;
}

const StyledPlayerInfo = withProps<StyledPlayerInfoProps>()(styled.div)`
  display: flex;
  flex-direction: ${({ inverseLayout }: StyledPlayerInfoProps): string =>
    inverseLayout ? 'column-reverse' : 'column'};
  justify-content: center;
  align-items: center;
`;

const PlayerName = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-width: 150px;
  padding: 8px;
`;

const Stat = styled.div`
  color: black;
  font-size: 16px;
`;

const PlayerHealth = Stat.extend`
  font-weight: bold;
`;

function PlayerInfo({
  id,
  health,
  maxHealth,
  availableBuyingPower,
  inverseLayout,
}: Props) {
  return (
    <StyledPlayerInfo inverseLayout={inverseLayout || false}>
      <StatsContainer>
        <Stat title="Available buying power">💵 {availableBuyingPower}</Stat>
        <PlayerHealth title="Health">
          ❤️ {health}/{maxHealth}
        </PlayerHealth>
      </StatsContainer>
      <PlayerName>{id}</PlayerName>
    </StyledPlayerInfo>
  );
}

export default PlayerInfo;
