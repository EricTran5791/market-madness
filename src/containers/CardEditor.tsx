import * as React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardCategory,
  CardSubcategory,
  CardCostKind,
  initialCard,
} from '../types/cardTypes';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { initializeIcons } from '@uifabric/icons';
import CardEffectsDetailsList, {
  MoveEffectDirection,
} from '../components/CardEffectsDetailsList';
import CardEffectEditor from './CardEffectEditor';
import { CardEffect, CardEffectKind } from '../types/cardEffect.types';
import { List } from 'immutable';
import { printCard } from '../utils/cardGenerator';
import { inject, observer } from 'mobx-react';
import {
  CardEditorStore,
  CardEditorStoreModelType,
} from '../models/CardEditorStore';
import CardView from '../components/CardView';
import { CardLibraryModelType } from '../models/CardLibrary';
import { getSnapshot } from 'mobx-state-tree';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { History } from 'history';

initializeIcons();

interface Props {
  cardId: string;
  history: History;
  cardLibrary?: CardLibraryModelType;
}

interface State {
  /** Track the initial card so that we can replace the old card in the card library after saving. */
  initialCard: { id: string; name: string };
  store: CardEditorStoreModelType;
  cardEffectEditor: {
    isOpen: boolean;
    effect: CardEffect | undefined;
    index: number;
  };
}

const StyledCardEditor = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 32px;
  padding: 16px 32px;
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

export const CardTitle = Title.extend`
  margin: auto 0;
`;

export const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Label = styled.label`
  padding: 5px 0;
`;

export const IdNameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 16px;
  margin: 16px 0;
`;

export const DescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 16px;
  margin: 16px 0;
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

const CardPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const CardEditorOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, fit-content(100%));
  grid-gap: 16px;
  margin-bottom: 32px;

  button {
    height: 48px;
  }
`;

@inject('cardLibrary')
@observer
class CardEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const currentCard =
      props.cardLibrary &&
      props.cardLibrary.cards.find(card => card.id === props.cardId);

    this.state = {
      initialCard: currentCard
        ? { id: currentCard.id, name: currentCard.name }
        : { id: '', name: 'New Card' },
      store: CardEditorStore.create({
        // Copy the requested card if it's in the library, otherwise start with a new card
        currentCard: currentCard
          ? printCard(getSnapshot(currentCard))
          : printCard(initialCard),
        autoGenerateDescription: true,
      }),
      cardEffectEditor: {
        isOpen: false,
        effect: undefined,
        index: -1,
      },
    };

    this.openAddCardEffectEditor = this.openAddCardEffectEditor.bind(this);
    this.openUpdateCardEffectEditor = this.openUpdateCardEffectEditor.bind(
      this
    );
    this.closeCardEffectEditor = this.closeCardEffectEditor.bind(this);
    this.changeCardEffectOrder = this.changeCardEffectOrder.bind(this);

    this.addCardEffect = this.addCardEffect.bind(this);
    this.updateCardEffect = this.updateCardEffect.bind(this);
    this.removeCardEffect = this.removeCardEffect.bind(this);
  }

  updateCurrentCard(card: Partial<Card>) {
    this.state.store.updateCurrentCard(card);
  }

  openAddCardEffectEditor() {
    this.setState({
      cardEffectEditor: {
        isOpen: true,
        effect: undefined,
        index: -1,
      },
    });
  }

  openUpdateCardEffectEditor(index: number) {
    this.setState({
      cardEffectEditor: {
        isOpen: true,
        effect: this.state.store.currentCard.effectsList.find(
          (_, i) => i === index
        ),
        index,
      },
    });
  }

  closeCardEffectEditor() {
    this.setState({
      cardEffectEditor: {
        isOpen: false,
        effect: undefined,
        index: -1,
      },
    });
  }

  addCardEffect(effect: CardEffect) {
    this.updateCurrentCard({
      effects: this.state.store.currentCard.effectsList.push(effect).toArray(),
    });
    this.closeCardEffectEditor();
  }

  updateCardEffect(effect: CardEffect, index: number) {
    this.updateCurrentCard({
      effects: List<CardEffect>(
        this.state.store.currentCard.effectsList.splice(index, 1, effect)
      ).toArray(),
    });
    this.closeCardEffectEditor();
  }

  removeCardEffect(index: number) {
    this.updateCurrentCard({
      effects: this.state.store.currentCard.effectsList.remove(index).toArray(),
    });
  }

  /** Remove the effect at index i from the list, then re-insert it at a new index position. */
  changeCardEffectOrder(index: number, direction: MoveEffectDirection) {
    const movedEffect = this.state.store.currentCard.effectsList.find(
      (_, i) => i === index
    );
    const newIndex = index + (direction === 'Up' ? -1 : 1);
    this.updateCurrentCard({
      effects: this.state.store.currentCard.effectsList
        .remove(index)
        .insert(newIndex, movedEffect)
        .toArray(),
    });
  }

  deleteCard() {
    this.props.cardLibrary!.deleteCard(this.state.initialCard.id);
    this.props.history.replace('/card-library');
  }

  render() {
    return (
      <StyledCardEditor>
        <CardEditorSection>
          <CardEditorOptionsContainer>
            <DefaultButton
              text="Save card"
              primary
              onClick={() => console.log('saved')}
              split
              menuProps={{
                items: [
                  {
                    key: 'delete',
                    name: 'Delete card',
                    icon: 'Trash',
                    disabled: this.state.initialCard.id === '',
                    onClick: () => this.deleteCard(),
                  },
                ],
              }}
            />
            <CardTitle>
              {this.state.initialCard.name || 'Untitled Card'}
            </CardTitle>
          </CardEditorOptionsContainer>

          <IdNameContainer>
            <TextField
              label="Id"
              readOnly
              disabled
              value={this.state.store.currentCard.id}
            />

            <TextField
              label="Name"
              value={this.state.store.currentCard.name}
              onChanged={(value: string) => {
                this.updateCurrentCard({ name: value });
              }}
            />
          </IdNameContainer>

          <Dropdown
            label="Category"
            selectedKey={Object.keys(CardCategory).find(
              _ => this.state.store.currentCard.category === CardCategory[_]
            )}
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
            selectedKeys={this.state.store.currentCard.subcategories.map(
              subcategory => {
                return (
                  Object.keys(CardSubcategory).find(
                    _ => CardSubcategory[_] === subcategory
                  ) || ''
                );
              }
            )}
            options={Object.keys(CardSubcategory)
              .map(key => {
                return {
                  key,
                  text: CardSubcategory[key],
                };
              })
              .sort()}
            onChanged={({ key, selected }: IDropdownOption) => {
              if (selected) {
                this.updateCurrentCard({
                  subcategories: this.state.store.currentCard.subcategoriesList
                    .push(CardSubcategory[key])
                    .sort()
                    .toArray(),
                });
              } else {
                this.updateCurrentCard({
                  subcategories: this.state.store.currentCard.subcategoriesList
                    .filter(_ => _ !== CardSubcategory[key])
                    .sort()
                    .toArray(),
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

          <Label>Description</Label>
          <DescriptionContainer>
            <Checkbox
              label="Auto generate description"
              checked={this.state.store.autoGenerateDescription}
              onChange={() => {
                this.state.store.toggleAutoGenerateDescription();
              }}
            />
            <TextField
              disabled={this.state.store.autoGenerateDescription}
              value={this.state.store.currentCard.description}
              onChanged={(value: string) => {
                this.updateCurrentCard({ description: value });
              }}
            />
          </DescriptionContainer>

          <CardCostContainer>
            <Dropdown
              label="Card Cost Kind"
              selectedKey={Object.keys(CardCostKind).find(
                _ => this.state.store.currentCard.cost.kind === CardCostKind[_]
              )}
              options={Object.keys(CardCostKind).map(key => {
                return { key, text: CardCostKind[key] };
              })}
              onChanged={({ key }: IDropdownOption) => {
                this.updateCurrentCard({
                  cost: {
                    kind: CardCostKind[key],
                    value: this.state.store.currentCard.cost.value,
                  },
                });
              }}
            />
            <ControlContainer>
              <Label>Card Cost Value</Label>
              <Slider
                value={this.state.store.currentCard.cost.value}
                min={0}
                max={10}
                step={1}
                onChange={value => {
                  this.updateCurrentCard({
                    cost: {
                      kind: this.state.store.currentCard.cost
                        .kind as CardCostKind,
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
              items={this.state.store.currentCard.effectsList
                .map((_: CardEffect) => {
                  return {
                    ..._,
                    gainedCardName:
                      _.kind === CardEffectKind.Basic && _.gainedCard
                        ? _.gainedCard.name
                        : '',
                  };
                })
                .toArray()}
              onAdd={this.openAddCardEffectEditor}
              onUpdate={this.openUpdateCardEffectEditor}
              onRemove={this.removeCardEffect}
              onMove={this.changeCardEffectOrder}
            />
          </ControlContainer>
        </CardEditorSection>

        <CardEditorSection>
          <Title>Card Preview</Title>
          <CardPreviewContainer>
            <CardView model={this.state.store.currentCard} />
          </CardPreviewContainer>
          <Title>Card JSON</Title>
          <TextFieldContainer>
            <TextField
              multiline
              autoAdjustHeight
              readOnly
              value={this.state.store.currentCard.cardJson}
            />
          </TextFieldContainer>
        </CardEditorSection>

        <Modal
          isOpen={this.state.cardEffectEditor.isOpen}
          onDismiss={() =>
            this.setState({
              cardEffectEditor: { isOpen: false, effect: undefined, index: -1 },
            })
          }
        >
          {this.state.cardEffectEditor.isOpen && (
            <CardEffectEditor
              cardEffect={this.state.cardEffectEditor.effect}
              cardEffectIndex={this.state.cardEffectEditor.index}
              cardLibraryItems={
                (this.props.cardLibrary &&
                  this.props.cardLibrary.cards.map(_ => {
                    return { key: _.id, text: _.name };
                  })) ||
                []
              }
              onCancel={this.closeCardEffectEditor}
              onAdd={this.addCardEffect}
              onUpdate={this.updateCardEffect}
            />
          )}
        </Modal>
      </StyledCardEditor>
    );
  }
}

export default CardEditor;
