import * as React from 'react';
import styled from 'styled-components';
import {
  CardEffect,
  initialBasicCardEffect,
  CardEffectKind,
  CardEffectCategory,
  InteractiveCardEffectCategory,
} from '../types/cardEffect.types';
import { Title } from './CardEditor';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

interface Props {
  cardEffect: CardEffect | undefined;
}

interface State {
  cardEffect: CardEffect;
}

const StyledCardEffectEditor = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  min-height: 30vh;
  width: 50vw;
  padding: 32px;
`;

class CardEffectEditor extends React.Component<Props, State> {
  componentWillMount() {
    this.setState({
      cardEffect: this.props.cardEffect || initialBasicCardEffect,
    });
  }

  render() {
    return (
      <StyledCardEffectEditor>
        <Title>
          {this.props.cardEffect ? 'Edit Card Effect' : 'New Card Effect'}
        </Title>
        <Dropdown
          label="Kind"
          selectedKey={Object.keys(CardEffectKind).find(
            _ => _ === this.state.cardEffect.kind
          )}
          options={Object.keys(CardEffectKind).map(key => {
            return { key, text: CardEffectKind[key] };
          })}
          onChanged={({ key }: IDropdownOption) => {
            this.setState({
              cardEffect: {
                ...this.state.cardEffect,
                kind: CardEffectKind[key],
              },
            });
          }}
        />
        <Dropdown
          label="Category"
          selectedKey={Object.keys(CardEffectCategory)
            .concat(Object.keys(InteractiveCardEffectCategory))
            .find(
              _ =>
                CardEffectCategory[_] === this.state.cardEffect.category ||
                InteractiveCardEffectCategory[_] ===
                  this.state.cardEffect.category
            )}
          options={
            this.state.cardEffect.kind === CardEffectKind.Basic
              ? Object.keys(CardEffectCategory).map(key => {
                  return { key, text: CardEffectCategory[key] };
                })
              : Object.keys(InteractiveCardEffectCategory).map(key => {
                  return { key, text: InteractiveCardEffectCategory[key] };
                })
          }
          onChanged={({ key }: IDropdownOption) => {
            this.setState({
              cardEffect: {
                ...this.state.cardEffect,
                category:
                  this.state.cardEffect.kind === CardEffectKind.Basic
                    ? CardEffectCategory[key]
                    : InteractiveCardEffectCategory[key],
              },
            });
          }}
        />
      </StyledCardEffectEditor>
    );
  }
}

export default CardEffectEditor;
