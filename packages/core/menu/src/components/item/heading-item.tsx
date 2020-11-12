/** @jsxImportSource @emotion/react */
import { CSSObject } from '@emotion/react';
import React from 'react';
import { HeadingItemProps } from '../types';
import { itemHeadingCSS } from './styles';

const HeadingItem = ({
  children,
  testId,
  id,
  cssFn = (css: CSSObject) => css,
  ...rest
}: HeadingItemProps) => {
  return (
    <div
      css={cssFn(itemHeadingCSS, undefined)}
      data-testid={testId}
      data-ds--menu--heading-item
      id={id}
      {...rest}
    >
      {children}
    </div>
  );
};

export default HeadingItem;
