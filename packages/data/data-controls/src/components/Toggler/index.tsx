import Drawer from '@uidu/drawer';
import React, { Component } from 'react';
import { Settings } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import TogglerForm from './form';
import { TogglerProps } from './types';

export default class Toggler extends Component<TogglerProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  render() {
    const { columnDefs } = this.props;
    const hiddenCount = columnDefs.filter(f => f.hide).length;

    return (
      <>
        <Trigger
          activeBg="#d0f0fd"
          active={!!hiddenCount}
          className={`btn${hiddenCount > 0 ? ' mr-2' : ''}`}
          onClick={() => this.setState({ dialogOpen: true })}
        >
          <Settings
            strokeWidth={2}
            size={14}
            className={hiddenCount > 0 ? 'mr-xl-2' : ''}
          />
          <span
            style={{ textTransform: 'initial' }}
            className="d-none d-xl-block"
          >
            {hiddenCount > 0 && (
              <FormattedMessage
                id="guidu.data_controls.sorter.label"
                defaultMessage={`{hiddenCount, plural,
                  one {1 field hidden}
                  other {# fields hidden}
                }`}
                values={{ hiddenCount }}
              />
            )}
          </span>
        </Trigger>
        <Drawer
          isOpen={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          origin="right"
          size="medium"
        >
          <DrawerLayout
            name={
              <FormattedMessage
                id="guidu.data_controls.toggler.label"
                defaultMessage="Organize columns"
              />
            }
          >
            <TogglerForm {...this.props} />
          </DrawerLayout>
        </Drawer>
      </>
    );
  }
}
