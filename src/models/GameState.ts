import { types } from 'mobx-state-tree';
import { Player } from './Player';
import { ActiveCardEffectState } from './ActiveCardEffectState';

export enum GamePhase {
  GameOver = 'Game Over',
  Player1Turn = "Player 1's turn",
  Player2Turn = "Player 2's turn",
}

export enum GameLogEntryCategory {
  Attack = 'Attack',

  Buy = 'Buy',
  Discard = 'Discard',
  Draw = 'Draw',
  GainMoney = 'Gain Money',
  Heal = 'Heal',
  IncreaseMaxHealth = 'Increase Max Health',
  Trash = 'Trash',
}

export type GameLogEntryParams = {
  cardName?: string;
  targets?: string[];
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
    currentPlayer: types.reference(types.late(() => Player)),
    currentTurnNumber: types.optional(types.number, 0),
    activeCardEffect: ActiveCardEffectState,
    gameLog: types.optional(types.array(GameLogEntry), []),
  })
  .views(self => ({
    /** Whether or not a card effect is currently active. */
    get isCardEffectActive() {
      return self.activeCardEffect.effect !== null;
    },
  }))
  .actions(self => ({
    changeGamePhase(phase: GamePhase) {
      self.currentGamePhase = phase;
    },
    addGameLogEntry(
      category: string,
      { cardName, targets, value = 0 }: GameLogEntryParams
    ) {
      let message = `${self.currentPlayer.id} ${category}`;
      switch (category) {
        case GameLogEntryCategory.Attack:
          message = `${
            self.currentPlayer.id
          } dealt ${value} damage to ${targets!.join(', ')}`;
          break;
        case GameLogEntryCategory.Buy:
          message = `${self.currentPlayer.id} bought ${cardName}`;
          break;
        case GameLogEntryCategory.Discard:
          message = `${self.currentPlayer.id} discarded ${targets!.join(
            ', '
          )} with ${cardName}`;
          break;
        case GameLogEntryCategory.Draw:
          message = `${self.currentPlayer.id} drew ${value} card${
            value > 1 ? 's' : ''
          } with ${cardName}`;
          break;
        case GameLogEntryCategory.GainMoney:
          message = `${self.currentPlayer.id} gained ${value} money`;
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
          message = `${self.currentPlayer.id} trashed ${targets!.join(
            ', '
          )} with ${cardName}`;
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
