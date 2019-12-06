import loadable from '@loadable/component';
import {
  CalendarToolbar,
  Filterer,
  // Finder,
  Grouper,
  Sorter,
  Viewer,
} from '@uidu/data-controls';
import { ShellBodyWithSpinner } from '@uidu/shell';
import Spinner from '@uidu/spinner';
import Table from '@uidu/table';
import moment from 'moment';
import React, { PureComponent } from 'react';
import Media from 'react-media';
import { DataManagerProps } from '../types';
import { initializeDataView } from '../utils';
import DataCard from './DataCard';

const LoadableBoard = (loadable as any).lib(() => import('@uidu/board'));
const LoadableCalendar = (loadable as any).lib(() => import('@uidu/calendar'));
const LoadableGallery = (loadable as any).lib(() => import('@uidu/gallery'));
const LoadableList = (loadable as any).lib(() => import('@uidu/list'));

const Column = React.forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref}>
    <div className="" {...props} />
  </div>
));

const ColumnHeader = ({ title, items, ...rest }) => {
  return (
    <div
      className="card-header px-0 bg-transparent border-bottom-0 d-flex align-items-center justify-content-between"
      {...rest}
    >
      <div>
        <span className="mr-2">{title}</span>
        {/* <Badge>{items.length}</Badge> */}
      </div>
      {/* <div className="btn-group">
        <button className="btn btn-sm p-2">
          <Plus size={16} />
        </button>
        <button className="btn btn-sm p-2">
          <MoreHorizontal size={16} />
        </button>
      </div> */}
    </div>
  );
};

const Item = ({ item, provided, ...rest }) => {
  const { history } = item;
  return (
    <a
      // to={item.data.id}
      onClick={() => history.push(`/apps/calls/proposals/${item.data.id}`)}
      className="card bg-white mb-2"
      ref={provided.innerRef}
      {...rest}
    >
      <DataCard item={item} {...rest} />
    </a>
  );
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const defaultAvailableControls = {
  calendarToolbar: {
    visible: true,
    props: {},
  },
  finder: {
    visible: true,
    props: {},
  },
  viewer: {
    visible: true,
    props: {},
  },
  grouper: {
    visibile: true,
    props: {},
  },
  filterer: {
    visible: true,
    props: {},
  },
  sorter: {
    visible: true,
    props: {},
  },
  more: {
    visible: true,
    props: {},
  },
};

export default class DataManager extends PureComponent<DataManagerProps, any> {
  static whyDidYouRender = true;

  static defaultProps = {
    onGridReady: _params => {},
    onFirstDataRendered: _params => {},
  };

  /*
    we should split columnDefs and data view fields.
    ColumnDefs are static list of all possible columns for all the views
    DataViews contain info about how to render fields (eg: hidden fields), pass sort models and view configurations.

    ==> Ideally we control DataView outside DataManager, eg: switch DataView from sidebar navigation, reloads the query to backend to fecth dataview details, and re-renders DataManager.

    But, how do we handle local updates?
    A. we dont': we pass everything on parent component, that manages DataView State auto-saving it. In this case we rely only on props and adjust views on render (Functional component)
    B. we keep track of local state for toggler, sorters, filters etc., we derive state from props and we autosave every 5 seconds (or on change)
  */

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: null,
      sorters: props.currentView.sorters || [],
      filterModel: props.currentView.filterModel || {},
      groupers: props.currentView.groupers || [],
      rowHeight: 64,
      columnCount: 3,
    };
  }

  private grid = React.createRef();
  private gridApi = null;
  private gridColumnApi = null;

  onGridReady = params => {
    const { api, columnApi } = params;
    const { onGridReady, currentView } = this.props;
    this.gridApi = api;
    this.gridColumnApi = columnApi;

    console.log('onGridReady');

    const newState = initializeDataView({
      currentView,
      gridApi: api,
      gridColumnApi: columnApi,
    });

    this.setState(newState, () => {
      onGridReady(params);
      this.resizeTable();
    });
  };

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   console.log('receivedProps');
  //   if (nextProps.currentView.id !== this.props.currentView.id) {
  //     const newState = initializeDataView({
  //       currentView: nextProps.currentView,
  //       gridApi: this.gridApi,
  //       gridColumnApi: this.gridColumnApi,
  //     });
  //     this.setState(newState);
  //   }
  // }

  componentWillUnmount() {
    console.log('unmount');
    // window.removeEventListener('resize', this.resizeTableOnWindowResize);
    this.gridApi && this.gridApi.destroy();
  }

  // resizeTableOnWindowResize = () => {
  //   setTimeout(() => {
  //     this.gridApi.sizeColumnsToFit();
  //   });
  // };

  resizeTable = () => {
    const { currentView } = this.props;
    const { gridApi, gridColumnApi } = this;
    if (currentView.kind === 'table') {
      gridColumnApi.autoSizeAllColumns();
      // window.addEventListener('resize', this.resizeTableOnWindowResize);
      // gridApi.sizeColumnsToFit();
    }
  };

  filterVisibleColumnDefs = () => {
    const { currentView, columnDefs } = this.props;
    return columnDefs
      .map(column => ({
        ...column,
        hide: !currentView.fields.includes(column.colId),
      }))
      .sort(
        (a, b) =>
          currentView.fields.indexOf(a.colId) -
          currentView.fields.indexOf(b.colId),
      );
  };

  toggleColumn = (name, active) => {
    this.gridColumnApi.setColumnVisible(name, active);
    this.setState(
      {
        columns: this.state.columns.map(column => {
          if (column.colId === name) {
            return {
              ...column,
              hide: !active,
            };
          }
          return column;
        }),
      },
      () => {
        this.resizeTable();
      },
    );
  };

  moveColumn = ({ name, oldIndex, newIndex }) => {
    this.gridColumnApi.moveColumn(name, newIndex);
    const columns = reorder(this.state.columns, oldIndex, newIndex);
    this.setState({
      columns,
    });
  };

  addGrouper = grouper => {
    this.gridApi.showLoadingOverlay();
    // this.gridColumnApi.setColumnVisible(grouper.colId, false);
    this.setState(
      prevState => ({
        groupers: [...prevState.groupers, grouper],
      }),
      () => {
        this.updateRowGrouping();
      },
    );
  };

  removeGrouper = ({ colId }) => {
    this.gridApi.showLoadingOverlay();
    this.setState(
      prevState => ({
        groupers: prevState.groupers.filter(grouper => grouper.colId !== colId),
      }),
      () => {
        this.updateRowGrouping();
      },
    );
  };

  updateRowGrouping = () => {
    this.gridColumnApi.setRowGroupColumns(
      this.state.groupers.map(g => g.colId),
    );

    setTimeout(() => {
      this.gridApi.refreshCells({ force: true });
      this.gridApi.hideOverlay();
    }, 300);
  };

  addFilter = filter => {
    this.setState(prevState => ({
      filterModel: {
        ...prevState.filterModel,
        [filter.colId]: {},
      },
    }));
  };

  removeFilter = filter => {
    this.setState(
      prevState => ({
        filterModel: Object.keys(prevState.filterModel).reduce(
          (object, key) => {
            if (key !== filter.colId) {
              object[key] = prevState.filterModel[key];
            }
            return object;
          },
          {},
        ),
      }),
      () => {
        this.gridApi.setFilterModel(this.state.filterModel);
        this.gridApi.onFilterChanged();
      },
    );
  };

  setFilterModel = filters => {
    this.setState(
      prevState => ({
        filterModel: filters.reduce((res, item) => {
          return {
            ...res,
            [item.colId]: {
              type: 'contains',
              ...item,
            },
          };
        }, prevState.filterModel),
      }),
      () => {
        this.gridApi.setFilterModel(this.state.filterModel);
        this.gridApi.onFilterChanged();
      },
    );
  };

  onFilterChanged = ({ api }) => {
    const filterModel = api.getFilterModel();
    this.setState(
      {
        data: api.getModel().rowsToDisplay,
        // filterModel,
      },
      () => {
        api.refreshCells({ force: true });
      },
    );
  };

  onSortChanged = ({ api }) => {
    const sortModel = api.getSortModel();
    this.setState(
      {
        data: api.getModel().rowsToDisplay,
        sorters: sortModel,
      },
      () => {
        api.refreshCells({ force: true });
      },
    );
  };

  addSorter = sorter => {
    this.setState(
      prevState => ({
        sorters: [...prevState.sorters, sorter],
      }),
      () => {
        this.gridApi.setSortModel(this.state.sorters);
      },
    );
  };

  removeSorter = ({ colId }) => {
    this.setState(
      prevState => ({
        sorters: prevState.sorters.filter(sorter => sorter.colId !== colId),
      }),
      () => {
        this.gridApi.setSortModel(this.state.sorters);
      },
    );
  };

  setSorters = sorters => {
    // this.setState({ sorters });
    this.gridApi.setSortModel(sorters);
  };

  setSearch = e => {
    this.gridApi.setQuickFilter(e.target.value);
  };

  setRowHeight = rowHeight => {
    this.setState(
      {
        rowHeight,
      },
      () => {
        this.gridApi.resetRowHeights();
      },
    );
  };

  setColumnCount = columnCount => {
    this.setState({ columnCount }, () =>
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300),
    );
  };

  renderResponsiveView = ({ mobileView, desktopView }) => {
    return (
      <Media query={{ maxWidth: 768 }}>
        {matches => {
          if (matches) {
            return mobileView;
          }

          return desktopView;
        }}
      </Media>
    );
  };

  renderSidebar = () => {
    const { rowData, onItemClick, currentView } = this.props;
    const { data } = this.state;

    if (!data) {
      return <Spinner />;
    }

    if (currentView.kind === 'calendar') {
      return (
        <>
          <p>List of events</p>
          {data.map(datum => (
            <p>
              {datum.data
                ? `${datum.data.createdAt} - ${datum.data.id}`
                : 'Group'}
            </p>
          ))}
        </>
      );
    }

    if (currentView.kind === 'map') {
      return (
        <>
          <p>List of events</p>
        </>
      );
    }
    return null;
  };

  renderView = ({
    viewProps = {
      board: {},
      calendar: {},
      gallery: {},
      list: {},
      table: {},
    },
  }) => {
    const {
      rowData,
      onItemClick,
      currentView,
      onFirstDataRendered,
      onAddField,
    } = this.props;
    const { data, columns, rowHeight, columnCount, loaded } = this.state;

    if (!rowData) {
      return <ShellBodyWithSpinner />;
    }

    const table = (
      <Table
        rowDoubleClicked={() => null}
        rowSelection="multiple"
        suppressRowClickSelection
        {...viewProps.table}
        // @ts-ignore
        rowHeight={(viewProps.table || {}).rowHeight || rowHeight}
        innerRef={this.grid}
        onGridReady={this.onGridReady}
        onFirstDataRendered={onFirstDataRendered}
        // use columnDefs from props to avoid flickering on toggling/reordering columns
        columnDefs={
          // this.filterVisibleColumnDefs()
          this.props.columnDefs.filter(
            column => column.type !== 'cover' && column.type !== 'avatar',
          )
        }
        loadingOverlayComponentFramework={() => <Spinner />}
        rowData={rowData}
        onAddField={onAddField}
        onSortChanged={this.onSortChanged}
        onFilterChanged={this.onFilterChanged}
        // onColumnVisible={console.log}
        // onColumnMoved={console.log}
        onRowClicked={onItemClick}
        accentedSort
      />
    );

    let desktopView = null;
    let mobileView = null;

    switch (currentView.kind) {
      case 'calendar':
        desktopView = mobileView = (
          <>
            <LoadableCalendar fallback={<ShellBodyWithSpinner />}>
              {({ default: Calendar }) => {
                return (
                  <Calendar
                    {...viewProps.calendar}
                    onItemClick={onItemClick}
                    events={data.map(datum => datum.data)}
                    startAccessor={item => moment(item.createdAt).toDate()}
                    titleAccessor={item => item.email}
                    endAccessor={item =>
                      moment(item.createdAt)
                        .add(3, 'hour')
                        .toDate()
                    }
                    columnDefs={columns}
                    components={{
                      toolbar: CalendarToolbar,
                    }}
                  />
                );
              }}
            </LoadableCalendar>
            <div className="d-none">{table}</div>
          </>
        );
        break;
      case 'board':
        desktopView = mobileView = (
          <>
            <LoadableBoard fallback={<ShellBodyWithSpinner />}>
              {({ default: Board }) => {
                return (
                  <Board
                    {...viewProps.board}
                    columnDefs={columns}
                    initial={rowData.reduce((res, item, index) => {
                      const key = item[currentView.primaryField];
                      if (res[key]) {
                        res[key] = [...res[key], { ...item, content: item.id }];
                      } else {
                        res[key] = [{ ...item, content: item.id }];
                      }
                      return res;
                    }, {})}
                    onItemClick={onItemClick}
                    components={{
                      columnContainer: Column,
                      columnHeader: ColumnHeader,
                      item: Item,
                    }}
                  />
                );
              }}
            </LoadableBoard>
            <div className="d-none">{table}</div>
          </>
        );
        break;
      case 'gallery':
        mobileView = (
          <>
            <LoadableList fallback={<ShellBodyWithSpinner />}>
              {({ default: List }) => (
                <List
                  {...viewProps.list}
                  onItemClick={onItemClick}
                  rowData={data.map(datum => ({
                    data: datum.data,
                  }))}
                  columnDefs={columns}
                />
              )}
            </LoadableList>
            <div className="d-none">{table}</div>
          </>
        );
        desktopView = (
          <>
            <LoadableGallery fallback={<ShellBodyWithSpinner />}>
              {({ default: Gallery }) => (
                <Gallery
                  {...viewProps.gallery}
                  columnCount={columnCount}
                  onItemClick={onItemClick}
                  rowData={data.map(datum => ({
                    data: datum.data,
                  }))}
                  columnDefs={columns}
                />
              )}
            </LoadableGallery>
            <div className="d-none">{table}</div>
          </>
        );
        break;
      default:
        desktopView = table;
        mobileView = (
          <>
            <LoadableList fallback={<ShellBodyWithSpinner />}>
              {({ default: List }) => (
                <List
                  {...viewProps.list}
                  onItemClick={onItemClick}
                  rowData={data.map(datum => ({
                    data: datum.data,
                  }))}
                  columnDefs={columns}
                />
              )}
            </LoadableList>
            <div className="d-none">{table}</div>
          </>
        );
        break;
    }

    return this.renderResponsiveView({
      mobileView,
      desktopView,
    });
  };

  renderControls = ({ controls }) => {
    const { currentView, updateView } = this.props;
    const {
      sorters,
      filterModel,
      groupers,
      columns,
      rowHeight,
      columnCount,
    } = this.state;

    const availableControls = {
      ...defaultAvailableControls,
      ...controls,
    };

    return (
      <>
        {availableControls.viewer.visible && (
          <Viewer
            availableControls={availableControls}
            currentView={currentView}
            updateView={updateView}
            columnDefs={columns.filter(
              column => column.type !== 'cover' && column.type !== 'avatar',
            )}
            addGrouper={this.addGrouper}
            removeGrouper={this.removeGrouper}
            groupers={groupers}
            onToggle={this.toggleColumn}
            onDragEnd={this.moveColumn}
            onResize={this.setRowHeight}
            rowHeight={rowHeight}
            onDownload={() => this.gridApi.exportDataAsCsv()}
            columnCount={columnCount}
            onSetColumnCount={this.setColumnCount}
            actions={availableControls.more.actions}
          />
        )}
        <div className="d-flex align-items-center">
          {currentView.kind === 'calendar' &&
            availableControls.calendarToolbar.visible && (
              <div
                id="calendar-toolbar"
                className="d-flex align-items-center mr-2"
              />
            )}
          {availableControls.filterer.visible && (
            <Filterer
              columnDefs={columns.filter(
                column => column.type !== 'cover' && column.type !== 'avatar',
              )}
              onChange={this.setFilterModel}
              addFilter={this.addFilter}
              removeFilter={this.removeFilter}
              filterModel={filterModel}
              {...availableControls.filterer.props}
            />
          )}
          {availableControls.sorter.visible && (
            <Sorter
              columnDefs={columns.filter(
                column => column.type !== 'cover' && column.type !== 'avatar',
              )}
              onChange={this.setSorters}
              addSorter={this.addSorter}
              removeSorter={this.removeSorter}
              sorters={sorters}
              {...availableControls.sorter.props}
            />
          )}
          {currentView.kind === 'table' &&
            availableControls.grouper.visible && (
              <Grouper
                columnDefs={columns.filter(
                  column => column.type !== 'cover' && column.type !== 'avatar',
                )}
                addGrouper={this.addGrouper}
                removeGrouper={this.removeGrouper}
                groupers={groupers}
                {...availableControls.sorter.props}
              />
            )}
          {/* {availableControls.finder.visible && (
            <Finder
              onChange={this.setSearch}
              {...availableControls.finder.props}
            />
          )} */}
        </div>
      </>
    );
  };

  render() {
    const { children } = this.props;

    return (children as any)({
      renderControls: this.renderControls,
      renderView: this.renderView,
      renderSidebar: this.renderSidebar,
    });
  }
}
