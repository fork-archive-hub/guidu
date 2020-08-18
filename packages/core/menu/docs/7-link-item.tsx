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

  Will render an item wrapped in an anchor tag \`<a>\` -
  useful when wanting to transition to another page.
  If needing to use a specific routers component for route transitions you'll want to compose them together using \`CustomItem\`.

  ${code`highlight=1,5
import { LinkItem } from '@uidu/menu';

<MenuGroup>
<Section title="Actions">
  <LinkItem href="/articles">View articles</LinkItem>
</Section>
</MenuGroup>
  `}

  ${(
    <Example
      title="Link item"
      Component={require('../examples/link-item.tsx').default}
      source={require('!!raw-loader!../examples/link-item.tsx')}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/components/item/link-item.tsx')}
    />
  )}
`;
