import { types } from 'mobx-state-tree';

export enum GamePhase {
  gameStart = '[Game] Start',
  gameEnd = '[Game] End',
  turnStart = '[Turn] Start',
  turnEnd = '[Turn] End',
  actionStart = '[Action] Start',
  actionEnd = '[Action] End',
  buyStart = '[Buy] Start',
  buyEnd = '[Buy] End',
  attackStart = '[Attack] Start',
  attackEnd = '[Attack] End',
}

export const GameState = types.model('GameState', {
  currentPlayerId: types.string,
  currentGamePhase: types.enumeration(
    'Game Phase',
    Object.keys(GamePhase).map(key => GamePhase[key])
  ),
});

export type GameStateModelType = typeof GameState.Type;
