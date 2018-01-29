import * as React from 'react';
import CardGrid from '../components/CardGrid';
import CardView from '../components/CardView';
import { CardStackModelType, CardModelType } from '../models/Card';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { StoreType } from '../models/Store';

interface Props {
  store?: StoreType;
}

interface State {
  cardStack: CardStackModelType;
}

const StyledBankArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.33);
`;

const Title = styled.div`
  font-family: 'Acme';
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
`;

@inject('store')
@observer
class BankArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cardStack: this.props.store!.bank.cardStack,
    };
  }
  displayCards() {
    return this.state.cardStack.cards.map((card, i) => {
      return (
        <CardView key={i} model={card} onClick={() => this.onClick(card)} />
      );
    });
  }
  onClick(card: CardModelType) {
    this.props.store!.bank.buyBankCard(card);
  }
  render() {
    return (
      <StyledBankArea>
        <Title>The Bank</Title>
        <CardGrid columns={3}>{this.displayCards()}</CardGrid>
      </StyledBankArea>
    );
  }
}

export default BankArea;