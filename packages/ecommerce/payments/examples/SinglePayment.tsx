import {
  ScrollableContainer,
  ShellBody,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { PaymentMethods, SinglePayment } from '../src';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

const createPaymentIntent = (amount: number) => {
  return axios
    .post('https://uidu.local:8443/payment-intents', {
      amount,
      description: 'Donation to Organization',
    })
    .then((res) => res.data);
};

export default function Basic({}) {
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [provider, setProvider] = useState('card');
  useEffect(() => {
    createPaymentIntent(3000).then(setPaymentIntent);
    return () => {
      setPaymentIntent(null);
    };
  }, []);

  return (
    <IntlProvider locale="en">
      <ShellSidebar className="d-flex border-right align-items-center justify-content-center p-5">
        <div>
          <h5>Buying a single product or donate once with amount of 30 €</h5>
          <p>
            This form should receive paymentIntent['client_secret'] and handle
            payment and errors.
          </p>
        </div>
      </ShellSidebar>
      <ShellMain>
        <ShellBody>
          <ScrollableContainer>
            <div className="container p-5 my-5">
              <div className="row justify-content-center">
                <div className="col-9">
                  <SinglePayment
                    stripe={stripe}
                    label="Test"
                    amount={3000}
                    onSave={console.log}
                    clientSecret={paymentIntent?.client_secret}
                    providers={['credit_card']}
                  >
                    {(paymentProps) => {
                      return <PaymentMethods {...paymentProps} />;
                    }}
                  </SinglePayment>
                </div>
              </div>
            </div>
          </ScrollableContainer>
        </ShellBody>
      </ShellMain>
    </IntlProvider>
  );
}
