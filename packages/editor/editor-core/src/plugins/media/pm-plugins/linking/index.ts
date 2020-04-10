import { LinkAttributes } from '@uidu/adf-schema';
import {
  NodeSelection,
  Plugin,
  PluginKey,
  Transaction,
} from 'prosemirror-state';
import { Dispatch } from '../../../../event-dispatcher';
import { closestElement } from '../../../../utils/dom';
import { pluginFactory } from '../../../../utils/plugin-state-factory';
import { MediaLinkingActions } from './actions';
import reducer from './reducer';
import { InitialState, MediaLinkingState } from './types';

const mediaLinkingPluginKey = new PluginKey('mediaLinking');

const initialState: InitialState = {
  visible: false,
  editable: false,
  mediaPos: null,
  link: '',
};

function mapping(
  tr: Transaction,
  pluginState: MediaLinkingState,
): MediaLinkingState {
  if (pluginState && pluginState.mediaPos !== null) {
    return {
      ...pluginState,
      mediaPos: tr.mapping.map(pluginState.mediaPos),
    };
  }
  return pluginState;
}

function onSelectionChanged(tr: Transaction): MediaLinkingState {
  const isNodeSelection = tr.selection instanceof NodeSelection;
  if (!isNodeSelection) {
    return initialState;
  }

  const node = tr.doc.nodeAt(tr.selection.$from.pos);
  if (!node || node.type.name !== 'mediaSingle') {
    return initialState;
  }

  const mark = node.marks.find((mark) => mark.type.name === 'link');
  if (mark) {
    return {
      ...initialState,
      mediaPos: tr.selection.$from.pos,
      editable: true,
      link: (mark.attrs as LinkAttributes).href,
    };
  }

  return {
    ...initialState,
    mediaPos: tr.selection.$from.pos,
  };
}

const mediaLinkingPluginFactory = pluginFactory<
  MediaLinkingState,
  MediaLinkingActions,
  InitialState
>(mediaLinkingPluginKey, reducer, {
  mapping,
  onSelectionChanged,
});

export const {
  createCommand: createMediaLinkingCommand,
  getPluginState: getMediaLinkingState,
} = mediaLinkingPluginFactory;

export { MediaLinkingState } from './types';

export default (dispatch: Dispatch) =>
  new Plugin({
    key: mediaLinkingPluginKey,
    state: mediaLinkingPluginFactory.createPluginState(dispatch, initialState),
    props: {
      // ED-8718
      handleClick: (_, _pos, event: MouseEvent) => {
        if (event.target) {
          const target = event.target as HTMLElement;
          if (closestElement(target, '.blockLink')) {
            event.preventDefault();
            return true;
          }
        }
        return false;
      },
    },
  });
