import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  AnalyticsEventPayload,
  EVENT_TYPE,
  InputMethodInsertLink,
} from '../analytics';
import { getLinkDomain } from './utils';

export function getLinkCreationAnalyticsEvent(
  inputMethod: InputMethodInsertLink,
  url: string,
): AnalyticsEventPayload {
  return {
    action: ACTION.INSERTED,
    actionSubject: ACTION_SUBJECT.DOCUMENT,
    actionSubjectId: ACTION_SUBJECT_ID.LINK,
    attributes: { inputMethod },
    eventType: EVENT_TYPE.TRACK,
    nonPrivacySafeAttributes: {
      linkDomain: getLinkDomain(url),
    },
  };
}
