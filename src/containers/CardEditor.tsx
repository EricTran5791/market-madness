import * as React from 'react';
import styled from 'styled-components';

const StyledCardEditor = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 16px;
`;

const Title = styled.div`
  font-family: 'Acme';
  font-size: 24px;
  margin-bottom: 16px;
`;

class CardEditor extends React.Component<object, object> {
  render() {
    return (
      <StyledCardEditor>
        <Title>Card Editor</Title>
      </StyledCardEditor>
    );
  }
}

export default CardEditor;
