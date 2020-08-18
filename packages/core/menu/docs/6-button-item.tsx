import { code, Example, md, Props } from '@uidu/docs';
import SectionMessage from '@uidu/section-message';
import React from 'react';

export default md`
  ${(
    <SectionMessage title="Important usage instructions">
      The <a href="section">section component</a> is required to be used to
      ensure spacing around blocks of items exists! Make sure to use it.
    </SectionMessage>
  )}

  Will render an item wrapped in a button tag \`<button>\` -
  useful when you have an action that does something _other than_ changing routes.

  ${code`highlight=1,5
import { ButtonItem } from '@uidu/menu';

<MenuGroup>
<Section title="Actions">
  <ButtonItem>Create article</ButtonItem>
</Section>
</MenuGroup>
  `}

  ${(
    <Example
      title="Button item"
      Component={require('../examples/button-item.tsx').default}
      source={require('!!raw-loader!../examples/button-item.tsx')}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/components/item/button-item.tsx')}
    />
  )}
`;
