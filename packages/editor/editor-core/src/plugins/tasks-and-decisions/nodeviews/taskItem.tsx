import {
  AnalyticsEventPayload,
  AnalyticsListener,
  UIAnalyticsEvent,
} from '@uidu/analytics';
import { ProviderFactory } from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { Decoration, NodeView } from 'prosemirror-view';
import * as React from 'react';
import { ForwardRef, getPosHandler, ReactNodeView } from '../../../nodeviews';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import WithPluginState from '../../../ui/WithPluginState';
import {
  EditorDisabledPluginState,
  pluginKey as editorDisabledPluginKey,
} from '../../editor-disabled';
import {
  stateKey as taskPluginKey,
  TaskDecisionPluginState,
} from '../pm-plugins/main';
import TaskItem from '../ui/Task';

export interface Props {
  providerFactory: ProviderFactory;
}

class Task extends ReactNodeView<Props> {
  private isContentEmpty(node: PMNode) {
    return node.content.childCount === 0;
  }

  private handleOnChange = (taskId: string, isChecked: boolean) => {
    const { tr } = this.view.state;
    const nodePos =
      typeof this.getPos === 'function' ? this.getPos() : +this.getPos;

    tr.setNodeMarkup(nodePos, undefined, {
      state: isChecked ? 'DONE' : 'TODO',
      localId: taskId,
    });

    this.view.dispatch(tr);
  };

  /**
   * Dynamically generates analytics data relating to the parent list.
   *
   * Required to be dynamic, as list (in prosemirror model) may have
   * changed (e.g. item movements, or additional items in list).
   * This node view will have not rerendered for those changes, so
   * cannot render the position and listSize into the
   * AnalyticsContext at initial render time.
   */
  private addListAnalyticsData = (event: UIAnalyticsEvent) => {
    try {
      const resolvedPos = this.view.state.doc.resolve(
        typeof this.getPos === 'function' ? this.getPos() : +this.getPos,
      );
      const position = resolvedPos.index();
      const listSize = resolvedPos.parent.childCount;
      const listLocalId = resolvedPos.parent.attrs.localId;

      event.update((payload: AnalyticsEventPayload) => {
        const { attributes = {}, actionSubject } = payload;
        if (actionSubject !== 'action') {
          // Not action related, ignore
          return payload;
        }
        return {
          ...payload,
          attributes: {
            ...attributes,
            position,
            listSize,
            listLocalId,
          },
        };
      });
    } catch (e) {
      // This can occur if pos is NaN (seen it in some test cases)
      // Act defensively here, and lose some analytics data rather than
      // cause any user facing error.
    }
  };

  createDomRef() {
    const domRef = document.createElement('li');
    domRef.style['list-style-type' as any] = 'none';
    return domRef;
  }

  getContentDOM() {
    return { dom: document.createElement('div') };
  }

  render(props: Props, forwardRef: ForwardRef) {
    const { localId, state } = this.node.attrs;
    return (
      <AnalyticsListener
        channel="fabric-elements"
        onEvent={this.addListAnalyticsData}
      >
        <WithPluginState
          plugins={{
            editorDisabledPlugin: editorDisabledPluginKey,
            taskDecisionPlugin: taskPluginKey,
          }}
          render={({
            editorDisabledPlugin,
          }: {
            editorDisabledPlugin: EditorDisabledPluginState;
            taskDecisionPlugin: TaskDecisionPluginState;
          }) => {
            return (
              <TaskItem
                taskId={localId}
                contentRef={forwardRef}
                isDone={state === 'DONE'}
                onChange={this.handleOnChange}
                showPlaceholder={this.isContentEmpty(this.node)}
                providers={props.providerFactory}
                disabled={(editorDisabledPlugin || {}).editorDisabled}
              />
            );
          }}
        />
      </AnalyticsListener>
    );
  }

  viewShouldUpdate(nextNode: PMNode) {
    /**
     * To ensure the placeholder is correctly toggled we need to allow react to re-render
     * on first character insertion.
     * Note: last character deletion is handled externally and automatically re-renders.
     */
    return this.isContentEmpty(this.node) && !!nextNode.content.childCount;
  }

  update(node: PMNode, decorations: Decoration[]) {
    return super.update(
      node,
      decorations,
      (currentNode: PMNode, newNode: PMNode) =>
        // Toggle the placeholder based on whether user input exists
        !this.isContentEmpty(newNode) &&
        !!(currentNode.attrs.state === newNode.attrs.state),
    );
  }
}

export function taskItemNodeViewFactory(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
) {
  return (node: any, view: any, getPos: getPosHandler): NodeView => {
    return new Task(node, view, getPos, portalProviderAPI, {
      providerFactory,
    }).init();
  };
}
