import * as React from 'react';
import { withProps } from '../withProps';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface Props {
  columns: number;
  children?: ReactNode;
}

interface StyledCardAreaProps {
  columns: number;
}

const StyledCardGrid = withProps<StyledCardAreaProps>()(styled.div)`
  display: grid;
  grid-template-columns: repeat(${({ columns }: StyledCardAreaProps) =>
    columns}, 1fr);
  grid-gap: 8px;
  margin-bottom: 16px;
`;

class CardGrid extends React.Component<Props, object> {
  render() {
    return (
      <StyledCardGrid columns={this.props.columns}>
        {this.props.children}
      </StyledCardGrid>
    );
  }
}

export default CardGrid;
