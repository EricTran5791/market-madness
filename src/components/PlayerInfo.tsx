import * as React from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  health: number;
  maxHealth: number;
  availableBuyingPower: number;
}

const StyledPlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 2px;
  background-color: whitesmoke;
`;

const PlayerName = styled.div`
  font-family: 'Acme';
  font-size: 32px;
  text-align: center;
  margin-bottom: 8px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-width: 150px;
`;

const Stat = styled.div`
  font-family: 'Acme';
  font-size: 24px;
`;

const PlayerHealth = Stat.extend`
  /* TODO: Change colors when health is low */
`;

function PlayerInfo({ id, health, maxHealth, availableBuyingPower }: Props) {
  return (
    <StyledPlayerInfo>
      <PlayerName>{id}</PlayerName>
      <StatsContainer>
        <Stat title="Available buying power">💵 {availableBuyingPower}</Stat>
        <PlayerHealth title="Health">
          ❤️ {health}/{maxHealth}
        </PlayerHealth>
      </StatsContainer>
    </StyledPlayerInfo>
  );
}

export default PlayerInfo;
