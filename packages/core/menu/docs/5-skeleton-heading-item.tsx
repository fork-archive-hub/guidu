import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Renders a skeleton element that has the same sizing as \`HeadingItem\`.
  Useful when you're asyncronously loading data for a menu,
  it has not yet loaded,
  and you are quite certain you know what the data will look like after it has loaded.

  ${code`highlight=1,5
import { SkeletonHeadingItem } from '@uidu/menu';

<MenuGroup>
  <Section>
    <SkeletonHeadingItem />
    <SkeletonItem />
  </Section>
</MenuGroup>
  `}

  ${(
    <Example
      title="Skeleton heading item"
      Component={require('../examples/skeleton-heading-item.tsx').default}
      source={require('!!raw-loader!../examples/skeleton-heading-item.tsx')}
    />
  )}

  ### Props

  ${(
    <Props
      heading=""
      props={require('!!extract-react-types-loader!../src/components/item/skeleton-heading-item.tsx')}
    />
  )}
`;
