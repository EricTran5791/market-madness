import * as React from 'react';
import styled from 'styled-components';
import { StoreType } from '../models/Store';
import { withProps } from '../withProps';
import { observer, inject } from 'mobx-react';

interface Props {
  playerId: string;
  store?: StoreType;
}

interface PlayerInfoProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  isCurrentTurn: boolean;
}

const StyledPlayerInfo = withProps<PlayerInfoProps>()(styled.div)`
  cursor: ${({ isCurrentTurn }: PlayerInfoProps) =>
    isCurrentTurn ? 'default' : 'pointer'};
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  min-width: 300px;
  border-radius: 2px;
  background-color: whitesmoke;
  outline: ${({ isCurrentTurn }: PlayerInfoProps) =>
    isCurrentTurn ? '3px solid seagreen' : 'none'};
`;

const PlayerName = styled.div`
  font-family: 'Acme';
  font-size: 32px;
  text-align: center;
  margin-bottom: 8px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
`;

const Stat = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Acme';
  font-size: 24px;
  margin: 0 8px;
`;

const Hint = styled.div`
  position: absolute;
  right: 0;
  transform: translate(100%, 50%);
  display: flex;
  padding-left: 16px;
  font-family: 'Acme';
  font-size: 24px;
  animation: side-hover 1.2s infinite;

  @keyframes side-hover {
    0% {
      transform: translate(100%, 50%);
    }
    50% {
      transform: translate(108%, 50%);
    }
    100% {
      transform: translate(100%, 50%);
    }
  }
`;

interface PlayerHealthProps {
  health: number;
}

const PlayerHealth = withProps<PlayerHealthProps>()(Stat.extend)`
  ${({ health }: PlayerHealthProps) => (health <= 5 ? 'color: red' : '')};
`;

@inject('store')
@observer
export class PlayerInfo extends React.Component<Props, object> {
  getPlayer() {
    return this.props.store!.getPlayer(this.props.playerId);
  }
  /** Whether or not it's the current turn of the player represented by the PlayerInfo. */
  get isCurrentTurn() {
    return this.getPlayer().id === this.props.store!.currentPlayer.id;
  }
  attackPlayer() {
    if (!this.isCurrentTurn) {
      this.props.store!.currentPlayer.attackOtherPlayer();
    }
  }
  render() {
    return (
      <StyledPlayerInfo
        onClick={(e: React.MouseEvent<HTMLElement>) => this.attackPlayer()}
        isCurrentTurn={this.isCurrentTurn}
      >
        <PlayerName>{this.props.playerId}</PlayerName>
        <StatsContainer>
          <Stat title="Available buying power">
            💵 {this.getPlayer().hand.availableBuyingPower}
          </Stat>
          <PlayerHealth title="Health" health={this.getPlayer().health}>
            ❤️ {this.getPlayer().health}/{this.getPlayer().maxHealth}
          </PlayerHealth>
          <Stat title="Available attack value">
            👊 {this.getPlayer().hand.availableAttackValue}
          </Stat>
        </StatsContainer>
        {!this.isCurrentTurn &&
          this.props.store!.currentPlayer.hand.availableAttackValue > 0 && (
            <Hint>⬅️ Click to attack!</Hint>
          )}
      </StyledPlayerInfo>
    );
  }
}

export default PlayerInfo;
