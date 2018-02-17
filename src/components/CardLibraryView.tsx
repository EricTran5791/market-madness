import * as React from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { CardLibraryModelType } from '../models/CardLibrary';
import CardView from '../components/CardView';
import { Route } from 'react-router';

interface Props {
  cardLibrary?: CardLibraryModelType;
}

const StyledCardLibrary = styled.div`
  display: flex;
  flex-direction: column;
  padding: 64px;
`;

const Title = styled.div`
  font-family: 'Acme';
  font-size: 24px;
  margin-bottom: 16px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, fit-content(100%));
  grid-gap: 16px;
`;

@inject('cardLibrary')
@observer
class CardLibraryView extends React.Component<Props, object> {
  displayCards() {
    return (
      this.props.cardLibrary &&
      this.props.cardLibrary.cards.map(card => {
        return (
          <Route
            key={card.uniqid}
            render={({ history }) => (
              <CardView
                model={card}
                onClick={() => {
                  history.push(`/card-editor/${card.id}`);
                }}
              />
            )}
          />
        );
      })
    );
  }

  render() {
    return (
      <StyledCardLibrary>
        <Title>Card Library</Title>
        <CardContainer>{this.displayCards()}</CardContainer>
      </StyledCardLibrary>
    );
  }
}

export default CardLibraryView;
