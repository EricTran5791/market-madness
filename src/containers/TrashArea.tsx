import * as React from 'react';
import CardPile from '../components/CardPile';
import { inject, observer } from 'mobx-react';
import { StoreType } from '../models/Store';

interface Props {
  store?: StoreType;
}

@inject('store')
@observer
class TrashArea extends React.Component<Props, object> {
  render() {
    return <CardPile cardStack={this.props.store!.trash.cardStack} />;
  }
}

export default TrashArea;
