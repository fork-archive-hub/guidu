import { colorPalette, colorPaletteExperimental } from '@uidu/adf-schema';
import { colors } from '@uidu/theme';
import { convert } from 'chromatism';
import getColorMessage from './getColorMessage';
import paletteMessages from './paletteMessages';
import { PaletteColor } from './type';

/**
 * For a given color set the alpha channel to alpha
 *
 * @param color color string, suppports HEX, RGB, RGBA etc.
 * @param alpha Alpha channel value as fraction of 1
 * @return CSS RGBA string with applied alpha channel
 */
function setAlpha(color: string, alpha: number): string {
  const { r, g, b } = convert(color).rgb;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const DEFAULT_BORDER_COLOR = setAlpha(colors.N800, 0.12);

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
export const textColorPaletteExperimental: Array<PaletteColor> = [];

colorPalette.forEach((label, color) => {
  textColorPalette.push(mapPaletteColor(label, color));
});
colorPaletteExperimental.forEach((label, color) => {
  textColorPaletteExperimental.push(mapPaletteColor(label, color));
});
