import * as React from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  health: number;
  availableBuyingPower: number;
  availableAttackValue: number;
}

const StyledPlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlayerName = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const PlayerHealth = styled.div`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const StatsContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const HandStat = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-size: 16px;
  margin: 0 8px;
`;

function PlayerInfo({
  id,
  health,
  availableBuyingPower,
  availableAttackValue,
}: Props) {
  return (
    <StyledPlayerInfo>
      <StatsContainer>
        <HandStat title="Available buying power">
          💵 {availableBuyingPower}
        </HandStat>
        <PlayerHealth title="Health">❤️ {health}</PlayerHealth>
        <HandStat title="Available attack value">
          👊 {availableAttackValue}
        </HandStat>
      </StatsContainer>
      <PlayerName>{id}</PlayerName>
    </StyledPlayerInfo>
  );
}

export default PlayerInfo;
