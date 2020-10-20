import loadable from '@loadable/component';
import { Configurator, Filterer, Grouper, Sorter } from '@uidu/data-controls';
import React from 'react';
import { AlignJustify, EyeOff } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const ConfiguratorForm = loadable(() => import('./configurator'));

const Table: DataViewKind = {
  id: 'table',
  name: <FormattedMessage id="dataView.table.name" defaultMessage="Table" />,
  icon: AlignJustify,
  color: '#BF616A',
  description: (
    <FormattedMessage
      id="dataView.table.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  controls: ({
    tableInstance,
    tableInstance: { state },
    tableInstance: {
      state: { hiddenColumns },
    },
    columnDefs,
    currentView,
    updateView,
    availableControls,
  }) => {
    const hiddenCount = hiddenColumns.length;

    return (
      <>
        <Configurator
          active={hiddenCount > 0}
          icon={EyeOff}
          name={
            <FormattedMessage
              id="guidu.data_controls.configurator.label"
              defaultMessage={`{hiddenCount, plural,
                  =0 {Hide fields}
                  one {1 hidden field}
                  other {{hiddenCount, number} hidden fields}
                }`}
              values={{ hiddenCount }}
            />
          }
          tableInstance={tableInstance}
          configurator={ConfiguratorForm}
          // isConfiguratorOpen={isConfiguratorOpen}
          currentView={currentView}
          columnDefs={columnDefs}
          state={state}
          // groupers={groupers}
          // onDragEnd={onDragEnd}
          // onResize={onResize}
          // rowHeight={rowHeight}
          // columnCount={columnCount}
          // onSetColumnCount={onSetColumnCount}
          updateView={updateView}
          // startDateField={startDateField}
          // endDateField={endDateField}
          // primaryField={primaryField}
        />
        <Filterer
          tableInstance={tableInstance}
          columnDefs={columnDefs}
          updateView={updateView}
          {...availableControls.filterer.props}
        />
        <Sorter
          tableInstance={tableInstance}
          updateView={updateView}
          {...availableControls.sorter.props}
        />
        <Grouper
          tableInstance={tableInstance}
          updateView={updateView}
          {...availableControls.grouper.props}
        />
      </>
    );
  },
};

export default Table;
