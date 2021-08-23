import React, {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { FieldMentionsStatelessProps } from '../types';
import { defaultMentionStyle, defaultStyle } from '../utils';

function FieldMentionsStateless({
  id,
  placeholder = "Mention people using '@'",
  allowSpaceInQuery = true,
  style = defaultStyle,
  value = null,
  items,
  onChange,
  onKeyDown,
  className,
  suggestionsPortalHost,
  forwardedRef,
}: FieldMentionsStatelessProps) {
  const element: RefObject<any> = useRef();

  useImperativeHandle(forwardedRef, () => element.current);

  return (
    <MentionsInput
      id={id}
      value={value?.value || ''}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={style}
      placeholder={placeholder}
      allowSpaceInQuery={allowSpaceInQuery}
      tw="background[rgb(var(--body-on-primary-bg))] shadow-sm focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] block w-full border border-color[rgb(var(--border))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:background[rgba(var(--brand-subtle), .4)]"
      className={className}
      suggestionsPortalHost={suggestionsPortalHost}
      allowSuggestionsAboveCursor
      inputRef={element}
    >
      {items.map((item, index) => (
        <Mention
          {...item}
          key={`mention-${index}`}
          style={defaultMentionStyle}
          appendSpaceOnAdd
        />
      ))}
    </MentionsInput>
  );
}

export default forwardRef((props: FieldMentionsStatelessProps, ref: any) => (
  <FieldMentionsStateless {...props} forwardedRef={ref} />
));
