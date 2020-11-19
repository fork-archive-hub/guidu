import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import { More } from '@uidu/data-controls';
import { buildColumns } from '@uidu/data-fields';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import Form from '@uidu/form';
import Navigation from '@uidu/navigation';
import Select from '@uidu/select';
import { ShellBody, ShellHeader, ShellMain } from '@uidu/shell';
import React from 'react';
import 'react-big-calendar/lib/sass/styles';
import { PlusCircle } from 'react-feather';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import DataManager from '../';
import '../../calendar/themes/uidu.scss';
import { byName } from '../../data-views/src';
import { availableColumns } from '../../table/examples-utils';
import '../../table/themes/uidu.scss';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  height: '100%',
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const dataViews = [
  {
    id: 0,
    name: 'Tutti i contatti',
    kind: 'table',
    fields: [
      'id',
      'member',
      'amount',
      'country',
      'paymentMethod',
      'firstName',
      'gender',
      'phone',
      'createdAt',
      'addField',
    ],
  },
  {
    id: 1,
    name: 'Bigger donations',
    kind: 'table',
    state: {
      hiddenColumns: ['cover'],
      sortBy: [{ id: 'amount', desc: true }],
      filters: [{ amount: { type: 'greaterThan', filter: 100 } }],
    },
  },
  {
    id: 2,
    name: 'Galleria contatti',
    kind: 'gallery',
    state: {
      hiddenColumns: [
        'displayName',
        'firstName',
        'country',
        'percent',
        'phone',
        'createdAt',
        'updatedAt',
        'paymentMethod',
        'custom-field-1',
      ],
      sortBy: [{ id: 'amount', desc: true }],
    },
  },
  {
    id: 3,
    name: 'Lista contatti',
    kind: 'list',
    fields: ['avatar', 'member', 'amount'],
    sorters: [{ id: 'amount', desc: true }],
  },
  {
    id: 17,
    name: 'Galleria contatti x5',
    preferences: { columnCount: 5 },
    kind: 'gallery',
    fields: ['member', 'amount'],
    sorters: [{ id: 'amount', desc: true }],
  },
  {
    id: 4,
    name: 'Calendario contatti',
    kind: 'calendar',
    primaryField: 'createdAt',
    fields: ['avatar', 'member', 'amount'],
  },
  {
    id: 5,
    name: 'Trello contatti',
    preferences: { primaryField: 'gender' },
    kind: 'board',
    fields: ['avatar', 'member', 'amount'],
  },
  {
    id: 6,
    name: 'Timeline',
    primaryField: 'country',
    kind: 'timeline',
    fields: ['avatar', 'member', 'amount'],
  },
];

const API_URL = 'http://localhost:4000';
const CUBEJS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI3NzI0NTUsImV4cCI6MTYwMjg1ODg1NX0.wbsfpkQUIYev_s83VanR4f1YRWUCmUIST3SHd22o5Ug';
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`,
});

const query = {
  timeDimensions: [
    {
      dimension: 'Donations.createdAt',
      // dateRange: [startDate, finishDate],
      granularity: 'day',
    },
  ],
  // order: {
  //   [`${sorting[0]}`]: sorting[1],
  // },
  dimensions: [
    'Donations.id',
    'Contacts.email',
    'Contacts.displayName',
    'Donations.paymentMethod',
    'Donations.amount',
    'Donations.createdAt',
    'Contacts.createdAt',
    'Contacts.donationsAmount',
  ],
  // filters: [
  //   {
  //     dimension: 'Orders.status',
  //     operator: tabs[statusFilter] !== 'All' ? 'equals' : 'set',
  //     values: [`${tabs[statusFilter].toLowerCase()}`],
  //   },
  //   {
  //     dimension: 'Orders.price',
  //     operator: 'gt',
  //     values: [`${priceFilter[0]}`],
  //   },
  //   {
  //     dimension: 'Orders.price',
  //     operator: 'lt',
  //     values: [`${priceFilter[1]}`],
  //   },
  // ],
};

function CubeExample() {
  const updateView = async (currentView, props) => {
    console.log(currentView);
    console.log(props);
    this.setState({ isAutoSaving: 'in-progress' });
    const dataViews = this.state.dataViews.map((item) => {
      if (item.id !== currentView.id) {
        return item;
      }
      return {
        ...item,
        state: props,
      };
    });
    const updatedView = {
      ...currentView,
      state: props,
    };
    await this.setState({
      dataViews,
      isAutoSaving: 'done',
      currentView: updatedView,
    });
    return updatedView;
  };

  const currentView = dataViews[0];

  return (
    <DataManager
      query={query}
      // isAutoSaving={isAutoSaving}
      key={`table-for-${currentView.id}`}
      onItemClick={console.log}
      columnDefs={buildColumns([
        {
          kind: 'default',
          name: 'Default fields',
          columns: availableColumns,
        },
        {
          kind: 'custom',
          name: 'custom fields',
          columns: [
            {
              kind: 'string',
              id: 'custom-field-1',
              field: 'custom-field-1',
              name: 'custom field 1',
            },
          ],
        },
        {
          kind: 'system',
          name: 'System fields',
          columns: [
            {
              cellProps: {
                onFieldAdd: () => window.alert('add a field'),
              },
              kind: 'addField',
              id: 'addField',
              name: 'Add field',
            },
          ],
        },
      ])}
      // rowData={rowData}
      currentView={currentView}
      updateView={updateView}
      // onGridReady={() => this.setState({ rendered: true })}
    >
      {({ renderControls, renderView, renderSidebar }) => (
        <ShellMain>
          <Navigation
            className="bg-white border-bottom"
            schema={[
              {
                type: 'NavigationHeader',
                text: 'Team',
              },
              {
                type: 'PrimarySection',
                items: [
                  {
                    path: `/`,
                    text: 'Riepilogo',
                    type: 'NavigationItem',
                  },
                  {
                    path: `/orders`,
                    text: 'Ordini',
                    type: 'NavigationItem',
                    isSortable: true,
                  },
                  {
                    path: `/attendances`,
                    text: 'Partecipanti',
                    type: 'NavigationItem',
                  },
                  {
                    path: `/messages`,
                    text: 'Messaggi agli iscritti',
                    type: 'NavigationItem',
                  },
                ],
              },
              {
                type: 'SecondarySection',
                items: [
                  {
                    path: `/`,
                    type: 'InlineComponent',
                    component: () => (
                      <DropdownMenu
                        trigger={
                          <button className="btn btn-primary">
                            Add a view
                          </button>
                        }
                        position="bottom right"
                      >
                        <DropdownItemGroup title="Create new">
                          {[
                            { id: 0, kind: 'table', name: 'Table' },
                            {
                              id: 1,
                              kind: 'gallery',
                              name: 'Griglia',
                            },
                            {
                              id: 2,
                              kind: 'calendar',
                              name: 'Calendario',
                            },
                            { id: 3, kind: 'board', name: 'Kanban' },
                            {
                              id: 4,
                              kind: 'timeline',
                              name: 'Timeline',
                            },
                            {
                              id: 4,
                              kind: 'list',
                              name: 'List',
                            },
                          ].map((view) => (
                            <DropdownItem
                              onClick={() => this.addView(view)}
                              elemBefore={<PlusCircle size={14} />}
                            >
                              Add a {view.kind} view
                            </DropdownItem>
                          ))}
                        </DropdownItemGroup>
                      </DropdownMenu>
                    ),
                    icon: (
                      <img
                        src="https://via.placeholder.com/24x24"
                        className="rounded-circle"
                      />
                    ),
                  },
                ],
              },
            ]}
          />

          <>
            <ShellBody>
              <>
                {/* <ShellSidebar
                            style={{
                              width: '20%',
                              background: '#fff',
                            }}
                            className="border-right"
                          >
                            <SideNavigation schema={schema} />
                          </ShellSidebar> */}
                <ShellMain>
                  <ShellHeader
                    className="px-3 bg-white border-bottom"
                    style={{ zIndex: 30 }}
                  >
                    <div style={{ width: 300 }}>
                      <Form>
                        <Select
                          layout="elementOnly"
                          name="dataView"
                          isClearable={false}
                          value={currentView.id}
                          options={dataViews.map((dataView) => {
                            const d = byName[dataView.kind];
                            const { icon: Icon, color } = d;
                            return {
                              id: dataView.id,
                              name: dataView.name,
                              before: <Icon size={16} color={color} />,
                              ...dataView,
                            };
                          })}
                          onChange={(name, value, { option }) => {
                            this.toggleView(option);
                          }}
                        />
                      </Form>
                    </div>
                    <More />
                    {renderControls({
                      controls: {
                        viewer: {
                          visible: false,
                        },
                        finder: {
                          visible: true,
                        },
                        more: {
                          visible: true,
                          actions: [
                            {
                              name: 'Rename',
                              rename: true,
                            },
                          ],
                        },
                      },
                    })}
                  </ShellHeader>
                  <ShellBody>
                    <ShellMain>
                      {renderView({
                        viewProps: {
                          gallery: {
                            gutterSize: 24,
                          },
                          list: {
                            rowHeight: 104,
                          },
                          board: {},
                          table: {
                            headerHeight: 48,
                            rowHeight: 48,
                          },
                        },
                      })}
                    </ShellMain>
                  </ShellBody>
                </ShellMain>
              </>
            </ShellBody>
          </>
        </ShellMain>
      )}
    </DataManager>
  );
}

export default function Cube() {
  return (
    <CubeProvider cubejsApi={cubejsApi}>
      <IntlProvider locale="en">
        <Router>
          <CubeExample />
        </Router>
      </IntlProvider>
    </CubeProvider>
  );
}