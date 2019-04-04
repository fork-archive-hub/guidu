// @flow

import React, { Component } from 'react';
import Tooltip from '@uidu/tooltip';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';

import { Smile } from 'react-feather';

export default class Reactions extends Component<*> {
  static defaultProps = {
    options: ['👍', '👎', '😀', '❤️', '🎉'],
    reaction: undefined,
    onClick: () => {},
  };

  handleClick = (e: Event, option) => {
    e.preventDefault();
    const { onClick } = this.props;
    onClick(option);
  };

  render() {
    const { options, onClick, reaction, onOpenChange } = this.props;
    return (
      <DropdownMenu
        trigger={
          <Tooltip
            tag="button"
            className="btn btn-sm bg-white border py-1 px-3 d-flex align-items-center"
            placement="top"
            content="Add a reaction"
            delay={0}
          >
            <Smile size={16} />
          </Tooltip>
        }
        triggerType="default"
        position="left middle"
        boundariesElement="window"
        onOpenChange={onOpenChange}
      >
        <DropdownItemGroup>
          {options.map(option => (
            <DropdownItem
              key={option}
              isSelected={reaction && reaction.id === option}
              onClick={e => this.handleClick(e, option)}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
