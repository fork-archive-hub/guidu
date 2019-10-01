import {
  decisionItem,
  decisionList,
  taskItem,
  taskList,
} from '@uidu/adf-schema';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import * as React from 'react';
import styled from 'styled-components';
import { EditorPlugin } from '../../types';
import { INPUT_METHOD } from '../analytics';
import { messages as insertBlockMessages } from '../insert-block/ui/ToolbarInsertBlock';
import { IconAction, IconDecision } from '../quick-insert/assets';
import { getListTypes, insertTaskDecisionWithAnalytics } from './commands';
import inputRulePlugin from './pm-plugins/input-rules';
import keymap from './pm-plugins/keymaps';
import { createPlugin } from './pm-plugins/main';
import { TaskDecisionListType } from './types';
import ToolbarDecision from './ui/ToolbarDecision';
import ToolbarTask from './ui/ToolbarTask';

const TaskDecisionToolbarGroup = styled.div`
  display: flex;
`;

const quickInsertItem = (
  insert: (node: PMNode) => Transaction,
  state: EditorState,
  listType: TaskDecisionListType,
): Transaction => {
  const { list, item } = getListTypes(listType, state.schema);
  const addItem = ({
    listLocalId,
    itemLocalId,
  }: {
    listLocalId?: string;
    itemLocalId?: string;
  }) =>
    insert(
      list.createChecked(
        { localId: listLocalId },
        item.createChecked({
          localId: itemLocalId,
        }),
      ),
    );
  return insertTaskDecisionWithAnalytics(
    state,
    listType,
    INPUT_METHOD.QUICK_INSERT,
    addItem,
  ) as Transaction;
};

const tasksAndDecisionsPlugin = (): EditorPlugin => ({
  name: 'taskDecision',

  nodes() {
    return [
      { name: 'decisionList', node: decisionList },
      { name: 'decisionItem', node: decisionItem },
      { name: 'taskList', node: taskList },
      { name: 'taskItem', node: taskItem },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'tasksAndDecisions',
        plugin: ({ portalProviderAPI, providerFactory, dispatch }) => {
          return createPlugin(portalProviderAPI, providerFactory, dispatch);
        },
      },
      {
        name: 'tasksAndDecisionsInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema),
      },
      {
        name: 'tasksAndDecisionsKeyMap',
        plugin: ({ schema }) => keymap(schema),
      }, // Needs to be after "save-on-enter"
    ];
  },

  secondaryToolbarComponent({ editorView, disabled }) {
    return (
      <TaskDecisionToolbarGroup>
        <ToolbarDecision
          editorView={editorView}
          isDisabled={disabled}
          isReducedSpacing={true}
        />
        <ToolbarTask
          editorView={editorView}
          isDisabled={disabled}
          isReducedSpacing={true}
        />
      </TaskDecisionToolbarGroup>
    );
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(insertBlockMessages.action),
        description: formatMessage(insertBlockMessages.actionDescription),
        priority: 100,
        keywords: ['checkbox', 'task', 'todo'],
        keyshortcut: '[]',
        icon: () => (
          <IconAction label={formatMessage(insertBlockMessages.action)} />
        ),
        action(insert, state) {
          return quickInsertItem(insert, state, 'taskList');
        },
      },
      {
        title: formatMessage(insertBlockMessages.decision),
        description: formatMessage(insertBlockMessages.decisionDescription),
        priority: 900,
        keyshortcut: '<>',
        icon: () => (
          <IconDecision label={formatMessage(insertBlockMessages.decision)} />
        ),
        action(insert, state) {
          return quickInsertItem(insert, state, 'decisionList');
        },
      },
    ],
  },
});

export default tasksAndDecisionsPlugin;
