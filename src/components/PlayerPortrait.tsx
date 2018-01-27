import * as React from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  health: number;
}

const StyledPlayerPortraitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledPlayerPortrait = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 72px;
  height: 72px;
  border-radius: 100%;
  margin-bottom: 8px;
`;

const PlayerName = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const PlayerHealth = styled.div`
  color: white;
  font-size: 32px;
  font-weight: bold;
`;

function PlayerPortrait({ name, health }: Props) {
  return (
    <StyledPlayerPortraitContainer>
      <StyledPlayerPortrait>
        <PlayerHealth>{health}</PlayerHealth>
      </StyledPlayerPortrait>
      <PlayerName>{name}</PlayerName>
    </StyledPlayerPortraitContainer>
  );
}

export default PlayerPortrait;
