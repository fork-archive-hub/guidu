import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Useful when composing your menu with a popup.
  This component constrains its width to appropriate values for a popup.

  ${code`highlight=1,3,7
import { PopupMenuGroup } from '@uidu/menu';

<PopupMenuGroup>
  <Section title="Actions">
    <ButtonItem>Create article</ButtonItem>
  </Section>
</PopupMenuGroup>
  `}

  ${(
    <Example
      title="Variable width menu"
      Component={require('../examples/growing-menu.tsx').default}
      source={require('!!raw-loader!../examples/growing-menu.tsx')}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/components/section/menu-group.tsx')}
    />
  )}
`;
