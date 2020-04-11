import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import Tooltip from '@atlaskit/tooltip';
import { colors } from '@uidu/theme';
import React, { PureComponent } from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Button, ButtonWrapper } from './styles';

// IMO these should live inside @atlaskit/theme
const messages = defineMessages({
  selected: {
    id: 'fabric.editor.selected',
    defaultMessage: 'Selected',
    description: 'If the item is selected or not.',
  },
});

export interface Props {
  value: string;
  label: string;
  tabIndex?: number;
  isSelected?: boolean;
  onClick: (value: string) => void;
  borderColor: string;
  checkMarkColor?: string;
}

class Color extends PureComponent<Props & WrappedComponentProps> {
  render() {
    const {
      tabIndex,
      value,
      label,
      isSelected,
      borderColor,
      checkMarkColor = colors.N0,
      intl: { formatMessage },
    } = this.props;

    return (
      <Tooltip content={label}>
        <ButtonWrapper>
          <Button
            onClick={this.onClick}
            onMouseDown={this.onMouseDown}
            tabIndex={tabIndex}
            className={`${isSelected ? 'selected' : ''}`}
            style={{
              backgroundColor: value || 'transparent',
              border: `1px solid ${borderColor}`,
            }}
          >
            {isSelected && (
              <EditorDoneIcon
                primaryColor={checkMarkColor}
                label={formatMessage(messages.selected)}
              />
            )}
          </Button>
        </ButtonWrapper>
      </Tooltip>
    );
  }

  onMouseDown = (e: React.MouseEvent<{}>) => {
    e.preventDefault();
  };

  onClick = (e: React.MouseEvent<{}>) => {
    const { onClick, value } = this.props;
    e.preventDefault();
    onClick(value);
  };
}

export default injectIntl(Color);
