import { ActivityItem } from '@atlaskit/activity';
import { colors } from '@uidu/theme';
import * as React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  selected: boolean;
}

const Container = styled.li`
  background-color: ${(props: ContainerProps) =>
    props.selected ? colors.N20 : 'transparent'};
  padding: 5px 8px;
  cursor: pointer;
  display: flex;
`;

const NameWrapper = styled.span`
  overflow: hidden;
`;

export const Name = styled.div`
  color: ${colors.N800};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContainerName = styled.div`
  color: ${colors.N100};
  font-size: 12px;
`;

const Icon = styled.span`
  min-width: 16px;
  margin-top: 3px;
  margin-right: 8px;
`;

export interface Props {
  item: ActivityItem;
  selected: boolean;
  onSelect: (href: string, text: string) => void;
  onMouseMove: (objectId: string) => void;
}

export default class RecentItem extends React.PureComponent<Props, {}> {
  handleSelect = (e: React.MouseEvent) => {
    e.preventDefault(); // don't let editor lose focus
    const { item, onSelect } = this.props;
    onSelect(item.url, item.name);
  };

  handleMouseMove = () => {
    const { onMouseMove, item } = this.props;
    onMouseMove(item.objectId);
  };

  render() {
    const { item, selected } = this.props;

    return (
      <Container
        selected={selected}
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleSelect}
      >
        <Icon>
          <img src={item.iconUrl} />
        </Icon>
        <NameWrapper>
          <Name>{item.name}</Name>
          <ContainerName>{item.container}</ContainerName>
        </NameWrapper>
      </Container>
    );
  }
}