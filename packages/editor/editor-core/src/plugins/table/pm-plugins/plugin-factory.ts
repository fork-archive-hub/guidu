import { PluginKey } from 'prosemirror-state';
import { pluginFactory } from '../../../utils/plugin-state-factory';
import { handleDocOrSelectionChanged } from '../handlers';
import reducer from '../reducer';

export const pluginKey = new PluginKey('tablePlugin');
export const {
  createPluginState,
  createCommand,
  getPluginState,
} = pluginFactory(pluginKey, reducer, {
  mapping: (tr, pluginState) => {
    if (tr.docChanged && pluginState.targetCellPosition) {
      const { pos, deleted } = tr.mapping.mapResult(
        pluginState.targetCellPosition,
      );
      return {
        ...pluginState,
        targetCellPosition: deleted ? undefined : pos,
      };
    }
    return pluginState;
  },
  onDocChanged: handleDocOrSelectionChanged,
  onSelectionChanged: handleDocOrSelectionChanged,
});
