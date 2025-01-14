import Form from '@uidu/form';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import React, { useState } from 'react';
import { useDefaultForm } from '../../form/examples-utils';

export const inputDefaultProps = {
  label: 'This is a form label',
  placeholder: 'This is a form placeholder',
  name: 'foo',
  onChange: console.log,
  // required: true,
  // help: <span className="text-primary">This is a node help</span>,
};

function FieldExampleBlock({ name, children }) {
  return (
    <div tw="py-6">
      <h5 tw="text-lg font-semibold mb-4">{name}</h5>
      {children}
    </div>
  );
}

function FieldExampleEvents({ component: Component, defaultValue, ...rest }) {
  const defaultForm = useDefaultForm();
  const [eventResults, setEventResults] = useState(
    'Click into and out of the input above to trigger onBlur & onFocus in the field',
  );

  const onChange = (name, value) => {
    console.log(name, value);
    setEventResults(`onChange called with value: ${value}`);
  };

  const onBlur = () => {
    console.log('onBlur called from fieldbase above');
    setEventResults('onBlur called from FieldBase above');
  };

  const onFocus = () => {
    setEventResults('onFocus called from FieldBase above');
  };

  return (
    <Form<{ foo: string }> {...defaultForm} tw="space-y-6">
      <Component
        {...inputDefaultProps}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        label="With change, blur & focus handlers"
        {...rest}
      />
      <div
        tw="mb-4"
        style={{
          borderStyle: 'dashed',
          borderWidth: '1px',
          borderColor: '#ccc',
          padding: '0.5em',
          color: '#ccc',
        }}
      >
        {eventResults}
      </div>
    </Form>
  );
}

function FieldExampleAppearance({
  component: Component,
  defaultValue,
  ...rest
}) {
  const defaultForm = useDefaultForm();
  return (
    <Form {...defaultForm} tw="space-y-6">
      <Component
        {...inputDefaultProps}
        value={defaultValue}
        label="With default value"
        {...rest}
      />
      <Component
        {...inputDefaultProps}
        name="foo1"
        disabled
        label="disabled"
        {...rest}
      />
      <Component
        {...inputDefaultProps}
        name="foo2"
        required
        label="Required field"
        rules={{
          required: { value: true, message: 'Required field' },
        }}
        {...rest}
      />
      <Component
        {...inputDefaultProps}
        name="foo3"
        isInvalid
        label="Invalid"
        {...rest}
      />
      <Component
        {...inputDefaultProps}
        label="With help"
        name="foo4"
        help={<span className="text-primary">This is a node help</span>}
        {...rest}
      />
      <Component
        {...inputDefaultProps}
        name="foo5"
        label={null}
        floatLabel="Test floating label"
        {...rest}
      />
    </Form>
  );
}

export function FieldExampleRefs({ component: Component, ...rest }) {
  const defaultForm = useDefaultForm();

  return (
    <Form {...defaultForm} tw="space-y-6">
      <Component {...inputDefaultProps} {...rest} />
      <div tw="mb-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            defaultForm.form.setFocus(inputDefaultProps.name);
          }}
        >
          Focus component
        </button>
      </div>
    </Form>
  );
}

export function FieldExampleWithSubmit({ component: Component, ...rest }) {
  const defaultForm = useDefaultForm();
  return (
    <Form {...defaultForm}>
      <Component {...inputDefaultProps} required {...rest} />
    </Form>
  );
}

export function FieldExampleScaffold<TProps>({
  component,
  defaultValue,
  ...rest
}: {
  component: any;
  defaultValue?: any;
} & TProps) {
  return (
    <ShellMain>
      <ShellBody>
        <ScrollableContainer>
          <div tw="divide-y flex flex-col -mt-6">
            <FieldExampleBlock name="With Event">
              <FieldExampleEvents
                component={component}
                defaultValue={defaultValue}
                {...rest}
              />
            </FieldExampleBlock>
            <FieldExampleBlock name="Appearance">
              <FieldExampleAppearance
                component={component}
                defaultValue={defaultValue}
                {...rest}
              />
            </FieldExampleBlock>
            <FieldExampleBlock name="Refs">
              <FieldExampleRefs component={component} {...rest} />
            </FieldExampleBlock>
            <FieldExampleBlock name="With Submit">
              <FieldExampleWithSubmit component={component} {...rest} />
            </FieldExampleBlock>
          </div>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}
