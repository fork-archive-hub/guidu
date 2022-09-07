import React, { memo } from 'react';
import ItemsRenderer from '../ItemsRenderer';
import { NavigationProps } from './types';

function SideNavigation({
  position = 'absolute',
  schema,
  children,
}: NavigationProps) {
  if (!schema && !children) {
    throw new Error('Navigation needs either a schema or children to render');
  }

  if (schema) {
    return (
      <div tw="overflow-hidden flex flex-col w-full h-full absolute">
        <ItemsRenderer items={schema} />
      </div>
    );
  }

  return children;
}

export default memo(SideNavigation);
