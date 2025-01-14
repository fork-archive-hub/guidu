import loadable from '@loadable/component';
import Observer from '@researchgate/react-intersection-observer';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
// import 'overlayscrollbars/overlayscrollbars.css';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ObserverComponent, Shadow, StyledScrollableContainer } from './styled';
import { ShellBodyProps } from './types';

const OverlayScrollbars = loadable.lib(() => import('overlayscrollbars-react'));

function ScrollableContainer({
  id = null,
  forwardedRef,
  children,
  shadowOnScroll = true,
  className = null,
  innerClassName = null,
  enableCustomScrollbars = false,
  customScrollbarProps = {},
}: ShellBodyProps) {
  const [shadowedHeader, setShadowedHeader] = useState(false);
  const element: React.RefObject<any> = useRef();
  const overlayScrollbar = useRef(null);

  useImperativeHandle(forwardedRef, () => element.current);

  const getScrollable = useCallback(
    () =>
      enableCustomScrollbars && overlayScrollbar.current
        ? element.current?.getElement()
        : element.current,
    [enableCustomScrollbars, overlayScrollbar],
  );

  useEffect(() => {
    const scrollableElement = getScrollable();
    if (scrollableElement) disableBodyScroll(scrollableElement);
    return () => {
      enableBodyScroll(scrollableElement);
    };
  }, [getScrollable]);

  const handleHeader = (e) => {
    setShadowedHeader(!e.isIntersecting);
  };

  const content = (
    <StyledScrollableContainer id={id} ref={element} className={className}>
      {shadowOnScroll && (
        <>
          <Observer
            onChange={handleHeader}
            root={forwardedRef && forwardedRef.current}
          >
            <ObserverComponent />
          </Observer>
          <Shadow
            active={shadowedHeader}
            width={getScrollable()?.offsetWidth}
          />
        </>
      )}
      <div className={innerClassName}>{children}</div>
    </StyledScrollableContainer>
  );

  if (enableCustomScrollbars) {
    return (
      <OverlayScrollbars ref={overlayScrollbar}>
        {({ OverlayScrollbarsComponent }) => (
          <OverlayScrollbarsComponent
            options={{
              className: 'os-theme-dark',
              scrollbars: { autoHide: 'leave', autoHideDelay: 300 },
              ...customScrollbarProps,
            }}
            ref={element}
          >
            {content}
          </OverlayScrollbarsComponent>
        )}
      </OverlayScrollbars>
    );
  }

  return content;
}

export default React.forwardRef(
  (
    {
      id = undefined,
      children,
      shadowOnScroll = true,
      className = null,
      innerClassName = null,
      enableCustomScrollbars = false,
      customScrollbarProps = {},
    }: ShellBodyProps,
    ref: any,
  ) => (
    <ScrollableContainer
      id={id}
      children={children}
      shadowOnScroll={shadowOnScroll}
      className={className}
      innerClassName={innerClassName}
      enableCustomScrollbars={enableCustomScrollbars}
      customScrollbarProps={customScrollbarProps}
      forwardedRef={ref}
    />
  ),
);
