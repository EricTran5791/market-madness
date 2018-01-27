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

export const GameLogEntry = types.model('GameLogEntry', {
  playerId: types.string,
  action: types.string,
  turnNumber: types.number,
});

export type GameLogEntryModelType = typeof GameLogEntry.Type;

export const GameState = types
  .model('GameState', {
    currentGamePhase: types.enumeration(
      'Game Phase',
      Object.keys(GamePhase).map(key => GamePhase[key])
    ),
    currentPlayerId: types.string,
    currentTurnNumber: types.optional(types.number, 0),
    gameLog: types.optional(types.array(GameLogEntry), []),
  })
  .actions(self => ({
    addGameLogEntry(action: string) {
      self.gameLog.push(
        GameLogEntry.create({
          playerId: self.currentPlayerId,
          action,
          turnNumber: self.currentTurnNumber,
        })
      );
    },
  }));

export type GameStateModelType = typeof GameState.Type;
