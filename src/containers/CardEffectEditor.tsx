import * as React from 'react';
import styled from 'styled-components';
import {
  CardEffect,
  initialBasicCardEffect,
  CardEffectKind,
  CardEffectCategory,
  InteractiveCardEffectCategory,
  InteractiveCardEffectResolveKind,
  initialInteractiveCardEffect,
  InteractiveCardEffectResolveTarget,
} from '../types/cardEffect.types';
import { Title, ControlContainer, Label } from './CardEditor';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  ComboBox,
  IComboBoxOption,
  IComboBox,
} from 'office-ui-fabric-react/lib/ComboBox';

interface Props {
  cardEffect: CardEffect | undefined;
  cardEffectIndex: number | undefined;
  cardLibraryItems: IComboBoxOption[];
  onCancel: () => void;
  onAdd: (effect: CardEffect) => void;
  onUpdate: (effect: CardEffect, index: number) => void;
}

type EditMode = 'Add' | 'Update';

interface State {
  cardEffect: CardEffect;
  /** The edit mode will be 'Add' if no card effect was passed in, otherwise it will be 'Update' */
  editMode: EditMode;
}

const StyledCardEffectEditor = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  min-height: 450px;
  padding: 24px;
`;

const FooterControls = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: auto;
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 130px;
  grid-gap: 8px;
`;

class CardEffectEditor extends React.Component<Props, State> {
  private gainedCardComboBox: IComboBox;

  constructor(props: Props) {
    super(props);
    this.state = {
      cardEffect: this.props.cardEffect || initialBasicCardEffect,
      editMode: this.props.cardEffect ? 'Update' : 'Add',
    };
  }

  setGainedCardComboBoxRef(component: IComboBox) {
    this.gainedCardComboBox = component;
  }

  onCancel() {
    this.props.onCancel();
  }

  onAdd(effect: CardEffect) {
    this.props.onAdd(effect);
  }

  onEdit(effect: CardEffect, index: number = -1) {
    if (index === -1) {
      console.error(
        'Error: Unable to update a card effect without a corresponding index.'
      );
    }
    this.props.onUpdate(effect, index);
  }

  render() {
    return (
      <StyledCardEffectEditor>
        <Title>
          {this.state.editMode === 'Add'
            ? 'Add Card Effect'
            : 'Update Card Effect'}
        </Title>
        <Dropdown
          label="Kind"
          selectedKey={Object.keys(CardEffectKind).find(
            _ => CardEffectKind[_] === this.state.cardEffect.kind
          )}
          options={Object.keys(CardEffectKind).map(key => {
            return { key, text: CardEffectKind[key] };
          })}
          onChanged={({ key }: IDropdownOption) => {
            // Set to the initial card effect states
            if (CardEffectKind[key] === CardEffectKind.Basic) {
              this.setState({
                cardEffect: {
                  ...initialBasicCardEffect,
                },
              });
            } else {
              this.setState({
                cardEffect: {
                  ...initialInteractiveCardEffect,
                },
              });
            }
          }}
        />
        <Dropdown
          label="Category"
          selectedKey={Object.keys(CardEffectCategory)
            .concat(Object.keys(InteractiveCardEffectCategory))
            .find(
              _ =>
                CardEffectCategory[_] === this.state.cardEffect.category ||
                InteractiveCardEffectCategory[_] ===
                  this.state.cardEffect.category
            )}
          options={
            this.state.cardEffect.kind === CardEffectKind.Basic
              ? Object.keys(CardEffectCategory).map(key => {
                  return { key, text: CardEffectCategory[key] };
                })
              : Object.keys(InteractiveCardEffectCategory).map(key => {
                  return { key, text: InteractiveCardEffectCategory[key] };
                })
          }
          onChanged={({ key }: IDropdownOption) => {
            this.setState({
              cardEffect: {
                ...this.state.cardEffect,
                category:
                  this.state.cardEffect.kind === CardEffectKind.Basic
                    ? CardEffectCategory[key]
                    : InteractiveCardEffectCategory[key],
              },
            });
          }}
        />
        {this.state.cardEffect.kind === CardEffectKind.Basic && (
          <ControlContainer>
            <Label>Value</Label>
            <Slider
              value={this.state.cardEffect.value}
              min={0}
              max={10}
              step={1}
              onChange={value => {
                if (this.state.cardEffect.kind === CardEffectKind.Basic) {
                  this.setState({
                    cardEffect: {
                      ...this.state.cardEffect,
                      value,
                    },
                  });
                }
              }}
            />
          </ControlContainer>
        )}
        {this.state.cardEffect.kind === CardEffectKind.Basic && (
          <>
            <Label>Gained Card</Label>
            <ComboBox
              options={this.props.cardLibraryItems}
              value={
                (this.state.cardEffect.gainedCard &&
                  this.state.cardEffect.gainedCard.name) ||
                'Choose a card...'
              }
              allowFreeform
              autoComplete="on"
              componentRef={component => {
                this.setGainedCardComboBoxRef(component);
              }}
              onChanged={(options, index) => {
                if (
                  options &&
                  this.state.cardEffect.kind === CardEffectKind.Basic
                ) {
                  this.setState({
                    cardEffect: {
                      ...this.state.cardEffect,
                      gainedCard: {
                        id: `${options.key}`,
                        name: `${options.text}`,
                      },
                    },
                  });
                } else if (
                  !options &&
                  this.state.cardEffect.kind === CardEffectKind.Basic
                ) {
                  const { gainedCard, ...cardEffect } = this.state.cardEffect;
                  this.setState({
                    cardEffect: {
                      ...cardEffect,
                    },
                  });
                }
              }}
              onClick={() => {
                this.gainedCardComboBox.focus(true);
              }}
            />
          </>
        )}
        {this.state.cardEffect.kind === CardEffectKind.Interactive && (
          <Dropdown
            label="Resolve Kind"
            selectedKey={Object.keys(InteractiveCardEffectResolveKind).find(
              _ =>
                this.state.cardEffect.kind === CardEffectKind.Interactive &&
                InteractiveCardEffectResolveKind[_] ===
                  this.state.cardEffect.resolveCondition.kind
            )}
            options={Object.keys(InteractiveCardEffectResolveKind).map(key => {
              return { key, text: InteractiveCardEffectResolveKind[key] };
            })}
            onChanged={({ key }: IDropdownOption) => {
              if (this.state.cardEffect.kind === CardEffectKind.Interactive) {
                this.setState({
                  cardEffect: {
                    ...this.state.cardEffect,
                    resolveCondition: {
                      ...this.state.cardEffect.resolveCondition,
                      kind: InteractiveCardEffectResolveKind[key],
                    },
                  },
                });
              }
            }}
          />
        )}
        {this.state.cardEffect.kind === CardEffectKind.Interactive && (
          <Dropdown
            label="Resolve Target"
            selectedKey={Object.keys(InteractiveCardEffectResolveTarget).find(
              _ =>
                this.state.cardEffect.kind === CardEffectKind.Interactive &&
                InteractiveCardEffectResolveTarget[_] ===
                  this.state.cardEffect.resolveCondition.target
            )}
            options={Object.keys(InteractiveCardEffectResolveTarget).map(
              key => {
                return { key, text: InteractiveCardEffectResolveTarget[key] };
              }
            )}
            onChanged={({ key }: IDropdownOption) => {
              if (this.state.cardEffect.kind === CardEffectKind.Interactive) {
                this.setState({
                  cardEffect: {
                    ...this.state.cardEffect,
                    resolveCondition: {
                      ...this.state.cardEffect.resolveCondition,
                      target: InteractiveCardEffectResolveTarget[key],
                    },
                  },
                });
              }
            }}
          />
        )}
        {this.state.cardEffect.kind === CardEffectKind.Interactive && (
          <ControlContainer>
            <Label># of Plays to Resolve</Label>
            <Slider
              value={this.state.cardEffect.resolveCondition.numPlaysToResolve}
              min={0}
              max={10}
              step={1}
              onChange={value => {
                if (this.state.cardEffect.kind === CardEffectKind.Interactive) {
                  this.setState({
                    cardEffect: {
                      ...this.state.cardEffect,
                      resolveCondition: {
                        ...this.state.cardEffect.resolveCondition,
                        numPlaysToResolve: value,
                      },
                    },
                  });
                }
              }}
            />
          </ControlContainer>
        )}
        <FooterControls>
          <ControlsGrid>
            <DefaultButton
              text="Cancel"
              onClick={() => {
                this.onCancel();
              }}
            />
            <DefaultButton
              primary
              text={this.state.editMode === 'Add' ? 'Add' : 'Update'}
              onClick={() => {
                this.state.editMode === 'Add'
                  ? this.onAdd(this.state.cardEffect)
                  : this.onEdit(
                      this.state.cardEffect,
                      this.props.cardEffectIndex
                    );
              }}
            />
          </ControlsGrid>
        </FooterControls>
      </StyledCardEffectEditor>
    );
  }
}

export default CardEffectEditor;
