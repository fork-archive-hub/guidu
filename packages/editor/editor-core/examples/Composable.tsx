import { traverse } from '@uidu/adf-utils';
import { MentionResource } from '@uidu/mentions/src';
import { ShellBody, ShellHeader, ShellMain, ShellSidebar } from '@uidu/shell';
import { GuiduThemeProvider } from '@uidu/theme';
import React, { useMemo, useRef, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { localUploadOptions } from '../../../media/media-core/src';
import { story as document } from '../../renderer/examples/helper/story-data';
import { getItems } from '../examples-utils/tokens';
import { Editor, EditorContext, WithEditorActions } from '../src';
import {
  blockTypePlugin,
  insertBlockPlugin,
  layoutPlugin,
  mediaPlugin,
  mentionsPlugin,
  quickInsertPlugin,
  starterKitPlugin,
  tablesPlugin,
  tokenPlugin,
  videoPlugin,
} from '../src/plugins';

export default function Composable() {
  const element = useRef(null);
  const [value, setValue] = useState(document);

  const handleChange = (actions) => (editorView) => {
    actions.getValue().then((newValue) => {
      setValue(newValue);
      traverse(newValue, {
        // emoji visitor, matches all nodes with type === 'emoji'
        emoji: (node, parent) => {
          // do something with the node
          console.log(node);
        },

        mention: (node, parent) => {
          // do something with mention
          console.log(node);
        },
        media: (node, parent) => {
          // do something with mention
          console.log(node);
        },

        taskList: (node, parent) => {
          // do something with taskList
        },
      });
    });
  };

  const plugins = useMemo(
    () => [
      blockTypePlugin(),
      layoutPlugin(),
      // saveOnEnterPlugin(console.log),
      starterKitPlugin({
        placeholder: 'Insert something...',
      }),
      insertBlockPlugin({
        insertMenuItems: [],
      }),
      quickInsertPlugin(),
      videoPlugin(),
      mentionsPlugin(),
      tablesPlugin({ tableOptions: {} }),
      // datePlugin(),
      tokenPlugin(),
      mediaPlugin({
        allowMediaGroup: true,
        allowMediaSingle: true,
        allowAltTextOnImages: true,
        allowLinking: true,
        allowResizing: true,
        mediaPickerProps: (mediaState) => ({
          onFileAdded: console.log,
          onFileRemoved: console.log,
          onComplete: (result) => {
            const files = result.successful.map(
              localUploadOptions({
                endpoint: 'https://uidu.local:8443/upload',
              }).responseHandler,
            );
            mediaState.insertFiles(files);
          },
        }),
      }),
    ],
    [],
  );

  return (
    <IntlProvider locale="en">
      <ShellMain>
        <GuiduThemeProvider>
          <EditorContext>
            <WithEditorActions
              render={(actions) => (
                <Editor
                  tw="py-5 px-5"
                  shouldFocus
                  // saveOnEnter
                  containerElement={element.current}
                  onChange={handleChange(actions)}
                  plugins={plugins}
                  mentionProvider={Promise.resolve(
                    new MentionResource({
                      // Required attrib. Requests will happen natively.
                      url: 'https://me.uidu.local:8443/api/mentions',
                      // shouldHighlightMention: (mention) =>
                      //   accountId === mention.id,
                    }),
                  )}
                  tokenProvider={Promise.resolve({
                    getItems: (query, selectedItems) => getItems(20),
                  })}
                  mediaProvider={Promise.resolve({
                    uploadOptions: localUploadOptions({
                      endpoint: 'https://uidu.local:8443/upload',
                    }),
                    viewMediaClientConfig: async ({ id, ...rest }) => {
                      console.log(rest);
                      return {
                        id,
                        type: 'image',
                        url: `https://me.uidu.local:8443/uploads/cache/${id}`,
                        metadata: {
                          name: 'test',
                          width: 640,
                          height: 640,
                        },
                      };
                    },
                    uploadMediaClientConfig: Promise.resolve('test'),
                  })}
                  defaultValue={value}
                  placeholder="Start typing..."
                >
                  {({ renderToolbar, renderEditor }) => (
                    <>
                      <ShellHeader className="border-bottom">
                        {renderToolbar({})}
                      </ShellHeader>
                      <ShellBody>
                        <ShellMain>
                          <ShellBody
                            ref={element}
                            tw="prose prose-primary max-w-none"
                          >
                            {renderEditor({})}
                          </ShellBody>
                        </ShellMain>
                        <ShellSidebar tw="w-80 border-l bg-gray-50">
                          <textarea
                            style={{ resize: 'none' }}
                            tw="w-full h-full"
                            onChange={(e) => {
                              console.log(e.target.value);
                              actions.replaceDocument(e.target.value);
                            }}
                            value={JSON.stringify(value, null, 2)}
                          />
                        </ShellSidebar>
                      </ShellBody>
                    </>
                  )}
                </Editor>
              )}
            />
          </EditorContext>
        </GuiduThemeProvider>
      </ShellMain>
    </IntlProvider>
  );
}
