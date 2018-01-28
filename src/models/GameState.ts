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
  Attack = 'Attack',

  Buy = 'Buy',
  Draw = 'Draw',
  Heal = 'Heal',
}

export type GameLogEntryParams = {
  cardName?: string;
  target?: string;
  value?: number;
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
      { cardName, target, value = 0 }: GameLogEntryParams
    ) {
      let message = `${self.currentPlayerId} ${category}`;
      switch (category) {
        case GameLogEntryCategory.Attack:
          message = `${
            self.currentPlayerId
          } dealt ${value} damage to ${target} with ${cardName}`;
          break;
        case GameLogEntryCategory.Buy:
          message = `${self.currentPlayerId} bought ${cardName}`;
          break;
        case GameLogEntryCategory.Draw:
          message = `${self.currentPlayerId} drew ${value} card${
            value > 1 ? 's' : ''
          } with ${cardName}`;
          break;
        case GameLogEntryCategory.Heal:
          message = `${
            self.currentPlayerId
          } healed for ${value} with ${cardName}`;
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
