import * as React from 'react';
import { withProps } from '../types/withProps';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface Props {
  columns: number;
  children?: ReactNode;
}

interface StyledCardGridProps {
  columns: number;
}

const StyledCardGrid = withProps<StyledCardGridProps>()(styled.div)`
  display: grid;
  grid-template-columns: repeat(${({ columns }: StyledCardGridProps) =>
    columns}, 1fr);
  grid-gap: 8px;
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
