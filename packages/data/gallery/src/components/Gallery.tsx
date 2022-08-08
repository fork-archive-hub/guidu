import { Column, Row } from '@tanstack/react-table';
import { getAvatar, getCover } from '@uidu/data-fields';
import { ScrollableContainer, ShellBody } from '@uidu/shell';
import React, { useCallback, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { GalleryProps } from '../types';
import GalleryItem from './GalleryItem';

const ITEM_HEADER_HEIGHT = 42;
const ITEM_COLUMN_ROW = 64;

function chunkArray<T>(myArray: Row<T>[], chunkSize: number) {
  const results = [] as Row<T>[][];
  const copied = [...myArray];

  while (copied.length) {
    results.push(copied.splice(0, chunkSize));
  }

  return results;
}

export default function Gallery<T>({
  tableInstance,
  onItemClick,
  columnCount = 4,
  gutterSize = 8,
}: GalleryProps<T>) {
  const parentRef = useRef();
  const { getRowModel, getAllFlatColumns } = tableInstance;
  const columns = getAllFlatColumns();
  const { rows } = getRowModel();

  const getGutterSize = useCallback(
    ({ avatar, cover }: { avatar?: Column<T>; cover?: Column<T> }) => {
      if (cover) {
        return cover ? (cover.getSize() * 3) / 2 : 207;
      }

      if (avatar) {
        return 207;
      }

      return 0;
    },
    [],
  );

  const cover = useMemo(() => getCover<T>(columns), [columns]);
  const avatar = useMemo(() => getAvatar<T>(columns), [columns]);

  console.log('renderer');

  const estimateSize = useCallback(
    () =>
      getGutterSize({ avatar, cover }) +
      ITEM_HEADER_HEIGHT +
      ITEM_COLUMN_ROW *
        columns
          .filter((column) => column.getIsVisible())
          .filter(
            (column) =>
              column.columnDef?.meta?.kind !== 'uid' &&
              column.columnDef?.meta?.kind !== 'selection' &&
              !column.isPrivate &&
              !column.isPrimary &&
              column.columnDef?.meta?.kind !== 'addField',
          ).length +
      // ITEM_PADDING +
      gutterSize,
    [gutterSize, columns, avatar, cover, getGutterSize],
  );

  const items: Array<Row<T>[]> = useMemo(
    () => chunkArray<T>(rows, columnCount),
    [rows, columnCount],
  );

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize,
    overscan: 5,
  });

  return (
    <ShellBody>
      <ScrollableContainer ref={parentRef}>
        <div
          tw="w-full relative"
          style={{
            height: `${rowVirtualizer.totalSize}px`,
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const gridRow = items[virtualRow.index];
            if (!gridRow) {
              return null;
            }
            return (
              <div
                key={virtualRow.index}
                tw="w-full absolute top-0 left-0 grid"
                style={{
                  padding: `${gutterSize}px`,
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  gridColumnGap: `${gutterSize}px`,
                  gridRowGap: `${gutterSize}px`,
                  gridTemplateColumns: Array.from({ length: columnCount })
                    .map((i) => `1fr`)
                    .join(' '),
                }}
              >
                {gridRow.map((item) => (
                  <GalleryItem
                    key={item.id}
                    onItemClick={onItemClick}
                    item={item}
                    tableInstance={tableInstance}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </ScrollableContainer>
    </ShellBody>
  );
}
