import { code, Example, md } from '@uidu/docs';
import SectionMessage from '@uidu/section-message';
import * as React from 'react';
import SimpleEmojiExample from '../examples/00-simple-emoji';

const SimpleEmojiSource = require('!!raw-loader!../examples/00-simple-emoji');

export default md`

  The main purpose of the emoji package is to provide multiple components for selecting from a list of provided emojis and rendering them.

  It includes support for adding a custom set of emojis from a specified provider and uploading images as emojis to a service.

  ## Usage

  Import the component in your React app as follows:

  ${code`
  import EmojiPicker from '@uidu/emoji';
  import { EmojiResource } from '@uidu/emoji';

  const emojiProvider = new EmojiResource({
    providers: [
      {
        url: 'https://emoji-example/emoji/standard',
      },
      {
        url: 'https://emoji-example/emoji/site-id/site',
        securityProvider: () => ({
          headers: {
            Authorization: 'Bearer token',
          },
        }),
      },
    ],
  });

  ReactDOM.render(
    <EmojiPicker
      emojiProvider={emojiProvider}
      onSelection={emoji => {
        /* do something */
      }}
    />,
    container,
  );`}

  ### Other emoji components import examples

  ${code`
    import Emoji from '@uidu/emoji';
    import EmojiTypeAhead from '@uidu/emoji';
    import EmojiPicker from '@uidu/emoji';
    import ResourcedEmoji, { EmojiResource, AbstractResource, EmojiProvider, UploadingEmojiProvider, EmojiResourceConfig, EmojiRepository, EmojiLoader} from '@uidu/emoji';
    import { toEmojiId, toOptionalEmojiId, denormaliseEmojiServiceResponse, UsageFrequencyTracker } from '@uidu/emoji';
    import { EmojiUploader } from '@uidu/emoji';
  `}

  ### Note:

  Don't forget to add polyfills for fetch, ES6 & ES7 to your product build if you want to target older browsers.
  We recommend the use of [babel-preset-env](https://babeljs.io/docs/plugins/preset-env/) & [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)

  The examples includes a set of stories for running against a live server. See 'Real Emoji Resource'.

  You can specify the URLs manually in the textarea on the story (as json configuration suitable for EmojiResource),
  or specify it when running the examples in the local-config.ts in the root of this component.

  There is an example file local-config-example.ts that can be copied.

  ${(
    <Example
      packageName="@uidu/emoji"
      Component={SimpleEmojiExample}
      title="Emoji"
      source={SimpleEmojiSource}
    />
  )}

  ${(
    <SectionMessage
      appearance="warning"
      title="Props can not be displayed for the time being."
      actions={[
        {
          key: '1',
          href:
            'https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/elements/emoji/src/components/common/Emoji.tsx',
          text: 'Emoji Props',
        },
      ]}
    >
      <p>You can still find props in the source code.</p>
    </SectionMessage>
  )}
`;
