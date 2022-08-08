import loadable from '@loadable/component';
import { ButtonGroup } from '@uidu/button';
import { Configurator, Filterer, Grouper, Sorter } from '@uidu/data-controls';
import { useDataManagerContext } from '@uidu/data-manager';
import React from 'react';
import { EyeOff } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const ConfiguratorForm = loadable(() => import('./configurator'));

export default function Controls({ availableControls }) {
  const {
    tableInstance: { getState },
  } = useDataManagerContext();
  const { columnVisibility } = getState();

  const hiddenCount =
    Object.entries(columnVisibility).filter((item) => !item[1]).length || 0;

  return (
    <ButtonGroup>
      <Configurator
        active={hiddenCount > 0}
        icon={EyeOff}
        name={
          <FormattedMessage
            defaultMessage={`{hiddenCount, plural,
                  =0 {Hide fields}
                  one {1 hidden field}
                  other {{hiddenCount, number} hidden fields}
                }`}
            values={{ hiddenCount }}
            id="uidu.data-views.table.controls.hide_fields"
          />
        }
        configurator={ConfiguratorForm}
      />
      {availableControls.filterer.visible && (
        <Filterer {...availableControls.filterer.props} />
      )}
      {availableControls.sorter.visible && (
        <Sorter {...availableControls.sorter.props} />
      )}
      {availableControls.grouper.visible && (
        <Grouper {...availableControls.grouper.props} />
      )}
    </ButtonGroup>
  );
}
