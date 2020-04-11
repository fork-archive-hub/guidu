import { decisionListSelector, taskListSelector } from '@uidu/adf-schema';
import {
  akEditorFullWidthLayoutWidth,
  akEditorGutterPadding,
  akEditorSwoopCubicBezier,
  akLayoutGutterOffset,
} from '@uidu/editor-common';
import styled from 'styled-components';
import {
  tableFullPageEditorStyles,
  tableMarginFullWidthMode,
} from '../../../plugins/table/ui/styles';
import ContentStyles from '../../ContentStyles';
import { scrollbarStyles } from '../../styles';

const SWOOP_ANIMATION = `0.5s ${akEditorSwoopCubicBezier}`;
const TOTAL_PADDING = akEditorGutterPadding * 2;

export const FullPageEditorWrapper = styled.div`
  min-width: 340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
FullPageEditorWrapper.displayName = 'FullPageEditorWrapper';

export const ScrollContainer = styled(ContentStyles)`
  flex-grow: 1;
  height: 100%;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  ${scrollbarStyles};
`;
ScrollContainer.displayName = 'ScrollContainer';

export const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 80px);
  box-sizing: border-box;
`;
ContentArea.displayName = 'ContentArea';

export const SidebarArea = styled.div`
  height: 100%;
  box-sizing: border-box;
  align-self: flex-end;
`;
SidebarArea.displayName = 'SidebarArea';

export const EditorContentArea = styled.div<any>`
  line-height: 24px;
  padding-top: 50px;
  padding-bottom: 55px;
  height: calc(
    100% - 105px
  ); /* fill the viewport: 100% - (padding top & bottom) */
  width: 100%;
  margin: auto;
  flex-direction: column;
  flex-grow: 1;

  max-width: ${({ theme, fullWidthMode }: any) =>
    (fullWidthMode ? akEditorFullWidthLayoutWidth : theme.layoutMaxWidth) +
    TOTAL_PADDING}px;
  transition: max-width ${SWOOP_ANIMATION};

  & .ProseMirror {
    flex-grow: 1;
    box-sizing: border-box;
  }

  & .ProseMirror {
    & > * {
      /* pre-emptively clear all direct descendant content, just in case any are adjacent floated content */
      clear: both;
    }
    > p,
    > ul,
    > ol:not(${taskListSelector}):not(${decisionListSelector}),
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      /* deliberately allow wrapping of text based nodes, just in case any are adjacent floated content */
      clear: none;
    }

    > p:last-child {
      margin-bottom: 24px;
    }
  }

  ${tableFullPageEditorStyles};

  .fabric-editor--full-width-mode {
    /* Full Width Mode styles for ignoring breakout sizes */
    .fabric-editor-breakout-mark,
    .extension-container,
    .pm-table-container {
      width: 100% !important;
    }

    /* Prevent horizontal scroll on page in full width mode */
    ${({ containerWidth }) => {
      if (!containerWidth) {
        // initially hide until we have a containerWidth and can properly size them,
        // otherwise they can cause the editor width to extend which is non-recoverable
        return `
          .pm-table-container,
          .code-block,
          .extension-container {
            display: none;
          }
        `;
      }

      return `
        .pm-table-container,
        .code-block,
        .extension-container {
          max-width: ${
            containerWidth - TOTAL_PADDING - tableMarginFullWidthMode * 2
          }px;
        }

        [data-layout-section] {
          max-width: ${
            containerWidth - TOTAL_PADDING + akLayoutGutterOffset * 2
          }px;
        }
      `;
    }}
  }
`;
EditorContentArea.displayName = 'EditorContentArea';
