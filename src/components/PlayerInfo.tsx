import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { StoreType } from '../models/Store';
import { withProps } from '../types/withProps';
import { observer, inject } from 'mobx-react';
import { intercept } from 'mobx';
import { ScalarNode } from 'mobx-state-tree/dist/internal';
import { IValueWillChange } from 'mobx/lib/types/observablevalue';

interface Props {
  playerId: string;
  store?: StoreType;
}

interface State {
  cssAnimationHealth: string;
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

const inAndOut = keyframes`
  0% {
    transform: translate(100%, 50%);
  }
  50% {
    transform: translate(108%, 50%);
  }
  100% {
    transform: translate(100%, 50%);
  }
`;

const Hint = styled.div`
  position: absolute;
  right: 0;
  transform: translate(100%, 50%);
  display: flex;
  padding-left: 16px;
  font-family: 'Acme';
  font-size: 24px;
  animation: ${inAndOut} 1.2s infinite;
`;

interface PlayerHealthProps {
  health: number;
  cssAnimation: string;
}

const shake = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  25% {
    transform: translate(6px, 0);
  }
  50% {
    opacity: 0.5;
  }
  75% {
    transform: translate(-6px, 0);
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const shakeBig = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  25% {
    transform: translate(9px, 0);
  }
  50% {
    opacity: 0.5;
    transform: translateY(-3px);
  }
  75% {
    transform: translate(-9px, 0);
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const greenFade = keyframes`
  0% {
    color: currentColor;
  }
  40% {
    color: #04b104;
  }
  100% {
    color: currentColor;
  }
`;

const healthDamageAnimation = `${shake} 0.4s`;
const healthBigDamageAnimation = `${shakeBig} 0.2s 2`;
const healthHealAnimation = `${greenFade} 1s`;

const PlayerHealth = withProps<PlayerHealthProps>()(Stat.extend)`
  ${({ health }: PlayerHealthProps) => (health <= 5 ? 'color: red' : '')};
  animation: ${({ cssAnimation }: PlayerHealthProps) =>
    cssAnimation ? `${cssAnimation}` : ''};
`;

@inject('store')
@observer
export class PlayerInfo extends React.Component<Props, State> {
  /** Holds the interceptor for disposal during unmounting. */
  dispose: () => void;
  constructor(props: Props) {
    super(props);
    this.state = {
      cssAnimationHealth: '',
    };
  }
  componentDidMount() {
    this.dispose = intercept(
      this.getPlayer(),
      'health',
      (change: IValueWillChange<ScalarNode>) => {
        this.setState({
          cssAnimationHealth: '',
        });
        const healthDiff = change.newValue.value - this.getPlayer().health;
        window.requestAnimationFrame(() => {
          if (healthDiff <= -5) {
            this.setState({
              cssAnimationHealth: healthBigDamageAnimation,
            });
          } else if (healthDiff < 0) {
            this.setState({
              cssAnimationHealth: healthDamageAnimation,
            });
          } else if (healthDiff > 0) {
            this.setState({
              cssAnimationHealth: healthHealAnimation,
            });
          }
        });
        return change;
      }
    );
  }
  componentWillUnmount() {
    this.dispose();
  }
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
          <Stat title="Available money">
            💵 {this.getPlayer().hand.availableMoney}
          </Stat>
          <PlayerHealth
            title="Health"
            health={this.getPlayer().health}
            cssAnimation={this.state.cssAnimationHealth}
          >
            ❤️ {this.getPlayer().health}/{this.getPlayer().maxHealth}
          </PlayerHealth>
          <Stat title="Available attack">
            👊 {this.getPlayer().hand.availableAttack}
          </Stat>
        </StatsContainer>
        {!this.isCurrentTurn &&
          this.props.store!.currentPlayer.hand.availableAttack > 0 && (
            <Hint>⬅️ Click to attack!</Hint>
          )}
      </StyledPlayerInfo>
    );
  }
}

export default PlayerInfo;
