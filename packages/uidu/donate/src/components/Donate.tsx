import loadable from '@loadable/component';
import Contact from '@uidu/contact';
import { Shell, ShellStep } from '@uidu/widgets';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router';
import { DonateProps } from '../types';

const Confirmation = loadable(() => import('./steps/Confirmation'));
const Donation = loadable(() => import('./steps/Donation'));
const Pay = loadable(() => import('./steps/Pay'));
const Preferences = loadable(() => import('./steps/Preferences'));
const Subscribe = loadable(() => import('./steps/Subscribe'));

export default function Donate({
  donationCampaign,
  donation,
  currentContact,
  providers,
  baseUrl = '/',
  createDonation,
  updateDonation,
  updateCurrentContact,
  embedded,
  ...rest
}: DonateProps) {
  const history = useHistory();
  const match = useRouteMatch();

  console.log(donation);

  const steps: ShellStep[] = [
    {
      relativePath: 'donation',
      name: (
        <FormattedMessage
          defaultMessage="Funding option"
          id="guidu.donate.donation.name"
        />
      ),
      component: () => (
        <Donation
          donation={donation}
          donationCampaign={donationCampaign}
          providers={providers}
          handleSubmit={async (model) => {
            return createDonation(model).then(() => {
              history.push(`${match.url}/preferences`);
            });
          }}
        />
      ),
      nextStepRelativePath: 'preferences',
      isCompleted: !!donation?.amount,
    },
  ];

  steps.push({
    relativePath: 'preferences',
    name: (
      <FormattedMessage
        defaultMessage="Customize"
        id="guidu.donate.preferences.title"
      />
    ),
    component: () => (
      <Preferences
        currentContact={currentContact}
        donation={donation}
        handleSubmit={async (model) =>
          updateDonation(model).then(() => {
            history.push(`${match.url}/contact`);
          })
        }
      />
    ),
    nextStepRelativePath: 'contact',
  });

  steps.push({
    relativePath: 'contact',
    name: (
      <FormattedMessage
        defaultMessage="Contact info"
        id="guidu.donate.donation.contact"
      />
    ),
    component: () => (
      <Contact
        scope="primary"
        contact={currentContact}
        handleSubmit={async (model) => {
          return updateCurrentContact(model).then(() =>
            history.push(`${match.url}/payments`),
          );
        }}
      />
    ),
    nextStepRelativePath: 'payments',
    isDisabled: !donation.amount,
    isCompleted: !!currentContact?.id,
  });

  steps.push({
    relativePath: 'payments',
    name: (
      <FormattedMessage
        defaultMessage="Payment info"
        id="guidu.donate.donation.payment"
      />
    ),
    component: () => {
      if (donation.amount) {
        return (
          <>
            {donation.subscriptionItem ? (
              <Subscribe
                {...rest}
                donationCampaign={donationCampaign}
                donation={donation}
                onSuccess={() => history.push(`${match.url}/done`)}
              />
            ) : (
              <Pay
                {...rest}
                donationCampaign={donationCampaign}
                provider={{ id: 'card' }}
                donation={donation}
                onSuccess={() => history.push(`${match.url}/done`)}
              />
            )}
          </>
        );
      }
      return null;
    },
    isDisabled: !donation.amount,
    nextStepRelativePath: 'done',
  });

  steps.push({
    relativePath: 'done',
    name: (
      <FormattedMessage
        defaultMessage="Done!"
        id="guidu.donate.donation.done"
      />
    ),
    component: () => <Confirmation {...rest} donation={donation} />,
    isDisabled: !donation.amount,
  });

  return (
    <Shell
      name={donationCampaign.name}
      steps={steps}
      baseUrl={baseUrl}
      scope="primary"
      embedded={embedded}
    />
  );
}
