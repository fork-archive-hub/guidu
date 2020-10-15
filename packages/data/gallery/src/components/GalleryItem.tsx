import React from 'react';
import Item from './Item';

export default function GalleryItem({
  item,
  columnIndex,
  rowIndex,
  style,
  data,
}) {
  const {
    items,
    gutterSize,
    onItemClick,
    columnDefs,
    primary,
    cover,
    avatar,
    sorters,
    filterModel,
    tableInstance,
  } = data;
  console.log(item);

  if (!item) {
    return null;
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onItemClick({ data: item });
      }}
      style={{
        // position: 'absolute',
        // cursor: 'pointer',
        // transform: `translateX(${style.left}px) translateY(${
        //   style.top + gutterSize
        // }px)`,
        // width: style.width,
        // height: style.height - gutterSize,
        // transition: 'transform 300ms ease, height 300ms ease',
        // willChange: 'transform',
        margin: '0 1rem',
        flex: '1 0 auto',
      }}
      key={item.id}
    >
      <div
        className="card bg-white"
        style={{
          marginLeft: gutterSize / 2,
          marginRight: gutterSize / 2,
        }}
      >
        <Item
          tableInstance={tableInstance}
          state={tableInstance.state}
          row={item}
          item={item}
          columnDefs={columnDefs}
          primary={primary}
          cover={cover}
          avatar={avatar}
          sorters={sorters}
          filterModel={filterModel}
        />
      </div>
    </div>
  );
}
