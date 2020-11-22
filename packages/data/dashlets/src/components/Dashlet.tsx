import { useCubeQuery } from '@cubejs-client/react';
import { Groupers } from '@uidu/dashlet-controls';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import DashletHeader from './DashletHeader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    style={{
      width: '100%',
      height: '100%',
    }}
    backgroundColor="#F5F7F8"
    backgroundOpacity={1}
    foregroundColor="#F5F7F8"
    foregroundOpacity={0.6}
    {...props}
  >
    <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
  </ContentLoader>
);

const TimeDimensionControls = styled.div`
  position: absolute;
  right: 1rem;
`;

const DateRanges = [
  { name: undefined, title: 'All time' },
  { name: 'Today', title: 'Today' },
  { name: 'Yesterday', title: 'Yesterday' },
  { name: 'This week', title: 'This week' },
  { name: 'This month', title: 'This month' },
  { name: 'This quarter', title: 'This quarter' },
  { name: 'This year', title: 'This year' },
  { name: 'Last 7 days', title: 'Last 7 days' },
  { name: 'Last 30 days', title: 'Last 30 days' },
  { name: 'Last week', title: 'Last week' },
  { name: 'Last month', title: 'Last month' },
  { name: 'Last quarter', title: 'Last quarter' },
  { name: 'Last year', title: 'Last year' },
];

const availableGroupers: Array<Groupers> = [
  { name: 'day', title: 'Giornaliero' },
  { name: 'week', title: 'Settimanale' },
  { name: 'month', title: 'Mensile' },
  { name: 'year', title: 'Annuale' },
];

export default function Dashlet({
  dashlet,
  component: DashletContent,
  showHeader = true,
  isCard = true,
  rowData,
  ...rest
}: any) {
  // const [query, setQuery] = useState(
  //   dashlet.query || {
  //     measures: ['Donations.amount'],
  //     timeDimensions: [
  //       {
  //         dimension: 'Donations.createdAt',
  //         granularity: 'month',
  //       },
  //     ],
  //     filters: [],
  //   },
  // );

  const { resultSet, isLoading, error } = useCubeQuery(dashlet.query);

  if (isLoading) {
    return (
      <div className={`h-100${isCard ? ' card' : ' d-flex flex-column'}`}>
        <MyLoader />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div
        className={`h-100${
          isCard ? ' card' : ' d-flex flex-column'
        } align-items-center justify-content-center`}
      >
        <FormattedMessage
          defaultMessage="Error loading {name}"
          id="guidu.dashlets.loading.error"
          values={{ name: dashlet.label }}
        />
      </div>
    );
  }

  return (
    <div className={`h-100${isCard ? ' card' : ' d-flex flex-column'}`}>
      {showHeader && (
        <DashletHeader
          name={dashlet.label}
          description={dashlet.description}
          isCard={isCard}
        >
          {/* {false && (
            <TimeDimensionControls>
              {timeDimension && (
                <TimeFrame
                  activeTimeFrame={timeDimension.dateRange}
                  onChange={(name) => {
                    updateTimeDimensions.update(timeDimension, {
                      ...timeDimension,
                      dateRange: name,
                    });
                  }}
                  timeframes={DateRanges}
                />
              )}
              {timeDimension && (
                <TimeFrameGrouper
                  groupers={timeDimension.dimension.granularities}
                  activeGrouper={timeDimension.granularity}
                  onChange={(name) => {
                    updateTimeDimensions.update(timeDimension, {
                      ...timeDimension,
                      granularity: name,
                    });
                  }}
                />
              )}
            </TimeDimensionControls>
          )} */}
        </DashletHeader>
      )}
      <DashletContent {...rest} {...dashlet} resultSet={resultSet} />
    </div>
  );
}
