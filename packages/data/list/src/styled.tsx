import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledRow = styled.div.attrs<{
  $size: number;
  $start: number;
  $gutterSize: number;
}>((props) => ({
  style: {
    height: `${props.$size - props.$gutterSize}px`,
    transform: `translateY(${props.$start}px)`,
    margin: `${props.$gutterSize}px 0`,
  },
}))`
  ${tw`absolute top-0 left-0 flex bg-white border rounded`}
`;

export const StyledItem = styled.div.attrs<{ $gutterSize: number }>(
  (props) => ({
    minWidth: `calc(100% - ${props.$gutterSize * 2}px)`,
    top: 0,
    willChange: 'transform',
  }),
)`
  font-size: 0.95rem;
  ${tw`top-0 cursor-pointer`}
`;

export const StyledCell = styled.div.attrs<{
  $size: number;
  $minSize: number;
  $maxSize: number;
}>((props) => ({
  width: props.$size || '150px',
  minWidth: props.$minSize || 'auto',
  maxWidth: props.$maxSize || 'auto',
}))`
  ${tw`flex px-4 truncate`}
`;
