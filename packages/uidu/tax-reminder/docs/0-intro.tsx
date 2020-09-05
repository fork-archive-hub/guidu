import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import TaxReminder from '@uidu/tax-reminded';`}

  ${(
    <Example
      packageName="@uidu/tax-reminder"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/components/TaxReminder')}
    />
  )}
  `;
