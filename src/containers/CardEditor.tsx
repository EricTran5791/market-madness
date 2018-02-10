import * as React from 'react';
import styled from 'styled-components';
import {
  CardModelSnapshotType,
  CardCategory,
  CardSubcategory,
  initialCardModelSnapshot,
  CardCostKind,
} from '../models/Card';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';

import { initializeIcons } from '@uifabric/icons';

initializeIcons();

interface State {
  currentCard: CardModelSnapshotType;
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

const Title = styled.div`
  font-family: 'Acme';
  font-size: 24px;
  margin-bottom: 16px;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.label`
  padding: 5px 0;
`;

const CardCostContainer = styled.div`
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
        ...initialCardModelSnapshot,
      },
    });
  }
  updateCurrentCard(card: CardModelSnapshotType) {
    this.setState({
      currentCard: {
        ...this.state.currentCard,
        ...card,
      },
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
              return { key: CardCategory[key], text: CardCategory[key] };
            })}
            onChanged={({ text }: IDropdownOption) => {
              this.updateCurrentCard({ category: text });
            }}
          />

          <Dropdown
            label="Subcategories"
            multiSelect
            options={Object.keys(CardSubcategory)
              .map(key => {
                return {
                  key: CardSubcategory[key],
                  text: CardSubcategory[key],
                };
              })
              .sort()}
            onChanged={(option: IDropdownOption) => {
              const subcategories: CardSubcategory[] = this.state.currentCard
                .subcategories;
              if (option.selected) {
                this.updateCurrentCard({
                  subcategories: [
                    ...subcategories,
                    option.text as CardSubcategory,
                  ].sort(),
                });
              } else {
                this.updateCurrentCard({
                  subcategories: subcategories
                    .filter(_ => _ !== option.text)
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
                return { key: CardCostKind[key], text: CardCostKind[key] };
              })}
              onChanged={({ text }: IDropdownOption) => {
                this.updateCurrentCard({
                  cost: { ...this.state.currentCard.cost, kind: text },
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
      </StyledCardEditor>
    );
  }
}

export default CardEditor;
