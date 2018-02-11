import * as React from 'react';
import styled from 'styled-components';
import { CardEffect } from '../types/cardEffect.types';
import {
  DetailsList,
  IColumn,
  SelectionMode,
  Selection,
} from 'office-ui-fabric-react/lib/DetailsList';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

interface Props {
  items: CardEffect[];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

type SelectedItem = {
  index: number;
};

interface State {
  selection: Selection;
  selectedItem: CardEffect & SelectedItem | undefined;
}

const StyledCardEffectsDetailsList = styled.div`
  display: grid;
  grid-template-rows: 1fr 32px;
  grid-gap: 16px;
`;

const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-gap: 16px;
`;

class CardEffectsDetailsList extends React.Component<Props, State> {
  private columns: IColumn[] = [
    {
      key: 'kind',
      name: 'Kind',
      fieldName: 'kind',
      minWidth: 0,
      maxWidth: 100,
    },
    {
      key: 'category',
      name: 'Category',
      fieldName: 'category',
      minWidth: 150,
      maxWidth: 175,
    },
    {
      key: 'value',
      name: 'Value',
      fieldName: 'value',
      minWidth: 60,
      maxWidth: 60,
    },
    {
      key: 'numCardsToResolve',
      name: '# Cards to Resolve',
      fieldName: 'numCardsToResolve',
      minWidth: 100,
      maxWidth: 100,
    },
    {
      key: 'gainedCardName',
      name: 'Gained Card Name',
      fieldName: 'gainedCardName',
      minWidth: 0,
    },
  ];

  componentWillMount() {
    const selection = new Selection({
      onSelectionChanged: () => {
        if (this.state.selection.getSelectedCount() === 0) {
          this.setState({
            selectedItem: undefined,
          });
        } else {
          this.setState({
            selectedItem: {
              ...(this.state.selection.getSelection()[0] as CardEffect),
              index: this.state.selection.getSelectedIndices()[0],
            },
          });
        }
      },
    });
    this.setState({
      selection,
      selectedItem: undefined,
    });
  }

  editCardEffect(index: number) {
    this.props.onEdit(index);
  }

  removeCardEffect(index: number) {
    this.props.onRemove(index);
  }

  render() {
    return (
      <StyledCardEffectsDetailsList>
        <DetailsList
          columns={this.columns}
          items={this.props.items}
          compact
          selection={this.state.selection}
          selectionMode={SelectionMode.single}
        />
        <ControlsContainer>
          <DefaultButton
            text="Edit"
            disabled={!this.state.selectedItem}
            onClick={() => {
              this.editCardEffect(this.state.selectedItem!.index);
            }}
          />
          <DefaultButton
            text="Remove"
            disabled={!this.state.selectedItem}
            onClick={() => {
              this.removeCardEffect(this.state.selectedItem!.index);
            }}
          />
        </ControlsContainer>
      </StyledCardEffectsDetailsList>
    );
  }
}

export default CardEffectsDetailsList;
