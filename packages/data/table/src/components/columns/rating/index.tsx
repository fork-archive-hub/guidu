import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const ratingField = {
  id: 'rating',
  name: <FormattedMessage id="field.rating.name" defaultMessage="Rating" />,
  icon: <FontAwesomeIcon icon={faStar} />,
};

export default () => ({
  type: 'rating',
  field: 'rating',
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faStar} /> },
});
