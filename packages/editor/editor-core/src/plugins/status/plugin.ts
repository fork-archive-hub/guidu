import {
  EditorState,
  NodeSelection,
  Plugin,
  Transaction,
} from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Dispatch } from '../../event-dispatcher';
import { PortalProviderAPI } from '../../ui/PortalProvider';
import { ZeroWidthSpace } from '../../utils';
import statusNodeView from './nodeviews/status';
import { pluginKey } from './plugin-key';
import type { StatusPluginOptions, StatusState } from './types';
import { isEmptyStatus, mayGetStatusAtSelection } from './utils';

export { pluginKey, pluginKeyName } from './plugin-key';
export type { StatusState, StatusType } from './types';

const createPlugin = (
  dispatch: Dispatch,
  portalProviderAPI: PortalProviderAPI,
  options?: StatusPluginOptions,
) =>
  new Plugin({
    state: {
      init: () => ({
        isNew: false,
        showStatusPickerAt: null,
      }),
      apply(tr, state: StatusState, oldEditorState) {
        const meta = tr.getMeta(pluginKey);

        if (meta) {
          const newState = { ...state, ...meta };

          dispatch(pluginKey, newState);
          return newState;
        }

        if (tr.docChanged && state.showStatusPickerAt) {
          const { pos, deleted } = tr.mapping.mapResult(
            state.showStatusPickerAt,
          );

          const showStatusPickerAt = deleted ? null : pos;

          const newState = {
            ...state,
            showStatusPickerAt,
          };

          if (newState.showStatusPickerAt !== state.showStatusPickerAt) {
            dispatch(pluginKey, newState);

            return newState;
          }
        }

        if (!tr.selection.eq(oldEditorState.selection)) {
          // Change in selection, while status picker was open, update state, if required.
          const selectionFrom = tr.selection.from;
          const nodeAtSelection = tr.doc.nodeAt(selectionFrom);
          let showStatusPickerAt = null;
          if (
            nodeAtSelection &&
            nodeAtSelection.type === oldEditorState.schema.nodes.status &&
            tr.selection instanceof NodeSelection
          ) {
            showStatusPickerAt = selectionFrom;
          }
          if (showStatusPickerAt !== state.showStatusPickerAt) {
            const newState = {
              ...state,
              isNew: false,
              showStatusPickerAt,
            };
            dispatch(pluginKey, newState);
            return newState;
          }
        }
        return state;
      },
    },
    appendTransaction: (
      transactions: Transaction[],
      oldEditorState: EditorState,
      newEditorState: EditorState,
    ) => {
      let changed = false;
      let tr = newEditorState.tr;

      // user leaves the StatusPicker with empty text and selects a new node
      if (transactions.find((tr) => tr.selectionSet)) {
        let oldStatus = mayGetStatusAtSelection(oldEditorState.selection);
        let newStatus = mayGetStatusAtSelection(newEditorState.selection);
        if (
          oldStatus &&
          ((newStatus && oldStatus.localId !== newStatus.localId) || !newStatus)
        ) {
          if (isEmptyStatus(oldStatus)) {
            const pos = oldEditorState.selection.from;
            tr.delete(tr.mapping.map(pos), tr.mapping.map(pos + 1));
            changed = true;
          }
        }
      }
      return changed ? tr : undefined;
    },
    key: pluginKey,
    props: {
      nodeViews: {
        status: statusNodeView(portalProviderAPI, options),
      },
      decorations(state: EditorState) {
        const { tr } = state;
        const nodeAtSelection = tr.doc.nodeAt(tr.selection.from);

        if (
          options &&
          options.allowZeroWidthSpaceAfter &&
          nodeAtSelection &&
          nodeAtSelection.type === state.schema.nodes.status
        ) {
          const delayedNodeRendering = () => {
            return document.createTextNode(ZeroWidthSpace);
          };

          const decoration = Decoration.widget(
            tr.selection.from,
            delayedNodeRendering,
            {
              side: 1,
              key: '#status-zero-width-char-decoration',
            },
          );

          const { doc } = state;
          return DecorationSet.create(doc, [decoration]);
        }

        return null;
      },
    },
  });

export default createPlugin;
