import * as React from 'react';
import styled from 'styled-components';
import { StoreType } from '../models/Store';
import { observer, inject } from 'mobx-react';
import { TurnButton } from './TurnButton';
import ActiveCardEffectInfo from './ActiveCardEffectInfo';

interface Props {
  store?: StoreType;
}

const StyledTurnControls = styled.div`
  display: grid;
  grid-template-rows: fit-content(100%) 1fr 1fr;
  grid-gap: 16px;
`;

const ResourceCounterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

const ResourceCounter = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResourceNumberContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  width: 100%;
`;

const ResourceNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Acme';
  font-size: 28px;
  line-height: 28px;
  padding: 8px 0 8px 16px;
`;

const ResourceIcon = styled.div`
  display: flex;
  justify-content: center;
  font-size: 28px;
  line-height: 28px;
  padding: 8px 16px 8px 0;
`;

const ResourceActionButton = styled.button`
  cursor: pointer;
  min-height: 48px;
  font-family: 'Acme';
  font-size: 14px;
`;

@inject('store')
@observer
class TurnControls extends React.Component<Props, object> {
  displayResource(type: 'money' | 'attack') {
    return (
      <ResourceCounter>
        <ResourceNumberContainer title={`Available ${type}`}>
          <ResourceNumber>
            {type === 'money'
              ? this.props.store!.currentPlayer.hand.availableMoney
              : this.props.store!.currentPlayer.hand.availableAttack}
          </ResourceNumber>
          <ResourceIcon>{type === 'money' ? '💰' : '👊'}</ResourceIcon>
        </ResourceNumberContainer>
        <ResourceActionButton
          title={
            type === 'money'
              ? 'Play all money cards in your hand'
              : 'Attack your opponent with all of your available attack'
          }
          disabled={
            type === 'money'
              ? this.props.store!.currentPlayer.hand.unplayedMoneyCards
                  .length === 0
              : this.props.store!.currentPlayer.hand.availableAttack === 0
          }
          onClick={
            type === 'money'
              ? () => {
                  this.props.store!.currentPlayer.hand.playAllMoneyCards();
                }
              : () => {
                  this.props.store!.currentPlayer.attackOtherPlayer();
                }
          }
        >
          {type === 'money' ? 'Play all money cards' : 'Attack opponent'}
        </ResourceActionButton>
      </ResourceCounter>
    );
  }

  render() {
    return (
      <StyledTurnControls>
        <TurnButton />
        <ResourceCounterContainer>
          {this.displayResource('money')}
          {this.displayResource('attack')}
        </ResourceCounterContainer>
        <ActiveCardEffectInfo />
      </StyledTurnControls>
    );
  }
}

export default TurnControls;
