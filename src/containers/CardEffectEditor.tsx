import * as React from 'react';
import styled from 'styled-components';
import {
  CardEffect,
  initialBasicCardEffect,
  CardEffectKind,
  CardEffectCategory,
  InteractiveCardEffectCategory,
  InteractiveCardEffectResolveType,
  initialInteractiveCardEffect,
} from '../types/cardEffect.types';
import { Title, ControlContainer, Label } from './CardEditor';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

interface Props {
  cardEffect: CardEffect | undefined;
  cardEffectIndex: number | undefined;
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
  componentWillMount() {
    this.setState({
      cardEffect: this.props.cardEffect || initialBasicCardEffect,
      editMode: this.props.cardEffect ? 'Update' : 'Add',
    });
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
            _ => _ === this.state.cardEffect.kind
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
        {/** TODO: Change to a drop down that queries the library for all card names */ this
          .state.cardEffect.kind === CardEffectKind.Basic && (
          <TextField
            label="Gained Card Name"
            onChanged={(value: string) => {
              if (this.state.cardEffect.kind === CardEffectKind.Basic) {
                this.setState({
                  cardEffect: {
                    ...this.state.cardEffect,
                    gainedCardName: value,
                  },
                });
              }
            }}
          />
        )}
        {this.state.cardEffect.kind === CardEffectKind.Interactive && (
          <Dropdown
            label="Resolve Type"
            selectedKey={Object.keys(InteractiveCardEffectResolveType).find(
              _ =>
                this.state.cardEffect.kind === CardEffectKind.Interactive &&
                _ === this.state.cardEffect.resolveType
            )}
            options={Object.keys(InteractiveCardEffectResolveType).map(key => {
              return { key, text: InteractiveCardEffectResolveType[key] };
            })}
            onChanged={({ key }: IDropdownOption) => {
              if (this.state.cardEffect.kind === CardEffectKind.Interactive) {
                this.setState({
                  cardEffect: {
                    ...this.state.cardEffect,
                    resolveType: InteractiveCardEffectResolveType[key],
                  },
                });
              }
            }}
          />
        )}
        {this.state.cardEffect.kind === CardEffectKind.Interactive && (
          <ControlContainer>
            <Label># of Cards to Resolve</Label>
            <Slider
              value={this.state.cardEffect.numCardsToResolve}
              min={0}
              max={10}
              step={1}
              onChange={value => {
                if (this.state.cardEffect.kind === CardEffectKind.Interactive) {
                  this.setState({
                    cardEffect: {
                      ...this.state.cardEffect,
                      numCardsToResolve: value,
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
