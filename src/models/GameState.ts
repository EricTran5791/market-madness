import { types } from 'mobx-state-tree';
import { Player } from './Player';
import { ActiveCardEffectState } from './ActiveCardEffectState';
import * as uniqid from 'uniqid';

export enum GamePhase {
  GameOver = 'Game Over',
  Player1Turn = "Player 1's turn",
  Player2Turn = "Player 2's turn",
}

export enum GameLogEntryCategory {
  Attack = 'Attack',

  Buy = 'Buy',
  DefeatNPC = 'Defeat NPC',
  Discard = 'Discard',
  Draw = 'Draw',
  GainCardToDiscardPile = 'Gain Card to Discard Pile',
  GainCardToHand = 'Gain Card to Hand',
  GainMoney = 'Gain Money',
  Heal = 'Heal',
  IncreaseMaxHealth = 'Increase Max Health',
  ShuffleCardToDeck = 'Shuffle Card to Deck',
  Trash = 'Trash',
}

export type GameLogEntryParams = {
  cardName?: string;
  gainedCardName?: string;
  targets?: string[];
  value?: number;
};

export const GameLogEntry = types.model('GameLogEntry', {
  uniqid: types.string,
  playerId: types.string,
  category: types.string,
  message: types.string,
  timestamp: types.Date,
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
      { cardName, gainedCardName, targets, value = 0 }: GameLogEntryParams
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
        case GameLogEntryCategory.DefeatNPC:
          message = `${self.currentPlayer.id} defeated ${cardName}`;
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
        case GameLogEntryCategory.GainCardToDiscardPile:
          message = `${
            self.currentPlayer.id
          } gained ${value} ${gainedCardName}`;
          break;
        case GameLogEntryCategory.GainCardToHand:
          message = `${
            self.currentPlayer.id
          } added ${value} ${gainedCardName} to their hand`;
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
        case GameLogEntryCategory.ShuffleCardToDeck:
          message = `${
            self.currentPlayer.id
          } shuffled ${value} ${gainedCardName} to their deck`;
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
          uniqid: uniqid(),
          playerId: self.currentPlayer.id,
          category,
          message,
          timestamp: Date.now(),
        })
      );
    },
  }));

export type GameStateModelType = typeof GameState.Type;
