import { ShellBody, ShellHeader } from '@uidu/shell';
import React, { Component, Fragment } from 'react';
import 'react-big-calendar/lib/sass/styles.scss';
import DashboardManager from '../';
import { fetchDonations } from '../examples-utils';

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      loaded: false,
    };
  }

  componentDidMount() {
    fetchDonations().then(response =>
      this.setState({ rowData: response, loaded: true }),
    );
  }

  render() {
    const { rowData, loaded } = this.state;
    return (
      <DashboardManager rowData={rowData} defaultTimeFrame="1Y">
        {({ renderControls, renderBlocks }) => (
          <Fragment>
            <ShellHeader className="border-bottom">
              {renderControls({
                availableViews: ['table', 'gallery', 'calendar', 'list'],
              })}
            </ShellHeader>
            <ShellBody scrollable>
              <div className="container px-0">
                <div className="row">
                  <div className="col-12">
                    {renderBlocks({
                      loaded,
                      blocks: [
                        {
                          kind: 'Area',
                          x: 0,
                          areas: [
                            {
                              label: 'Raccolta',
                              name: 'donationsAmount',
                              rollup: ['sum', 'amount'],
                              formatter: 'currency',
                            },
                            {
                              label: 'Donazioni',
                              name: 'donationsCount',
                              rollup: ['count', 'id'],
                              formatter: 'integer',
                            },
                            {
                              label: 'Donatori',
                              name: 'donorsCount',
                              rollup: ['count', 'contact.id'],
                              formatter: 'integer',
                            },
                            {
                              label: 'Media donazione',
                              name: 'donationsAverage',
                              rollup: ['mean', 'amount'],
                              formatter: 'currency',
                            },
                          ],
                        },
                        {
                          kind: 'Counter',
                          label: 'counter',
                          x: 0,
                          rollup: ['sum', 'amount'],
                          formatter: 'currency',
                        },
                        {
                          kind: 'Counter',
                          label: 'counter',
                          x: 1,
                          rollup: ['count', 'id'],
                          formatter: 'integer',
                        },
                        {
                          kind: 'Counter',
                          label: 'counter',
                          x: 2,
                          rollup: ['count', 'contact.id'],
                          formatter: 'integer',
                        },
                        {
                          kind: 'Counter',
                          label: 'counter',
                          x: 3,
                          rollup: ['mean', 'amount'],
                          formatter: 'currency',
                        },
                        {
                          kind: 'Pie',
                          label: 'Metodo di pagamento',
                          groupBy: 'paymentMethod',
                          rollup: ['count', 'id'],
                          x: 0,
                        },
                        {
                          label: 'Top campaigns',
                          kind: 'List',
                          x: 2,
                          groupBy: 'donationCampaignId',
                          rollup: ['sum', 'amount'],
                          formatter: 'currency',
                        },
                        {
                          label: 'Average donations',
                          kind: 'List',
                          x: 0,
                          groupBy: 'donationCampaignId',
                          rollup: ['mean', 'amount'],
                          formatter: 'currency',
                        },
                        {
                          label: 'Top donors',
                          kind: 'List',
                          x: 0,
                          groupBy: 'contact.id',
                          rollup: ['sum', 'amount'],
                          formatter: 'currency',
                        },
                        {
                          label: 'Top donations',
                          kind: 'List',
                          x: 0,
                          rollup: ['max', 'amount'],
                          formatter: 'currency',
                        },
                        {
                          kind: 'Bar',
                          x: 2,
                          groupBy: 'donationCampaignId',
                          bars: [
                            {
                              label: 'Raccolta',
                              name: 'donationsAmount',
                              rollup: ['sum', 'amount'],
                              formatter: 'currency',
                              xAxisId: 'right',
                            },
                            {
                              label: 'Donazioni',
                              name: 'donationsCount',
                              rollup: ['count', 'id'],
                              formatter: 'integer',
                            },
                            {
                              label: 'Donatori',
                              name: 'donorsCount',
                              rollup: ['count', 'contact.id'],
                              formatter: 'integer',
                            },
                            {
                              label: 'Media donazione',
                              name: 'donationsAverage',
                              rollup: ['mean', 'amount'],
                              formatter: 'currency',
                              xAxisId: 'right',
                            },
                          ],
                        },
                        {
                          kind: 'Radial',
                          rollup: ['count', 'id'],
                          bins: [
                            [0, 10000],
                            [10001, 20000],
                            [20001, 30000],
                            [30001],
                          ],
                          x: 0,
                        },
                        {
                          kind: 'Funnel',
                          x: 0,
                        },
                        {
                          kind: 'Geo',
                          x: 0,
                          rollup: ['count', 'id'],
                        },
                      ],
                    })}
                  </div>
                </div>
              </div>
            </ShellBody>
          </Fragment>
        )}
      </DashboardManager>
    );
  }
}
