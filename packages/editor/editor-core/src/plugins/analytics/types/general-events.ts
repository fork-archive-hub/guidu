import { FeatureFlagKey } from '../../feature-flags-context/types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
} from './enums';
import { OperationalAEP, TrackAEP, UIAEP } from './utils';

export enum PLATFORMS {
  NATIVE = 'mobileNative',
  HYBRID = 'mobileHybrid',
  WEB = 'web',
}

export enum MODE {
  RENDERER = 'renderer',
  EDITOR = 'editor',
}

export enum FULL_WIDTH_MODE {
  FIXED_WIDTH = 'fixedWidth',
  FULL_WIDTH = 'fullWidth',
}

type ButtonAEP<ActionSubjectID, Attributes> = UIAEP<
  ACTION.CLICKED,
  ACTION_SUBJECT.BUTTON,
  ActionSubjectID,
  Attributes,
  undefined
>;

type PickerAEP<ActionSubjectID, Attributes> = UIAEP<
  ACTION.OPENED,
  ACTION_SUBJECT.PICKER,
  ActionSubjectID,
  Attributes,
  undefined
>;

type FeedbackAEP = UIAEP<
  ACTION.OPENED,
  ACTION_SUBJECT.FEEDBACK_DIALOG,
  undefined,
  { inputMethod: INPUT_METHOD.QUICK_INSERT },
  undefined
>;

type TypeAheadAEP<ActionSubjectID, Attributes> = UIAEP<
  ACTION.INVOKED,
  ACTION_SUBJECT.TYPEAHEAD,
  ActionSubjectID,
  Attributes,
  undefined
>;

type EditorStartAEP = UIAEP<
  ACTION.STARTED,
  ACTION_SUBJECT.EDITOR,
  undefined,
  {
    platform: PLATFORMS.NATIVE | PLATFORMS.HYBRID | PLATFORMS.WEB;
    featureFlags: FeatureFlagKey[];
  },
  undefined
>;

type EditorPerfAEP = OperationalAEP<
  ACTION.EDITOR_MOUNTED | ACTION.PROSEMIRROR_RENDERED,
  ACTION_SUBJECT.EDITOR,
  undefined,
  {
    duration: number;
    startTime: number;
    nodes?: Record<string, number>;
    ttfb?: number;
  },
  undefined
>;

type BrowserFreezePayload = OperationalAEP<
  ACTION.BROWSER_FREEZE,
  ACTION_SUBJECT.EDITOR,
  undefined,
  {
    freezeTime: number;
    nodeSize: number;
  },
  undefined
>;

type SlowInputAEP = OperationalAEP<
  ACTION.SLOW_INPUT,
  ACTION_SUBJECT.EDITOR,
  undefined,
  {
    time: number;
    nodeSize: number;
  },
  undefined
>;

type InputPerfSamlingAEP = OperationalAEP<
  ACTION.INPUT_PERF_SAMPLING,
  ACTION_SUBJECT.EDITOR,
  undefined,
  {
    time: number;
    nodeSize: number;
  },
  undefined
>;

type DispatchedTransactionAEP = OperationalAEP<
  ACTION.TRANSACTION_DISPATCHED,
  ACTION_SUBJECT.EDITOR,
  undefined,
  {
    report: {
      trigger: string;
      duration: number;
      nodes: { [name: string]: number };
      plugins: { [name: string]: { stateApply: number } };
      slowPlugins: { [name: string]: { stateApply: number } };
      stepDurations: {
        stateApply: number;
        viewUpdate: number;
        onChange: number;
        countNodes: number;
      };
    };
  },
  undefined
>;

type UploadExternalFailedAEP = OperationalAEP<
  ACTION.UPLOAD_EXTERNAL_FAIL,
  ACTION_SUBJECT.EDITOR,
  undefined,
  undefined,
  undefined
>;

type EditorStopAEP = UIAEP<
  ACTION.STOPPED,
  ACTION_SUBJECT.EDITOR,
  ACTION_SUBJECT_ID.SAVE | ACTION_SUBJECT_ID.CANCEL,
  {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT;
    documentSize: number;
    nodeCount?: {
      tables: number;
      headings: number;
      lists: number;
      mediaSingles: number;
      mediaGroups: number;
      panels: number;
      extensions: number;
      decisions: number;
      actions: number;
      codeBlocks: number;
    };
  },
  undefined
>;

type AnnotateButtonAEP = UIAEP<
  ACTION.CLICKED,
  ACTION_SUBJECT.MEDIA,
  ACTION_SUBJECT_ID.ANNOTATE_BUTTON,
  undefined,
  undefined
>;

type ButtonHelpAEP = ButtonAEP<
  ACTION_SUBJECT_ID.BUTTON_HELP,
  { inputMethod: INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR }
>;

type ButtonFeedbackAEP = ButtonAEP<
  ACTION_SUBJECT_ID.BUTTON_FEEDBACK,
  undefined
>;

type PickerEmojiAEP = PickerAEP<
  ACTION_SUBJECT_ID.PICKER_EMOJI,
  { inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU }
>;

type PickerImageAEP = PickerAEP<
  ACTION_SUBJECT_ID.PICKER_CLOUD,
  {
    inputMethod:
      | INPUT_METHOD.TOOLBAR
      | INPUT_METHOD.QUICK_INSERT
      | INPUT_METHOD.INSERT_MENU;
  }
>;

type TypeAheadQuickInsertAEP = TypeAheadAEP<
  ACTION_SUBJECT_ID.TYPEAHEAD_QUICK_INSERT,
  { inputMethod: INPUT_METHOD.KEYBOARD }
>;

type HelpQuickInsertAEP = UIAEP<
  ACTION.HELP_OPENED,
  ACTION_SUBJECT.HELP,
  ACTION_SUBJECT_ID.HELP_QUICK_INSERT,
  { inputMethod: INPUT_METHOD.QUICK_INSERT },
  undefined
>;

type TypeAheadEmojiAEP = TypeAheadAEP<
  ACTION_SUBJECT_ID.TYPEAHEAD_EMOJI,
  { inputMethod: INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.KEYBOARD }
>;

type TypeAheadLinkAEP = TypeAheadAEP<
  ACTION_SUBJECT_ID.TYPEAHEAD_LINK,
  {
    inputMethod:
      | INPUT_METHOD.TOOLBAR
      | INPUT_METHOD.INSERT_MENU
      | INPUT_METHOD.QUICK_INSERT
      | INPUT_METHOD.SHORTCUT;
  }
>;

type TypeAheadMentionAEP = TypeAheadAEP<
  ACTION_SUBJECT_ID.TYPEAHEAD_MENTION,
  {
    inputMethod:
      | INPUT_METHOD.TOOLBAR
      | INPUT_METHOD.INSERT_MENU
      | INPUT_METHOD.QUICK_INSERT
      | INPUT_METHOD.KEYBOARD;
  }
>;

type FullWidthModeAEP = TrackAEP<
  ACTION.CHANGED_FULL_WIDTH_MODE,
  ACTION_SUBJECT.EDITOR,
  undefined,
  {
    previousMode: FULL_WIDTH_MODE;
    newMode: FULL_WIDTH_MODE;
  },
  undefined
>;

// TODO: https://product-fabric.atlassian.net/browse/AFP-1418
type ExpandToggleAEP = TrackAEP<
  ACTION.TOGGLE_EXPAND,
  ACTION_SUBJECT.EXPAND | ACTION_SUBJECT.NESTED_EXPAND,
  undefined,
  {
    platform: PLATFORMS;
    mode: MODE;
    expanded: boolean;
  },
  undefined
>;

export type GeneralEventPayload =
  | EditorStartAEP
  | EditorStopAEP
  | AnnotateButtonAEP
  | ButtonHelpAEP
  | ButtonFeedbackAEP
  | PickerEmojiAEP
  | PickerImageAEP
  | FeedbackAEP
  | TypeAheadQuickInsertAEP
  | TypeAheadEmojiAEP
  | TypeAheadLinkAEP
  | TypeAheadMentionAEP
  | FullWidthModeAEP
  | EditorPerfAEP
  | BrowserFreezePayload
  | SlowInputAEP
  | UploadExternalFailedAEP
  | InputPerfSamlingAEP
  | HelpQuickInsertAEP
  | ExpandToggleAEP
  | DispatchedTransactionAEP;
