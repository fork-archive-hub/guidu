import { ShellBody, ShellFooter, ShellHeader, ShellSidebar } from '@uidu/shell';
import React, { PureComponent } from 'react';
import { Transition } from 'react-transition-group';
import GlobalItem from '../GlobalNavigationItem';
import { FakeGlobalItemWrapper, FakeItemWrapper } from './styled';
import { GlobalNavigationProps, GlobalNavigationState } from './types';

const defaultStyle = {
  transition: 'transform 130ms ease-in',
  position: 'absolute',
  left: 0,
  height: '100%',
  willChange: 'transform',
};

const transitionStyles = {
  entering: { transform: 'translateX(0)', zIndex: 4 },
  entered: { transform: 'translateX(0)', zIndex: 30 },
  exiting: {
    transform: 'translateX(-100%)',
    transition: 'transform 300ms ease-out',
    zIndex: 30,
  },
  exited: { transform: 'translateX(-100%)', zIndex: 2 },
};

export default class GlobalNavigation extends PureComponent<
  GlobalNavigationProps,
  GlobalNavigationState
> {
  static defaultProps = {
    backgroundColor: '#4C566A',
    isOpen: false,
    width: '4rem',
    navigationWidth: 25,
    showAfter: 1000,
  };

  private timer: number = null;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
    };
  }

  onMouseEnter = () => {
    const { showAfter } = this.props;
    this.timer = window.setTimeout(() => {
      this.setState({ isOpen: true });
    }, showAfter);
  };

  onMouseLeave = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.setState({ isOpen: false });
  };

  render() {
    const {
      backgroundColor,
      header,
      body,
      footer,
      width,
      navigationWidth,
      navigationMinWidth,
    } = this.props;
    const { isOpen } = this.state;

    return [
      <ShellSidebar
        style={{
          width,
          backgroundColor,
          zIndex: 3,
        }}
        onMouseEnter={this.onMouseEnter}
      >
        <ShellHeader className="justify-content-center">
          <GlobalItem {...header} />
        </ShellHeader>
        <ShellBody scrollable className="d-flex flex-column align-items-center">
          {body.map(bodyItem => (
            <GlobalItem {...bodyItem} />
          ))}
        </ShellBody>
        <ShellFooter
          className="d-flex flex-column align-items-center py-3"
          style={{
            backgroundColor: 'rgba(255, 255, 255, .05)',
          }}
        >
          {footer.map(footerItem => (
            <GlobalItem {...footerItem} />
          ))}
        </ShellFooter>
      </ShellSidebar>,
      <Transition in={isOpen}>
        {state => (
          <ShellSidebar
            style={{
              ...defaultStyle,
              ...{
                backgroundColor,
                width: `calc((100% - ${width}) * ${navigationWidth /
                  100} + ${width})`,
              },
              ...(navigationMinWidth && {
                minWidth: `calc(${navigationMinWidth} + ${width})`,
              }),
              ...transitionStyles[state],
            }}
            onMouseLeave={this.onMouseLeave}
          >
            <ShellHeader>
              <FakeGlobalItemWrapper style={{ width }}>
                <GlobalItem {...header} />
              </FakeGlobalItemWrapper>
              <h5 className="m-0 text-light">{header.name}</h5>
            </ShellHeader>
            <ShellBody scrollable className="d-flex flex-column">
              {body.map(({ children, name, ...otherProps})  => (
                <FakeItemWrapper {...otherProps}>
                  <FakeGlobalItemWrapper style={{ width }}>
                    <GlobalItem as="span">
                      {children}
                    </GlobalItem>
                  </FakeGlobalItemWrapper>
                  {name}
                </FakeItemWrapper>
              ))}
            </ShellBody>
            <ShellFooter
              className="d-flex flex-column py-3"
              style={{
                backgroundColor: 'rgba(255, 255, 255, .05)',
              }}
            >
              {footer.map(({ name, children, ...otherProps}) => (
                <FakeItemWrapper {...otherProps}>
                  <FakeGlobalItemWrapper style={{ width }}>
                    <GlobalItem>{children}</GlobalItem>
                  </FakeGlobalItemWrapper>
                  {name}
                </FakeItemWrapper>
              ))}
            </ShellFooter>
          </ShellSidebar>
        )}
      </Transition>,
    ];
  }
}
