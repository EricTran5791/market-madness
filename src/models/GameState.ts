import { types } from 'mobx-state-tree';
import { Player } from './Player';

export enum GamePhase {
  GameOver = 'Game Over',
  PlayersTurn = 'Your turn',
  ComputersTurn = "Computer's turn",
}

export enum GameLogEntryCategory {
  Attack = 'Attack',

  Buy = 'Buy',
  Draw = 'Draw',
  Heal = 'Heal',
  IncreaseMaxHealth = 'Increase Max Health',
  Trash = 'Trash',
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
    currentPlayer: types.reference(Player),
    currentTurnNumber: types.optional(types.number, 0),
    gameLog: types.optional(types.array(GameLogEntry), []),
  })
  .actions(self => ({
    addGameLogEntry(
      category: string,
      { cardName, target, value = 0 }: GameLogEntryParams
    ) {
      let message = `${self.currentPlayer.id} ${category}`;
      switch (category) {
        case GameLogEntryCategory.Attack:
          message = `${
            self.currentPlayer.id
          } dealt ${value} damage to ${target} with ${cardName}`;
          break;
        case GameLogEntryCategory.Buy:
          message = `${self.currentPlayer.id} bought ${cardName}`;
          break;
        case GameLogEntryCategory.Draw:
          message = `${self.currentPlayer.id} drew ${value} card${
            value > 1 ? 's' : ''
          } with ${cardName}`;
          break;
        case GameLogEntryCategory.Heal:
          message = `${
            self.currentPlayer.id
          } healed for ${value} with ${cardName}`;
          break;
        case GameLogEntryCategory.IncreaseMaxHealth:
          message = `${
            self.currentPlayer.id
          } increased their max health by ${value} with ${cardName}`;
          break;
        case GameLogEntryCategory.Trash:
          message = `${self.currentPlayer.id} trashed ${cardName}`;
          break;
        default:
          break;
      }

      self.gameLog.push(
        GameLogEntry.create({
          playerId: self.currentPlayer.id,
          category,
          message,
        })
      );
    },
  }));

export type GameStateModelType = typeof GameState.Type;
