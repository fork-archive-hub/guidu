import {
  ExtensionHandlers,
  ExtensionProvider,
  getExtensionModuleNode,
  ProviderFactory,
  UpdateExtension,
} from '@uidu/editor-common';
import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Dispatch } from '../../event-dispatcher';
import { PortalProviderAPI } from '../../ui/PortalProvider';
import { updateState } from './commands';
import ExtensionNodeView from './nodeviews/extension';
import {
  createCommand,
  createPluginState,
  getPluginState,
} from './plugin-factory';
import { pluginKey } from './plugin-key';
import {
  getSelectedDomElement,
  getSelectedExtension,
  getSelectedNonContentExtension,
} from './utils';

const updateEditButton = (
  view: EditorView,
  extensionProvider: ExtensionProvider,
) => {
  const nodeWithPos = getSelectedExtension(view.state, true);
  if (nodeWithPos) {
    const { extensionType, extensionKey } = nodeWithPos.node.attrs;
    getExtensionModuleNode(extensionProvider, extensionType, extensionKey)
      .then((extensionModuleNode) => {
        const newNodeWithPos = getSelectedExtension(view.state, true);
        if (
          newNodeWithPos &&
          newNodeWithPos.node.attrs.extensionType === extensionType &&
          newNodeWithPos.node.attrs.extensionKey === extensionKey &&
          newNodeWithPos.pos === nodeWithPos.pos &&
          extensionModuleNode.update
        ) {
          updateState({
            showEditButton: true,
            updateExtension: extensionModuleNode.update,
          })(view.state, view.dispatch);
        }
      })
      .catch(() => {
        updateState({
          showEditButton: true,
        })(view.state, view.dispatch);
      });
  }
};

const createPlugin = (
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  extensionHandlers: ExtensionHandlers,
  portalProviderAPI: PortalProviderAPI,
) => {
  const state = createPluginState(dispatch, {
    layout: 'default',
    showEditButton: false,
    showContextPanel: false,
  });

  return new Plugin({
    state,
    view: (editorView) => {
      const domAtPos = editorView.domAtPos.bind(editorView);

      const providerHandler = (
        name: string,
        provider?: Promise<ExtensionProvider>,
      ) => {
        if (name === 'extensionProvider' && provider) {
          provider
            .then((extensionProvider) => {
              updateState({ extensionProvider })(
                editorView.state,
                editorView.dispatch,
              );

              updateEditButton(editorView, extensionProvider);
            })
            .catch(() =>
              updateState({ extensionProvider: undefined })(
                editorView.state,
                editorView.dispatch,
              ),
            );
        }
      };

      providerFactory.subscribe('extensionProvider', providerHandler);

      return {
        update: (view) => {
          const { state, dispatch } = view;
          const { element, extensionProvider } = getPluginState(state);

          // This fetches the selected extension node, either by keyboard selection or click for all types of extensions
          const selectedExtension = getSelectedExtension(state, true);
          if (!selectedExtension && !element) {
            return undefined;
          }

          const isContentExtension = !!getSelectedNonContentExtension(state);

          const newElement = getSelectedDomElement(
            domAtPos,
            selectedExtension,
            isContentExtension,
          );

          if (element !== newElement) {
            let showEditButton = false;
            let updateExtension: UpdateExtension<object> | undefined;

            if (selectedExtension) {
              const { extensionType } = selectedExtension.node.attrs;

              const extensionHandler = extensionHandlers[extensionType];
              if (extensionHandler && typeof extensionHandler === 'object') {
                // Old API with the `update` function
                showEditButton = !!extensionHandler.update;
                updateExtension = extensionHandler.update;
              } else if (extensionProvider) {
                // New API with or without the `update` function, we don't know at this point
                updateEditButton(view, extensionProvider);
              } else {
                // Old API without the `update` function
                showEditButton = true;
              }
            }

            const layout = selectedExtension
              ? selectedExtension.node.attrs.layout
              : 'default';

            updateState({
              nodeWithPos: selectedExtension,
              showContextPanel: false,
              element: newElement,
              showEditButton,
              updateExtension,
              layout,
            })(state, dispatch);
          }
          return true;
        },
        destroy: () => {
          providerFactory.unsubscribe('extensionProvider', providerHandler);
        },
      };
    },
    key: pluginKey,
    props: {
      nodeViews: {
        extension: ExtensionNodeView(
          portalProviderAPI,
          providerFactory,
          extensionHandlers,
        ),
        bodiedExtension: ExtensionNodeView(
          portalProviderAPI,
          providerFactory,
          extensionHandlers,
        ),
        inlineExtension: ExtensionNodeView(
          portalProviderAPI,
          providerFactory,
          extensionHandlers,
        ),
      },
    },
  });
};

export { pluginKey, createPlugin, createCommand, getPluginState };
