import React from 'react';

export default function Header({ headerGroups, gutterSize = 16, style = {} }) {
  const cover = null;
  return (
    <div
      style={{
        ...style,
        minWidth: '100%',
        width: 'fit-content',
        height: style.height,
        borderBottom: '1px solid #f2f2f3',
        fontSize: '14px',
        fontWeight: 500,
        padding: '1rem 0',
      }}
      className="sticky-top d-flex align-items-center bg-white"
    >
      {cover && (
        <div
          className="text-truncate d-flex align-items-center data-list-cover-header px-3 px-xl-4"
          style={{
            width: cover.width || '138px',
            backgroundColor: 'transparent',
            height: '100%',
            flexShrink: 0,
          }}
        >
          <span className="mr-2" style={{ opacity: 0.4 }}>
            {cover.icon}
          </span>
          Cover
        </div>
      )}
      <div className="d-flex flex-column">
        <div className="d-flex">
          {headerGroups.map((headerGroup) => (
            <>
              {headerGroup.headers
                .filter(
                  (column) =>
                    column.kind !== 'cover' &&
                    column.kind !== 'avatar' &&
                    !column.isPrimary,
                )
                .map(({ id, width, minWidth, maxWidth, name, icon }) => {
                  return (
                    <div
                      key={`${id}-label`}
                      className="text-truncate data-list-header px-3 px-xl-4"
                      style={{
                        width: width || '150px',
                        minWidth: minWidth || 'auto',
                        maxWidth: maxWidth || 'auto',
                      }}
                    >
                      {icon && (
                        <span className="mr-2" style={{ opacity: 0.4 }}>
                          {icon}
                        </span>
                      )}
                      {name}
                    </div>
                  );
                })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
