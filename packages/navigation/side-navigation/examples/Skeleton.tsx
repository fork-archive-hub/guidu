import { ShellSidebar } from '@uidu/shell';
import React, { Component } from 'react';
import Navigation, { GlobalNavigationSkeleton } from '../src';

const schema = [
  { type: 'NavigationHeaderSkeleton', text: 'Skeleton' },
  {
    type: 'NavigationSection',
    items: [
      {
        type: 'NavigationGroup',
        items: Array.from(Array(4).keys()).map(() => ({
          type: 'NavigationItemSkeleton',
        })),
      },
      {
        type: 'NavigationGroup',
        items: Array.from(Array(4).keys()).map(() => ({
          hasBefore: true,
          type: 'NavigationItemSkeleton',
        })),
      },
      {
        type: 'NavigationGroup',
        items: Array.from(Array(4).keys()).map(() => ({
          hasAfter: true,
          type: 'NavigationItemSkeleton',
        })),
      },
    ],
  },
];

export default class Basic extends Component<any> {
  render() {
    return (
      <>
        <GlobalNavigationSkeleton navigationWidth={25} />
        <ShellSidebar
          style={{ display: 'flex', flex: '0 1 25%' }}
          className="border-right"
        >
          <Navigation schema={schema} />
        </ShellSidebar>
      </>
    );
  }
}
