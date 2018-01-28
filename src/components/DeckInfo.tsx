import * as React from 'react';
import styled from 'styled-components';

interface Props {
  deckTotal: number;
  discardPileTotal: number;
}

const StyledDeckInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
`;

const DeckTotal = styled.div`
  font-size: 14px;
`;

function DeckInfo({ deckTotal, discardPileTotal }: Props) {
  return (
    <StyledDeckInfo>
      <DeckTotal>Deck: {deckTotal}</DeckTotal>
      <DeckTotal>Discard Pile: {discardPileTotal}</DeckTotal>
    </StyledDeckInfo>
  );
}

export default DeckInfo;
