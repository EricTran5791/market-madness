import * as React from 'react';
import CardPile from '../components/CardPile';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { StoreType } from '../models/Store';

interface Props {
  store?: StoreType;
}

const StyledTrashArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px;
`;

const Title = styled.div`
  font-family: 'Acme';
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
`;

@inject('store')
@observer
class TrashArea extends React.Component<Props, object> {
  render() {
    return (
      <StyledTrashArea>
        <Title>Trash</Title>
        <CardPile cardStack={this.props.store!.trash.cardStack} />
      </StyledTrashArea>
    );
  }
}

export default TrashArea;
