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

export enum GameLogEntryCategory {
  Buy = 'Buy',
  Attack = 'Attack',
}

export type GameLogEntryParams = {
  cardName?: string;
  target?: string;
  attackValue?: number;
};

export const GameLogEntry = types.model('GameLogEntry', {
  playerId: types.string,
  category: types.string,
  message: types.string,
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
    addGameLogEntry(
      category: string,
      { cardName, target, attackValue }: GameLogEntryParams
    ) {
      let message = `${self.currentPlayerId} ${category}`;
      switch (category) {
        case GameLogEntryCategory.Buy:
          message = `${self.currentPlayerId} bought ${cardName}`;
          break;
        case GameLogEntryCategory.Attack:
          message = `${
            self.currentPlayerId
          } dealt ${attackValue} damage to ${target} with ${cardName}`;
          break;
        default:
          break;
      }

      self.gameLog.push(
        GameLogEntry.create({
          playerId: self.currentPlayerId,
          category,
          message,
        })
      );
    },
  }));

export type GameStateModelType = typeof GameState.Type;
