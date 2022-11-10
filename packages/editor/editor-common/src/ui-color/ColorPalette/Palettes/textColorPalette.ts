import { colorPalette, colorPaletteExtended } from '@uidu/adf-schema';

import { DEFAULT_BORDER_COLOR } from './common';
import getColorMessage from './getColorMessage';
import paletteMessages from './paletteMessages';
import { PaletteColor } from './type';

const mapPaletteColor = (label: string, color: string) => {
  const key = label.toLowerCase().replace(' ', '-');
  const message = getColorMessage(paletteMessages, key);

  return {
    value: color,
    label,
    border: DEFAULT_BORDER_COLOR,
    message,
  };
};

// row 1
export const textColorPalette: Array<PaletteColor> = [];
export const textColorPaletteExtended: Array<PaletteColor> = [];

colorPalette.forEach((label, color) => {
  textColorPalette.push(mapPaletteColor(label, color));
});
colorPaletteExtended.forEach((label, color) => {
  textColorPaletteExtended.push(mapPaletteColor(label, color));
});
