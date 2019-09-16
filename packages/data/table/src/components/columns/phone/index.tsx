import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Renderer from './renderer';

export default () => ({
  type: 'phone',
  filter: 'agTextColumnFilter',
  cellRenderer: Renderer,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faPhone} /> },
});
