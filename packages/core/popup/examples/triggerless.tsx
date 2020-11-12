/** @jsxImportSource @emotion/react */
import AddItemIcon from '@atlaskit/icon/glyph/add-item';
import JiraCaptureIcon from '@atlaskit/icon/glyph/jira/capture';
import AddCommentIcon from '@atlaskit/icon/glyph/media-services/add-comment';
import Button, { ButtonGroup } from '@uidu/button';
import { B75 } from '@uidu/theme/colors';
import React from 'react';
import Popup from '../src';

const HighlightPopup = (props: { children: React.ReactNode }) => (
  <Popup
    isOpen
    placement="bottom"
    content={() => (
      <div css={{ padding: 4 }}>
        <ButtonGroup>
          <Button iconBefore={<AddCommentIcon label="Add comment" />} />
          <Button iconBefore={<AddItemIcon label="Add item" />} />
          <Button iconBefore={<JiraCaptureIcon label="Capture in Jira" />} />
        </ButtonGroup>
      </div>
    )}
    trigger={(triggerProps) => (
      <span
        css={{
          backgroundColor: B75,
        }}
        {...triggerProps}
      >
        {props.children}
      </span>
    )}
  />
);

export default () => {
  return (
    <main>
      Thanks to soaring electricity costs and the potentially-enormous power
      drain of cooling equipment,{' '}
      <HighlightPopup>
        few people can happily leave aircon running 24/7
      </HighlightPopup>
      . This is especially true for those renters who must rely upon portable
      devices.
    </main>
  );
};
