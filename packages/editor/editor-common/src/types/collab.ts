import { EditorState } from 'prosemirror-state';

export interface CollabParticipant {
  lastActive: number;
  sessionId: string;
  avatar: string;
  name: string;
  email: string;
}

export interface CollabEventInitData {
  doc?: any;
  json?: any;
  version?: number;
  sid?: string;
}

export interface CollabEventRemoteData {
  json?: any;
  newState?: EditorState;
  userIds?: string[];
}

export interface CollabEventConnectionData {
  sid: string;
}

export interface CollabeEventPresenceData {
  joined?: CollabParticipant[];
  left?: { sessionId: string }[];
}

export interface CollabEventTelepointerData {
  type: 'telepointer';
  selection: CollabSendableSelection;
  sessionId: string;
}

export interface CollabSendableSelection {
  type: 'textSelection' | 'nodeSelection';
  anchor: number;
  head: number;
}

export type CollabEvent =
  | 'init'
  | 'connected'
  | 'data'
  | 'telepointer'
  | 'presence'
  | 'error'
  | 'local-steps'
  | 'editor-appearance'
  | 'title:changed';

export interface CollabEventData {
  init: CollabEventInitData;
  connected: CollabEventConnectionData;
  data: CollabEventRemoteData;
  telepointer: CollabEventTelepointerData;
  presensense: CollabeEventPresenceData;
  error: any;
}
