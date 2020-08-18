/** @jsx jsx */
import { Fragment, useState } from 'react';

import { jsx } from '@emotion/core';

import Button from '@uidu/button';
import MediaServicesAddCommentIcon from '@atlaskit/icon/glyph/media-services/add-comment';
import Select from '@uidu/select';

import Popup from '../src';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      Popup with select
      <br />
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-start"
        content={() => (
          <div
            css={{
              minWidth: 175,
              minHeight: 250,
            }}
          >
            <Select
              defaultValue={{ label: 'Brisbane', value: 'brisbane' }}
              options={[
                { label: 'Adelaide', value: 'adelaide', extra: 'extra' },
                { label: 'Brisbane', value: 'brisbane' },
                { label: 'Canberra', value: 'canberra' },
                { label: 'Darwin', value: 'darwin' },
                { label: 'Hobart', value: 'hobart' },
                { label: 'Melbourne', value: 'melbourne' },
                { label: 'Perth', value: 'perth' },
                { label: 'Sydney', value: 'sydney' },
              ]}
              isMulti
              isSearchable={false}
              placeholder="Choose a City"
            />
          </div>
        )}
        trigger={triggerProps => (
          <Button
            {...triggerProps}
            isSelected={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            value="Add"
            iconBefore={<MediaServicesAddCommentIcon label="Add" />}
          />
        )}
      />
    </Fragment>
  );
};
