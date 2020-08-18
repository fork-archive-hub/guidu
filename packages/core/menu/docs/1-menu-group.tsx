import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  This is one of the two available group components that you will want to use.
  If you will be composing your menu as a popup you'll want to use [Popup menu group](popup-menu-group) which constrains its width to appropriate values.

  ${code`highlight=1,3,7
import { MenuGroup } from '@uidu/menu';

<MenuGroup>
  <Section title="Actions">
    <ButtonItem>Create article</ButtonItem>
  </Section>
</MenuGroup>
  `}

  ${(
    <Example
      title="Menu with max height"
      Component={require('../examples/scrollable-menu.tsx').default}
      source={require('!!raw-loader!../examples/scrollable-menu.tsx')}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/components/section/menu-group.tsx')}
    />
  )}
`;
