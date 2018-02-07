import { types, detach, flow, destroy } from 'mobx-state-tree';
import { GameState, GamePhase, GameLogEntryCategory } from './GameState';
import { Player, PlayerId } from './Player';
import { Market } from './Market';
import { Trash } from './Trash';
import {
  CardEffectCategory,
  CardEffectKind,
  BasicCardEffectSnapshotType,
  InteractiveCardEffectSnapshotType,
  InteractiveCardEffectCategory,
  InteractiveCardEffectModelType,
} from '../models/CardEffect';
import { CardModelType, CardCategory } from '../models/Card';
import { reaction } from 'mobx';
import { ActiveCardEffectStatus } from './ActiveCardEffectState';

export const Store = types
  .model('Store', {
    trash: Trash,
    market: Market,
    players: types.array(Player),
    gameState: GameState,
  })
  .views(self => ({
    get currentGamePhase() {
      return self.gameState.currentGamePhase;
    },
    getPlayer(id: string) {
      return self.players.find(player => player.id === id);
    },
    get currentPlayer() {
      return self.gameState.currentPlayer;
    },
    get otherPlayer() {
      return self.players.find(
        player => player.id !== self.gameState.currentPlayer.id
      );
    },
  }))
  .actions(self => {
    function changeCurrentPlayer() {
      self.gameState.currentPlayer = self.otherPlayer;
    }

    function createNewGame() {
      self.gameState.currentGamePhase = GamePhase.Player1Turn;
    }

    function endTurn() {
      self.gameState.currentGamePhase =
        self.otherPlayer.id === PlayerId.Player1
          ? GamePhase.Player2Turn
          : GamePhase.Player1Turn;
    }

    function buyMarketCard(card: CardModelType) {
      if (self.currentPlayer.hand.spendMoney(card.cost)) {
        self.gameState.addGameLogEntry(GameLogEntryCategory.Buy, {
          cardName: card.name,
        });
        self.currentPlayer.discardPile.add(detach(card));
      }
    }

    /**
     * Processes card effects synchronously and recursively.
     * Processes the first effect, then processes the rest of the effects.
     */
    const processCardEffects = flow(function*(
      card: CardModelType,
      effects:
        | BasicCardEffectSnapshotType[]
        | InteractiveCardEffectSnapshotType[]
    ) {
      if (effects.length > 0) {
        // Process the first effect and wait until it completes before continuing
        yield processCardEffect(card, effects[0]);

        // Clear the active effect if applicable
        if (effects[0].kind === CardEffectKind.Interactive) {
          self.gameState.activeCardEffect.clearActiveEffect();
        }

        processCardEffects(card, effects.slice(1)); // Process the rest of the effects
      } else if (effects.length === 0 && card.category === CardCategory.NPC) {
        // The NPC is defeated, we destroy the NPC card after processing its effects
        destroy(card);
      }
    });

    /**
     * Processes an individual card effect.
     * Returns a promise that is resolved once the card effect is processed.
     */
    function processCardEffect(
      card: CardModelType,
      effect: BasicCardEffectSnapshotType
    ): Promise<void> {
      const promise = new Promise<void>((resolve, reject) => {
        const currentPlayer = self.currentPlayer;
        if (effect.kind === CardEffectKind.Basic) {
          const { category, value }: BasicCardEffectSnapshotType = effect;
          switch (category) {
            case CardEffectCategory.GainAttackValue:
              self.currentPlayer.hand.increaseAttackValue(value);
              break;
            case CardEffectCategory.GainMoney:
              self.gameState.addGameLogEntry(GameLogEntryCategory.GainMoney, {
                cardName: card.name,
                value: value,
              });
              self.currentPlayer.hand.increaseMoney(value);
              break;
            case CardEffectCategory.Draw:
              const cardsDrawn = currentPlayer.drawFromDeck(value);
              self.gameState.addGameLogEntry(GameLogEntryCategory.Draw, {
                cardName: card.name,
                value: cardsDrawn,
              });
              break;
            case CardEffectCategory.Heal:
              const amtHealed = currentPlayer.heal(value);
              self.gameState.addGameLogEntry(GameLogEntryCategory.Heal, {
                cardName: card.name,
                value: amtHealed,
              });
              break;
            case CardEffectCategory.IncreaseMaxHealth:
              currentPlayer.increaseMaxHealth(value);
              self.gameState.addGameLogEntry(
                GameLogEntryCategory.IncreaseMaxHealth,
                {
                  cardName: card.name,
                  value: value,
                }
              );
              break;
            case CardEffectCategory.TrashSelf:
              self.trash.trashCard(card);
              self.gameState.addGameLogEntry(GameLogEntryCategory.Trash, {
                cardName: card.name,
                targets: [card.name],
              });
              break;
            default:
              break;
          }
          resolve();
        } else if (effect.kind === CardEffectKind.Interactive) {
          let {
            category,
            numCardsToResolve,
          }: InteractiveCardEffectSnapshotType = effect;

          // Don't process the interactive card effect if there are no unplayed cards in hand.
          if (
            numCardsToResolve > 0 &&
            self.currentPlayer.hand.cardStack.unplayedCards.length === 0
          ) {
            resolve();
            return;
          }

          self.gameState.activeCardEffect.setActiveEffect(
            effect as InteractiveCardEffectModelType
          );

          switch (category) {
            case InteractiveCardEffectCategory.MandatoryDiscard: {
              // Subscribe to the card refs to resolve.
              const disposer = reaction(
                () => self.gameState.activeCardEffect.status,
                status => {
                  if (status === ActiveCardEffectStatus.Completed) {
                    const cardsToResolve =
                      self.gameState.activeCardEffect.cardsToResolve;
                    if (cardsToResolve.length > 0) {
                      // Discard each card
                      cardsToResolve.forEach(_ => {
                        self.currentPlayer.discardCard(_);
                      });
                      self.gameState.addGameLogEntry(
                        GameLogEntryCategory.Discard,
                        {
                          cardName: card.name,
                          targets: cardsToResolve.map(_ => _.name),
                        }
                      );
                    }
                    disposer(); // Unsubscribe
                    resolve();
                  }
                }
              );
              return;
            }
            case InteractiveCardEffectCategory.OptionalTrash: {
              // Subscribe to the card refs to resolve.
              const disposer = reaction(
                () => self.gameState.activeCardEffect.status,
                status => {
                  if (status === ActiveCardEffectStatus.Completed) {
                    const cardsToResolve =
                      self.gameState.activeCardEffect.cardsToResolve;
                    if (cardsToResolve.length > 0) {
                      // Trash each card
                      cardsToResolve.forEach(_ => {
                        self.currentPlayer.hand.trashCard(_);
                      });
                      self.gameState.addGameLogEntry(
                        GameLogEntryCategory.Trash,
                        {
                          cardName: card.name,
                          targets: cardsToResolve.map(_ => _.name),
                        }
                      );
                    }
                    disposer(); // Unsubscribe
                    resolve();
                  }
                }
              );
              return;
            }
            default:
              return;
          }
        }
      });
      return promise;
    }

    function playCard(card: CardModelType) {
      card.isPlayed = true;

      // If there isn't an active card effect, then we process the card as normal.
      if (!self.gameState.isCardEffectActive) {
        switch (card.category) {
          case CardCategory.Money:
            self.currentPlayer.hand.increaseMoney(card.money);
            break;
          default:
            processCardEffects(card, card.effects);
            break;
        }
      } else {
        // Otherwise we add the card to the array of card refs to resolve and don't process the card's effects.
        self.gameState.activeCardEffect.addCardToResolve(card);
      }
      return;
    }

    function attackNPC(card: CardModelType) {
      if (self.currentPlayer.hand.spendAttackValue(card.health)) {
        self.gameState.addGameLogEntry(GameLogEntryCategory.DefeatNPC, {
          cardName: card.name,
        });
        processCardEffects(card, card.effects);
      }
    }

    return {
      changeCurrentPlayer,
      createNewGame,
      endTurn,
      buyMarketCard,
      processCardEffects,
      processCardEffect,
      playCard,
      attackNPC,
    };
  });

export type StoreType = typeof Store.Type;
