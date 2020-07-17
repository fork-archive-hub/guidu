import cubejs from '@cubejs-client/core';
import { CubeProvider, QueryBuilder } from '@cubejs-client/react';
import Accordion from '@uidu/accordion';
import { renderDashlet } from '@uidu/dashlets';
import Form, { FormSubmit } from '@uidu/form';
import Select from '@uidu/select';
import React, { useRef, useState } from 'react';
import { DashletsFormProps } from '../types';
import { chartTypeToDashletKinds } from '../utils';
import Legend from './Legend';
import Series from './Series';

export default function DashletsForm({
  vizState,
  setVizState,
  cubejsToken = '',
  cubejsOptions = {
    apiUrl: 'http://localhost:4000/cubejs-api/v1',
  },
  chartExtra,
}: DashletsFormProps) {
  const cubejsApi = useRef(cubejs(cubejsToken, cubejsOptions));

  const [config, setConfig] = useState({});
  const [kind, setKind] = useState('XY');

  return (
    <CubeProvider cubejsApi={cubejsApi.current}>
      <QueryBuilder
        vizState={vizState}
        setVizState={setVizState}
        cubejsApi={cubejsApi.current}
        wrapWithQueryRenderer={false}
        // stateChangeHeuristics={stateChangeHeuristics}
        render={({
          measures,
          availableMeasures,
          updateMeasures,
          dimensions,
          availableDimensions,
          updateDimensions,
          segments,
          availableSegments,
          updateSegments,
          filters,
          updateFilters,
          timeDimensions,
          availableTimeDimensions,
          updateTimeDimensions,
          isQueryPresent,
          chartType,
          updateChartType,
          validatedQuery,
        }) => {
          return (
            <Form
              handleSubmit={async (model) => console.log(model)}
              footerRenderer={({ canSubmit, loading }) => (
                <div className="p-3 border-top d-flex justify-content-end">
                  <FormSubmit
                    canSubmit={canSubmit}
                    loading={loading}
                    label="Confirm"
                  />
                </div>
              )}
            >
              <div>
                <div className="p-3 border-bottom d-flex">
                  <Select
                    rowClassName="flex-grow-1 mr-3"
                    label="Measures"
                    name="measures"
                    options={availableMeasures.map((measure) => ({
                      id: measure.name,
                      name: measure.title,
                    }))}
                    onChange={(name, value, { option }) => {
                      updateMeasures.add({
                        name: option[0].id,
                        shortTitle: option[0].name,
                        title: option[0].name,
                      });
                    }}
                    multiple
                  />
                  <Select
                    rowClassName="flex-grow-1 mr-3"
                    label="Dimensions"
                    name="dimensions"
                    options={availableDimensions.map((measure) => ({
                      id: measure.name,
                      name: measure.title,
                    }))}
                    onChange={(name, value, { option }) => {
                      updateDimensions.add({
                        name: option[0].id,
                        shortTitle: option[0].name,
                        title: option[0].name,
                      });
                    }}
                    multiple
                  />
                  <Select
                    rowClassName="flex-grow-1 mr-3"
                    label="Time Dimensions"
                    name="timeDimensions"
                    options={availableTimeDimensions.map((measure) => ({
                      id: measure.name,
                      name: measure.title,
                    }))}
                    onChange={(name, value, { option }) => {
                      updateTimeDimensions.add({
                        name: option[0].id,
                        shortTitle: option[0].name,
                        title: option[0].name,
                      });
                    }}
                    multiple
                  />
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-8 py-3" style={{ height: 400 }}>
                      {!!isQueryPresent &&
                        renderDashlet({
                          kind,
                          query: validatedQuery,
                          config,
                          // config: {
                          // series: measures.map((measure) => {
                          //   return {
                          //     type:
                          //       chartType === 'table'
                          //         ? 'PieSeries'
                          //         : 'LineSeries',
                          //     dataFields: {
                          //       valueY: measure.name,
                          //       dateX: 'category',
                          //     },
                          //     strokeWidth: 1,
                          //     fillOpacity: 0.6,
                          //     tensionX: 0.8,
                          //     name: measure.title,
                          //     tooltipText: `{dateX}\n[bold]{valueY}[/]`,
                          //   };
                          // }),
                          // },
                        })}
                    </div>
                    <div className="col-lg-4 py-3 border-left">
                      <Select
                        label="Chart kind"
                        name="kind"
                        options={chartTypeToDashletKinds(
                          chartType,
                        ).map((k) => ({ id: k, name: k }))}
                        onChange={(name, value) => setKind(value)}
                      />
                      <Accordion
                        key="accordion"
                        allowMultipleExpanded={false}
                        // allowZeroExpanded={true}
                        items={[
                          {
                            uuid: 'appearance',
                            title: () => 'Apperarance',
                            body: (
                              <>
                                <p>Padding</p>
                              </>
                            ),
                          },
                          {
                            uuid: 'axes',
                            title: () => 'Axes',
                            body: (
                              <>
                                <p>Padding</p>
                              </>
                            ),
                          },
                          {
                            uuid: 'series',
                            title: () => 'Series',
                            body: (
                              <>
                                <Series measures={measures} />
                              </>
                            ),
                          },
                          {
                            uuid: 'legend',
                            title: () => 'Legend',
                            body: (
                              <>
                                <Legend config={config} setConfig={setConfig} />
                              </>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      />
    </CubeProvider>
  );
}
