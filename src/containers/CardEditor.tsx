import * as React from 'react';
import styled from 'styled-components';
import {
  CardModelSnapshotType,
  CardCategory,
  CardSubcategory,
  initialCardModelSnapshot,
} from '../models/Card';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
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
            defaultSelectedKey={this.state.currentCard.category}
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
