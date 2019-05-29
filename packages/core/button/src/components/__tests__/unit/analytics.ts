// This is a global mock for this file that will mock all components wrapped with analytics
// and replace them with an empty SFC that returns null. This includes components imported
// directly in this file and others imported as dependencies of those imports.
jest.mock('@uidu/analytics', () => ({
  withAnalyticsEvents: jest.fn(() => jest.fn(() => () => null)),
  withAnalyticsContext: jest.fn(() => jest.fn(() => () => null)),
  createAndFireEvent: jest.fn(() => jest.fn(args => args)),
}));

import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import '../../../components/Button';
import {
  name as packageName,
  version as packageVersion,
} from '../../../version.json';

describe('Button', () => {
  it('should be wrapped with analytics context', () => {
    expect(withAnalyticsContext).toHaveBeenCalledWith({
      componentName: 'button',
      packageName,
      packageVersion,
    });
  });

  it('should be wrapped with analytics events', () => {
    expect(createAndFireEvent).toHaveBeenCalledWith('atlaskit');
    expect(withAnalyticsEvents).toHaveBeenLastCalledWith({
      onClick: {
        action: 'clicked',
        actionSubject: 'button',
        attributes: {
          componentName: 'button',
          packageName,
          packageVersion,
        },
      },
    });
  });
});
