import React from 'react';

import RightArrow from '@atlaskit/icon/glyph/arrow-right';

import { ButtonItem } from '../src';

import koala from './icons/koala.png';

const ImgIcon = ({ src }: { src: string; alt: string }) => (
  <img src={src} height={24} width={24} style={{ borderRadius: 3 }} />
);

export default () => (
  <ButtonItem
    onClick={console.log}
    iconBefore={<ImgIcon src={koala} alt={'Koala'} />}
    description="Hover over me"
    iconAfter={<RightArrow label="" />}
    isSelected
    cssFn={(currentStyles, { isSelected }) => {
      return {
        ...currentStyles,
        padding: '12px 20px',
        border: '1px solid #CDCDCD',
        backgroundColor: 'aliceblue',
        borderRadius: 3,
        '&:hover': {
          backgroundColor: 'antiquewhite',
        },
        ['& [data-item-description]']: {
          fontStyle: 'italic',
          ...(isSelected && { textDecoration: 'underline' }),
        },
        ['& [data-item-elem-before]']: { filter: 'grayscale(1)' },
        ['& [data-item-elem-after]']: { opacity: 0 },
        ['&:hover [data-item-elem-after]']: { opacity: 1 },
      };
    }}
  >
    Nested navigation item
  </ButtonItem>
);
