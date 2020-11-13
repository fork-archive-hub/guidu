import React, { PureComponent } from 'react';
import ContentLoader from 'react-content-loader';
import { StyledNavigationItem } from '../../../styled';
import { StyledNavigationLink } from '../NavigationItem';

const NavigationItemLoader = ({ hasBefore }) => (
  <ContentLoader
    style={{
      width: 'auto',
      height: 20,
      // marginRight: '3rem',
    }}
    height={20}
    width={244}
    speed={2}
    backgroundColor="rgb(76, 86, 106)"
    backgroundOpacity={0.085}
    foregroundColor="rgb(76, 86, 106)"
    foregroundOpacity={0.385}
  >
    {hasBefore && <circle cx="9" cy="9" r="9" />}
    <rect
      x={hasBefore ? 30 : 0}
      y="0"
      rx="3"
      ry="3"
      width={`${(Math.random() * (0.85 - 0.45) + 0.3) * 100}%`}
      height="20"
    />
  </ContentLoader>
);

export default class NavigationItem extends PureComponent<any> {
  static defaultProps = {
    hasBefore: false,
  };

  render() {
    const { hasBefore, ...otherProps } = this.props;

    return (
      <StyledNavigationItem {...otherProps}>
        <StyledNavigationLink className="d-block" actionsCount={0}>
          <NavigationItemLoader hasBefore={hasBefore} />
        </StyledNavigationLink>
      </StyledNavigationItem>
    );
  }
}
