import { flexRender, Row } from '@tanstack/react-table';
import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
  cursor: pointer;
  font-size: 0.95rem;
`;

export default function Item<T>({
  row: item,
  gutterSize = 32,
  onItemClick,
  style = {},
}: {
  row: Row<T>;
  gutterSize?: number;
  onItemClick?: (item: Row<T>) => void;
  style?: React.CSSProperties;
}) {
  const primary = item.getVisibleCells().find((cell) => cell.column.isPrimary);
  const cover = item
    .getVisibleCells()
    .find((cell) => cell.column.kind === 'cover');
  const uid = item.getVisibleCells().find((cell) => cell.column.kind === 'uid');

  return (
    <StyledItem
      key={item.id}
      onClick={(e) => {
        e.preventDefault();
        onItemClick(item);
      }}
      style={{
        ...style,
        minWidth: `calc(100% - ${gutterSize * 2}px)`,
        left: style.left + gutterSize,
        // top: style.top + gutterSize,
        top: 0,
        transform: `translate3d(0px,${style.top}px, 0px)`,
        willChange: 'transform',
        height: style.height,
      }}
      tw="top-0 flex items-center w-auto"
    >
      {uid && (
        <div tw="truncate px-3 xl:px-4 h-full border-r">
          {flexRender(uid.column.columnDef.cell, uid.getContext())}
        </div>
      )}
      {/* {cover && (
        <div
          style={{
            width: cover.width || '138px',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundImage: `url(${valueRenderer(item, cover)})`,
            height: '100%',
            flexShrink: 0,
          }}
        />
      )} */}
      <div tw="flex flex-col">
        {primary && (
          <div
            className={`mb-2${cover ? ' px-3 px-xl-4' : ''}`}
            style={{
              maxWidth: `calc('100vw - 100px')`,
              fontWeight: 500,
            }}
            tw="sticky width[fit-content] -left-6"
          >
            {flexRender(primary.column.columnDef.cell, primary.getContext())}
          </div>
        )}
        <div tw="flex items-center">
          {item
            .getVisibleCells()
            .filter(
              (cell) =>
                cell.column.columnDef.meta?.kind !== 'uid' &&
                !cell.column.isPrivate &&
                !cell.column.isPrimary,
            )
            .map((cell) => (
              <div
                key={`${item.id}-${cell.column.id}-value`}
                tw="truncate px-3 xl:px-4 flex"
                style={{
                  width: cell.column.getSize() || '150px',
                  minWidth: cell.column.columnDef.minSize || 'auto',
                  maxWidth: cell.column.columnDef.maxSize || 'auto',
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
        </div>
      </div>
    </StyledItem>
  );
}
