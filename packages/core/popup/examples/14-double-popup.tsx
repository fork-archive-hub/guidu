/** @jsxImportSource @emotion/react */
import Button from '@uidu/button';
import React, { FC, Fragment, useState } from 'react';
import Popup from '../src';

const spacerCSS = {
  margin: '250px',
};

const sizedContentCSS = {
  alignItems: 'center',
  padding: '10px',
  textAlign: 'center',
  verticalAlign: 'center',
} as const;

const OtherItems: FC = () => {
  return (
    <Fragment>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
    </Fragment>
  );
};

const PopupContent: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div id="popup-content" css={sizedContentCSS}>
      <Popup
        isOpen={isOpen}
        placement="right-start"
        onClose={() => setIsOpen(false)}
        content={() => (
          <div id="popup-content-2" css={sizedContentCSS}>
            <div>A second pop-up</div>
            <OtherItems />
          </div>
        )}
        offset={[0, 12]}
        trigger={(triggerProps) => (
          <a
            id="popup-trigger"
            {...triggerProps}
            // @ts-ignore
            ref={triggerProps.ref}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close' : 'Open'} Popup
          </a>
        )}
      />
      <OtherItems />
    </div>
  );
};

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div css={spacerCSS}>
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={() => <PopupContent />}
        trigger={(triggerProps) => (
          <Button
            id="popup-trigger"
            {...triggerProps}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close' : 'Open'} Popup
          </Button>
        )}
        placement={'bottom-start'}
      />
    </div>
  );
};
