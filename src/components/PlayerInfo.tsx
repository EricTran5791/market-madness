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
  font-family: 'Acme';
  font-size: 32px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-width: 150px;
  padding: 8px;
`;

const Stat = styled.div`
  font-family: 'Acme';
  font-size: 24px;
`;

const PlayerHealth = Stat.extend`
  /* TODO: Change colors when health is low */
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
