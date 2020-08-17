import { Example, md } from '@uidu/docs';
import React from 'react';

export default md`
  Available colors in the Atlassian design foundation.
  Refer to the [design documentation](https://atlassian.design/guidelines/product/foundations/color) for more information.

  ${(
    <Example
      packageName="@uidu/theme"
      Component={require('../examples/colors').default}
      source={require('!!raw-loader!../examples/colors').default}
      title="Colors"
    />
  )}

  There are also color palletes available with pre-chosen colors for you to use,
  coming in 8,
  16,
  and 24 color variations.
  Refer to the [design documentation](https://atlassian.design/guidelines/product/patterns/color-palette) for more information.

  ${(
    <Example
      highlight="3,9,19,29,11-12,21-22,31-32"
      packageName="@uidu/theme"
      Component={require('../examples/color-palettes').default}
      source={require('!!raw-loader!../examples/color-palettes').default}
      title="Color palettes"
    />
  )}
`;
