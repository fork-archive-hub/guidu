/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { useVirtual } from 'react-virtual';
import styled, { css } from 'styled-components';
import Footer from './Footer';
import Resizer from './Resizer';

const Td = styled.div<{ height: number; pinned?: boolean }>`
  padding-left: 1rem;
  padding-right: 1rem;
  white-space: nowrap;
  height: ${({ height }) => `${height}px`};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f3;
  border-right: 1px solid transparent;
  background: #fff;

  ${({ pinned }) =>
    pinned
      ? css`
          position: sticky;
          left: 0;
          z-index: 1;
          background: #fff;
          border-right: 1px solid #f2f2f3;
        `
      : null};
`;

const Th = styled.div<{ height: number }>`
  padding-left: 1rem;
  padding-right: 1rem;
  white-space: nowrap;
  height: ${({ height }) => `${height - 8}px`};
  font-size: 0.9rem;
  border-bottom: 1px solid #f2f2f3;
  border-right: 1px solid #f2f2f3;
  display: flex;
  align-items: center;
  font-weight: 500;
  position: relative;
  background: #fff;
`;

const Table = ({
  theme = 'uidu',
  setAggregation,
  columnDefs,
  rowData,
  onAddField = () => {},
  rowHeight = 32,
  groupRowHeightIncrementRatio = 1.2,
  tableInstance,
  ...otherProps
}) => {
  const [scrolled, setScrolled] = useState({ left: 0, top: 0 });

  let className = '';
  if (scrolled.left > 0) {
    className += ' ag-scrolled-left';
  }
  if (scrolled.top > 0) {
    className += ' ag-scrolled-top';
  }

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  console.log(page);

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <Td
                {...cell.getCellProps()}
                height={rowHeight}
                className={
                  cell.column.isSorted ? 'ag-cell-sorter-active' : null
                }
              >
                {cell.isGrouped ? (
                  // If it's a grouped cell, add an expander and row count
                  <>
                    <span {...row.getToggleRowExpandedProps()}>
                      {row.isExpanded ? '👇' : '👉'}
                    </span>{' '}
                    {cell.render('Cell')} ({row.subRows.length})
                  </>
                ) : cell.isAggregated ? (
                  // If the cell is aggregated, use the Aggregated
                  // renderer for cell
                  cell.render('Aggregated')
                ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                  // Otherwise, just render the regular cell
                  cell.render('Cell')
                )}
              </Td>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows, rowHeight],
  );

  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: page.length,
    parentRef,
    overscan: 5,
    estimateSize: React.useCallback((i) => rowHeight, []),
  });

  return (
    <div className={`ag-theme-${theme} h-100${className}`} role="table">
      <div
        {...getTableBodyProps()}
        ref={parentRef}
        className="List"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
      >
        <div
          className="header"
          style={{
            position: 'sticky',
            top: 0,
            background: 'white',
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            zIndex: 40,
          }}
        >
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps()}
                  className={column.isSorted ? 'ag-cell-sorter-active' : null}
                  height={rowHeight}
                  pinned={index === 0}
                  style={{
                    width: column.width,
                    maxWidth: column.maxWidth,
                    minWidth: column.minWidth,
                    ...(column.pinned
                      ? {
                          position: 'sticky',
                          left: index === 0 ? 0 : '56px',
                          zIndex: 2,
                          background: '#fff',
                          borderRight: '1px solid #f2f2f3',
                        }
                      : {}),
                  }}
                >
                  {column.render('Header')}
                  {!!column.getResizerProps && <Resizer column={column} />}
                </Th>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            minHeight: `calc(100% - ${rowHeight * 2 - 8 - 16}px)`,
            width: '100%',
            position: 'relative',
            background: 'white',
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = page[virtualRow.index];
            prepareRow(row);
            return (
              <div
                key={virtualRow.index}
                {...row.getRowProps({
                  style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    // width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  },
                })}
                className="tr"
              >
                {row.cells.map((cell, index) => (
                  <Td
                    {...cell.getCellProps({
                      style: {
                        left: index === 0 ? 0 : '56px',
                        ...cell.column.cellStyle,
                      },
                    })}
                    pinned={cell.column.pinned}
                    height={rowHeight}
                    className={
                      cell.column.isSorted ? 'ag-cell-sorter-active' : null
                    }
                  >
                    <div className="text-truncate w-100">
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                          {cell.render('Cell')} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated', {
                          setAggregation,
                        })
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell')
                      )}
                    </div>
                  </Td>
                ))}
              </div>
            );
          })}
        </div>
        <Footer footerGroups={footerGroups} rowHeight={rowHeight} />
        <div className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
        </div>
      </div>
    </div>
  );
};

export default Table;
