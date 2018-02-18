import * as React from 'react';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Route } from 'react-router';

type NavItemProps = {
  text: string;
  link: string;
};

interface Props {
  title: string;
  backNavItem?: NavItemProps;
}

const StyledAppBar = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 32px;
  background-color: white;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 5px 0 rgba(0, 0, 0, 0.09),
    0 3px 1px -2px rgba(0, 0, 0, 0.16);
`;

const BackNavItemContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 96px;
  padding-right: 16px;
`;

const Title = styled.div`
  font-family: 'Acme';
  font-size: 24px;
`;

function AppBar({ title, backNavItem }: Props) {
  return (
    <StyledAppBar>
      <BackNavItemContainer>
        {backNavItem && (
          <Route
            render={({ history }) => (
              <DefaultButton
                text={backNavItem.text}
                onClick={() => {
                  history.replace(backNavItem.link);
                }}
              />
            )}
          />
        )}
      </BackNavItemContainer>
      <Title>{title}</Title>
    </StyledAppBar>
  );
}

export default AppBar;
