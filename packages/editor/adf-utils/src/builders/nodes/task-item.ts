import { Inline, TaskItemDefinition } from '@uidu/adf-schema';

export const taskItem = (attrs: TaskItemDefinition['attrs']) => (
  ...content: Array<Inline>
): TaskItemDefinition => ({
  type: 'taskItem',
  attrs,
  content,
});
