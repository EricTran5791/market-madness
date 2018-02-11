import * as React from 'react';
import styled from 'styled-components';
import {
  Card,
  initialCard,
  CardCategory,
  CardSubcategory,
  CardCostKind,
} from '../types/cardTypes';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Modal } from 'office-ui-fabric-react/lib/Modal';

import { initializeIcons } from '@uifabric/icons';
import CardEffectsDetailsList from '../components/CardEffectsDetailsList';
import CardEffectEditor from './CardEffectEditor';
import { CardEffect } from '../types/cardEffect.types';

initializeIcons();

interface State {
  currentCard: Card;
  cardEffectEditor: {
    isOpen: boolean;
    effect: CardEffect | undefined;
  };
}

const StyledCardEditor = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 16px;
  padding: 16px;
`;

const CardEditorSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-family: 'Acme';
  font-size: 24px;
  margin-bottom: 16px;
`;

export const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Label = styled.label`
  padding: 5px 0;
`;

export const CardCostContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 16px;
  margin: 16px 0;
`;

const TextFieldContainer = styled.div`
  textarea {
    height: 60vh;
    max-height: 60vh;
  }
`;

class CardEditor extends React.Component<object, State> {
  componentWillMount() {
    this.setState({
      currentCard: {
        ...initialCard,
      },
      cardEffectEditor: {
        isOpen: false,
        effect: undefined,
      },
    });
    this.editCardEffect = this.editCardEffect.bind(this);
    this.removeCardEffect = this.removeCardEffect.bind(this);
  }

  updateCurrentCard(card: Partial<Card>) {
    this.setState({
      currentCard: {
        ...this.state.currentCard,
        ...card,
      },
    });
  }

  editCardEffect(index: number) {
    this.setState({
      cardEffectEditor: {
        isOpen: true,
        effect: this.state.currentCard.effects.find((_, i) => i === index),
      },
    });
  }

  removeCardEffect(index: number) {
    this.updateCurrentCard({
      effects: this.state.currentCard.effects.filter((_, i) => i !== index),
    });
  }

  render() {
    return (
      <StyledCardEditor>
        <CardEditorSection>
          <Title>Card Editor</Title>
          <TextField
            label="Name"
            onChanged={(value: string) => {
              this.updateCurrentCard({ name: value });
            }}
          />

          <Dropdown
            label="Category"
            selectedKey={this.state.currentCard.category}
            options={Object.keys(CardCategory).map(key => {
              return { key, text: CardCategory[key] };
            })}
            onChanged={({ key }: IDropdownOption) => {
              this.updateCurrentCard({ category: CardCategory[key] });
            }}
          />

          <Dropdown
            label="Subcategories"
            multiSelect
            options={Object.keys(CardSubcategory)
              .map(key => {
                return {
                  key,
                  text: CardSubcategory[key],
                };
              })
              .sort()}
            onChanged={({ key, selected }: IDropdownOption) => {
              const subcategories: CardSubcategory[] = this.state.currentCard
                .subcategories;
              if (selected) {
                this.updateCurrentCard({
                  subcategories: [
                    ...subcategories,
                    CardSubcategory[key],
                  ].sort(),
                });
              } else {
                this.updateCurrentCard({
                  subcategories: subcategories
                    .filter(_ => _ !== CardSubcategory[key])
                    .sort(),
                });
              }
            }}
            onRenderTitle={(options: IDropdownOption[]) => {
              return (
                <>
                  {options
                    .map(_ => _.text)
                    .sort()
                    .join(', ')}
                </>
              );
            }}
          />

          <TextField
            label="Description"
            onChanged={(value: string) => {
              this.updateCurrentCard({ description: value });
            }}
          />

          <CardCostContainer>
            <Dropdown
              label="Card Cost Kind"
              selectedKey={this.state.currentCard.cost.kind}
              options={Object.keys(CardCostKind).map(key => {
                return { key, text: CardCostKind[key] };
              })}
              onChanged={({ key }: IDropdownOption) => {
                this.updateCurrentCard({
                  cost: {
                    ...this.state.currentCard.cost,
                    kind: CardCostKind[key],
                  },
                });
              }}
            />
            <ControlContainer>
              <Label>Card Cost Value</Label>
              <Slider
                value={this.state.currentCard.cost.value}
                min={0}
                max={10}
                step={1}
                onChange={value => {
                  this.updateCurrentCard({
                    cost: {
                      ...this.state.currentCard.cost,
                      value,
                    },
                  });
                }}
              />
            </ControlContainer>
          </CardCostContainer>

          <ControlContainer>
            <Label>Card Effects</Label>
            <CardEffectsDetailsList
              items={this.state.currentCard.effects}
              onEdit={this.editCardEffect}
              onRemove={this.removeCardEffect}
            />
          </ControlContainer>
        </CardEditorSection>

        <CardEditorSection>
          <Title>Card JSON</Title>
          <TextFieldContainer>
            <TextField
              multiline
              autoAdjustHeight
              readOnly
              value={JSON.stringify(this.state.currentCard, undefined, 2)}
            />
          </TextFieldContainer>
        </CardEditorSection>

        <Modal
          isOpen={this.state.cardEffectEditor.isOpen}
          onDismiss={() =>
            this.setState({
              cardEffectEditor: { isOpen: false, effect: undefined },
            })
          }
        >
          {this.state.cardEffectEditor.isOpen && (
            <CardEffectEditor cardEffect={this.state.cardEffectEditor.effect} />
          )}
        </Modal>
      </StyledCardEditor>
    );
  }
}

export default CardEditor;
