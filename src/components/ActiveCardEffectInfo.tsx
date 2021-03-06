import * as React from 'react';
import styled from 'styled-components';
import { StoreType } from '../models/Store';
import { observer, inject } from 'mobx-react';
import { InteractiveCardEffectResolveKind } from '../types/cardEffect.types';

interface Props {
  store?: StoreType;
}

const StyledActiveCardEffectInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-family: 'Acme';
  font-size: 24px;
  text-align: center;
`;

const Button = styled.button`
  cursor: pointer;
  width: 128px;
  height: 32px;
  font-family: 'Acme';
  font-size: 18px;
  margin: 8px;
`;

@inject('store')
@observer
export class ActiveCardEffectInfo extends React.Component<Props, object> {
  render() {
    return (
      <StyledActiveCardEffectInfo>
        {this.props.store!.gameState.isCardEffectActive && (
          <>
            <Title>
              {
                this.props.store!.gameState.activeCardEffect
                  .activeEffectCategory
              }
            </Title>
            {this.props.store!.gameState.activeCardEffect.resolveType ===
              InteractiveCardEffectResolveKind.Optional && (
              <Button
                onClick={() =>
                  this.props
                    .store!.gameState.activeCardEffect.completeActiveEffect()
                }
              >
                Done
              </Button>
            )}
          </>
        )}
      </StyledActiveCardEffectInfo>
    );
  }
}

export default ActiveCardEffectInfo;
