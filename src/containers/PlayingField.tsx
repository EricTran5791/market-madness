import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import CardView from '../components/CardView';
import ShopArea from './ShopArea';
import CardGrid from '../components/CardGrid';
import { StoreType } from '../models/Store';

interface Props {
  name: string;
  store?: StoreType;
}

const StyledPlayingField = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const AreaTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const DeckArea = styled.div`
  display: flex;
  justify-content: center;
`;

@inject('store')
@observer
class PlayingField extends React.Component<Props, object> {
  displayDeck() {
    return this.props.store!.deck.cards.map((card, i) => {
      return <CardView key={i} model={card} />;
    });
  }
  render() {
    return (
      <StyledPlayingField>
        <AreaTitle>{this.props.name}</AreaTitle>
        <ShopArea />
        <AreaTitle>Deck</AreaTitle>
        <DeckArea>
          <CardGrid columns={5}>{this.displayDeck()}</CardGrid>
        </DeckArea>
      </StyledPlayingField>
    );
  }
}

export default PlayingField;
