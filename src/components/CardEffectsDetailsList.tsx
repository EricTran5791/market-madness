import * as React from 'react';
import { CardEffect } from '../types/cardEffect.types';
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

interface Props {
  items: CardEffect[];
}

class CardEffectsDetailsList extends React.Component<Props, object> {
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

  render() {
    return (
      <DetailsList columns={this.columns} items={this.props.items} compact />
    );
  }
}

export default CardEffectsDetailsList;
