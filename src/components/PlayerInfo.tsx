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
  isCurrentTurn: boolean;
}

const StyledPlayerInfo = withProps<PlayerInfoProps>()(styled.div)`
  user-select: none;
  position: relative;
  display: grid;
  grid-template-columns: 1fr fit-content(100%);
  grid-gap: 16px;
  width: 100%;
  padding: 8px;
  margin: 16px 0;
  box-sizing: border-box;
  border-radius: 2px;
  outline: ${({ isCurrentTurn }: PlayerInfoProps) =>
    isCurrentTurn ? '3px solid seagreen' : 'none'};
`;

const PlayerName = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Acme';
  font-size: 24px;
  line-height: 24px;
  text-align: center;
`;

const Stat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Acme';
  font-size: 32px;
  line-height: 32px;
  margin: 0 8px;
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

  render() {
    return (
      <StyledPlayerInfo isCurrentTurn={this.isCurrentTurn}>
        <PlayerName>{this.props.playerId}</PlayerName>
        <PlayerHealth
          title="Health"
          health={this.getPlayer().health}
          cssAnimation={this.state.cssAnimationHealth}
        >
          ❤️ {this.getPlayer().health}/{this.getPlayer().maxHealth}
        </PlayerHealth>
      </StyledPlayerInfo>
    );
  }
}

export default PlayerInfo;
