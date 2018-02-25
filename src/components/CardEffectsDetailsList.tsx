import * as React from 'react';
import styled from 'styled-components';
import { CardEffect } from '../types/cardEffect.types';
import {
  DetailsList,
  IColumn,
  SelectionMode,
  Selection,
} from 'office-ui-fabric-react/lib/DetailsList';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';

export type MoveEffectDirection = 'Up' | 'Down';

interface Props {
  items: CardEffect[];
  onAdd: () => void;
  onUpdate: (index: number) => void;
  onRemove: (index: number) => void;
  onMove: (index: number, direction: MoveEffectDirection) => void;
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
  grid-template-columns: 1fr 1fr 1fr 32px 32px;
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
      key: 'resolveType',
      name: 'Resolve Type',
      fieldName: 'resolveType',
      minWidth: 80,
      maxWidth: 125,
    },
    {
      key: 'value',
      name: 'Value',
      fieldName: 'value',
      minWidth: 60,
      maxWidth: 60,
    },
    {
      key: 'numPlaysToResolve',
      name: '# Plays to Resolve',
      fieldName: 'numPlaysToResolve',
      minWidth: 100,
      maxWidth: 100,
    },
    {
      key: 'gainedCardName',
      name: 'Gained Card',
      fieldName: 'gainedCardName',
      minWidth: 0,
    },
  ];

  constructor(props: Props) {
    super(props);

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
    this.state = {
      selection,
      selectedItem: undefined,
    };
  }

  addCardEffect() {
    this.props.onAdd();
  }

  updateCardEffect(index: number) {
    this.props.onUpdate(index);
  }

  removeCardEffect(index: number) {
    this.props.onRemove(index);
  }

  moveCardEffect(index: number, direction: MoveEffectDirection) {
    this.props.onMove(index, direction);
    // The card effect gets deselected after being moved, here we reselect it once the items are refreshed.
    const newIndex = index + (direction === 'Up' ? -1 : 1);
    window.requestAnimationFrame(() => {
      this.state.selection.setIndexSelected(newIndex, true, false);
    });
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
            text="Add"
            primary
            iconProps={{ iconName: 'Add' }}
            onClick={() => {
              this.addCardEffect();
            }}
          />
          <DefaultButton
            text="Update"
            disabled={!this.state.selectedItem}
            onClick={() => {
              this.updateCardEffect(this.state.selectedItem!.index);
            }}
          />
          <DefaultButton
            text="Remove"
            disabled={!this.state.selectedItem}
            onClick={() => {
              this.removeCardEffect(this.state.selectedItem!.index);
            }}
          />

          <IconButton
            disabled={
              !this.state.selectedItem ||
              (this.state.selectedItem && this.state.selectedItem.index === 0)
            }
            iconProps={{ iconName: 'CaretSolidUp' }}
            primary
            title="Move order up"
            onClick={() => {
              this.moveCardEffect(this.state.selectedItem!.index, 'Up');
            }}
          />
          <IconButton
            disabled={
              !this.state.selectedItem ||
              (this.state.selectedItem &&
                this.state.selectedItem.index === this.props.items.length - 1)
            }
            iconProps={{ iconName: 'CaretSolidDown' }}
            primary
            title="Move order down"
            onClick={() => {
              this.moveCardEffect(this.state.selectedItem!.index, 'Down');
            }}
          />
        </ControlsContainer>
      </StyledCardEffectsDetailsList>
    );
  }
}

export default CardEffectsDetailsList;
