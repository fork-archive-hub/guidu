import { AtlassianIcon } from '@atlaskit/logo';
import * as React from 'react';
import Button from '../src';

const Icon = <AtlassianIcon label="Test icon" size="small" />;

const ButtonWrapper = ({
  inline = true,
  children,
}: {
  inline?: boolean;
  children: React.ReactNode;
}) => (
  <div style={{ display: inline ? 'inline-block' : 'block', padding: 4 }}>
    {children}
  </div>
);

const ButtonOptions = () => (
  <div>
    <ButtonWrapper>
      <Button autoFocus>Auto focused button</Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <Button iconBefore={Icon}>Icon Before</Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <Button iconAfter={Icon}>Icon After</Button>
    </ButtonWrapper>
    <ButtonWrapper inline={false}>
      <Button shouldFitContainer>Fit Container</Button>
    </ButtonWrapper>
  </div>
);

export default ButtonOptions;
