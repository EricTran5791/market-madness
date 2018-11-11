import * as React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router';

const StyledOptionsButton = styled.div`
  font-size: 18px;
  cursor: pointer;
`;

function OptionsButton() {
  return (
    <>
      <Route
        render={({ history }) => (
          <StyledOptionsButton
            title="View card library"
            onClick={() => history.replace('/card-library')}
          >
            📚
          </StyledOptionsButton>
        )}
      />
    </>
  );
}

export default OptionsButton;
