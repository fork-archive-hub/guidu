import { CheckIcon } from '@heroicons/react/24/outline';
import React from 'react';
import tw from 'twin.macro';
import { FieldDownshiftOptionProps } from '../../types';
import { Circle } from './Shapes';

export default function Checkbox({
  item,
  index,
  isSelected,
  getItemProps,
}: FieldDownshiftOptionProps<unknown>) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <button
      type="button"
      key={item.id}
      css={[
        tw`flex flex-row items-center justify-start w-full px-4 py-3 mb-2 space-x-3 text-left border rounded`,
        !!isSelected && tw`text-white [background:rgb(var(--brand-primary))]`,
      ]}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <Circle isSelected={isSelected}>
        {isSelected && <CheckIcon tw="h-3.5 w-3.5 text-white" />}
      </Circle>

      <div>
        <p>{item.name}</p>
        {item.description && <p tw="text-gray-500">{item.description}</p>}
      </div>
    </button>
  );
}
