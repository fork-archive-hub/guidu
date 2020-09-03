import { ProviderFactory } from '@uidu/editor-common';
import type { Providers } from '@uidu/editor-common/provider-factory';
import {
  FileIdentifier,
  MediaClientConfig,
  MediaUploadOptions,
} from '@uidu/media-core';
import { MediaFile } from '@uidu/media-picker/types';
import { NodeType } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

export interface MediaOptions {
  provider?: Providers['mediaProvider'];
  allowMediaSingle?: boolean | MediaSingleOptions;
  allowMediaGroup?: boolean;
  customDropzoneContainer?: HTMLElement;
  customMediaPicker?: CustomMediaPicker;
  allowResizing?: boolean;
  allowResizingInTables?: boolean;
  allowAnnotation?: boolean;
  allowLinking?: boolean;
  allowLazyLoading?: boolean;
  allowBreakoutSnapPoints?: boolean;
  allowAdvancedToolBarOptions?: boolean;
  allowMediaSingleEditable?: boolean;
  allowRemoteDimensionsFetch?: boolean;
  allowDropzoneDropLine?: boolean;
  allowMarkingUploadsAsIncomplete?: boolean;
  fullWidthEnabled?: boolean;
  uploadErrorHandler?: (state: MediaState) => void;
  waitForMediaUpload?: boolean;
  isCopyPasteEnabled?: boolean;
  // This enables the option to add an alt-text attribute to images contained in the Editor.
  allowAltTextOnImages?: boolean;
  // returns array of validation errors based on value, if no errors returned - value is considered to be valid
  altTextValidator?: (value: string) => string[];
  useForgePlugins?: boolean;
  useMediaPickerPopup?: boolean;
}

export interface MediaSingleOptions {
  disableLayout?: boolean;
}

export interface MediaState {
  id: string;
  storage: string;
  metadata: {
    size?: number;
    filename: string;
    mime_type?: string;
    width: number | undefined;
    height: number | undefined;
  };
  scaleFactor?: number;
  error?: {
    name: string;
    description: string;
  };
  url: string;
}

export type Listener = (data: any) => void;

export interface CustomMediaPicker {
  on(event: string, cb: Listener): void;
  removeAllListeners(event: any): void;
  emit(event: string, data: any): void;
  destroy(): void;
  setUploadOptions(uploadOptions: MediaUploadOptions): void;
}

export type MobileUploadEndEventPayload = {
  readonly file: MediaFile & {
    readonly collectionName?: string;
    readonly publicId?: string;
  };
};

export type MediaEditorState = {
  mediaClientConfig?: MediaClientConfig;
  editor?: {
    pos: number;
    identifier: FileIdentifier;
  };
};

export type OpenMediaEditor = {
  type: 'open';
  pos: number;
  identifier: FileIdentifier;
};

export type UploadAnnotation = {
  type: 'upload';
  newIdentifier: FileIdentifier;
};

export type CloseMediaEditor = {
  type: 'close';
};

export type SetMediaMediaClientConfig = {
  type: 'setMediaClientConfig';
  mediaClientConfig?: MediaClientConfig;
};

export type MediaEditorAction =
  | OpenMediaEditor
  | CloseMediaEditor
  | UploadAnnotation
  | SetMediaMediaClientConfig;

export type MediaToolbarBaseConfig = {
  title: string;
  getDomRef?: (view: EditorView) => HTMLElement | undefined;
  nodeType: NodeType | NodeType[];
};

export type MediaFloatingToolbarOptions = {
  providerFactory?: ProviderFactory;
  allowResizing?: boolean;
  allowAnnotation?: boolean;
  allowLinking?: boolean;
  allowAdvancedToolBarOptions?: boolean;
  allowResizingInTables?: boolean;
  allowAltTextOnImages?: boolean;
  altTextValidator?: (value: string) => string[];
};
