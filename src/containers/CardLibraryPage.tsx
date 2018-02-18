import * as React from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { CardLibraryModelType } from '../models/CardLibrary';
import CardView from '../components/CardView';
import { Route } from 'react-router';
import Modal from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField, ITextField } from 'office-ui-fabric-react/lib/TextField';

interface Props {
  cardLibrary?: CardLibraryModelType;
}

interface State {
  isJsonPreviewOpen: boolean;
}

const StyledCardLibrary = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 200px);
  grid-gap: 32px;
  margin-bottom: 32px;
  align-self: center;

  button {
    height: 72px;
  }
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

const JsonPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  max-width: 90vw;
  padding: 24px;
  box-sizing: border-box;
`;

const TextFieldContainer = styled.div`
  margin-bottom: 16px;
  textarea {
    max-height: 80vh;
  }
`;

const JsonPreviewFooterControls = styled.div`
  display: grid;
`;

@inject('cardLibrary')
@observer
class CardLibraryView extends React.Component<Props, State> {
  private jsonPreviewTextArea: ITextField;

  constructor(props: Props) {
    super(props);

    this.state = {
      isJsonPreviewOpen: false,
    };
  }

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

  setJsonPreviewTextAreaRef(component: ITextField) {
    this.jsonPreviewTextArea = component;
  }

  render() {
    return (
      <StyledCardLibrary>
        <OptionsContainer>
          <DefaultButton
            text="View card library JSON"
            onClick={() => this.setState({ isJsonPreviewOpen: true })}
          />
          <Route
            render={({ history }) => (
              <DefaultButton
                text="Create a new card"
                primary
                iconProps={{ iconName: 'Add' }}
                onClick={() => {
                  history.replace('/card-editor/new');
                }}
              />
            )}
          />
        </OptionsContainer>

        <Title>All Cards</Title>
        <CardContainer>{this.displayCards()}</CardContainer>

        <Modal
          isOpen={this.state.isJsonPreviewOpen}
          onDismiss={() =>
            this.setState({
              isJsonPreviewOpen: false,
            })
          }
        >
          <JsonPreviewContainer>
            <Title>Card Library JSON</Title>
            <TextFieldContainer>
              <TextField
                multiline
                autoAdjustHeight
                readOnly
                componentRef={component => {
                  this.setJsonPreviewTextAreaRef(component);
                }}
                value={
                  this.props.cardLibrary &&
                  this.props.cardLibrary.cardLibraryJson
                }
              />
            </TextFieldContainer>
            <JsonPreviewFooterControls>
              <DefaultButton
                text="Copy to Clipboard"
                primary
                onClick={() => {
                  this.jsonPreviewTextArea.select();
                  document.execCommand('copy');
                }}
              />
            </JsonPreviewFooterControls>
          </JsonPreviewContainer>
        </Modal>
      </StyledCardLibrary>
    );
  }
}

export default CardLibraryView;
