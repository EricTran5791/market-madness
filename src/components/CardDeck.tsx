import * as React from 'react';
import styled from 'styled-components';
import { BasicCard } from './CardView';

interface Props {
  count: number;
}

const StyledDeck = BasicCard.extend`
  background-color: #222222;
  background: linear-gradient(#363636, black);
  margin-bottom: 8px;
`;

const Count = styled.div`
  font-size: 18px;
`;

export class CardDeck extends React.Component<Props, object> {
  render() {
    return (
      <>
        <StyledDeck />
        <Count>{this.props.count}</Count>
      </>
    );
  }
}

export default CardDeck;
