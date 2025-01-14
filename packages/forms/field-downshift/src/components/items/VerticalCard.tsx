import { CheckIcon } from '@heroicons/react/24/outline';
import React from 'react';
import tw from 'twin.macro';
import { FieldDownshiftOptionProps } from '../../types';

export default function HorizontalCard({
  item,
  index,
  isSelected,
  getItemProps,
}: FieldDownshiftOptionProps<unknown>) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <button
      type="button"
      key={index}
      css={[
        isSelected && tw`border-primary`,
        tw`relative p-4 text-left border rounded`,
      ]}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <div tw="absolute w-full bg-transparent border-0 text-right p-2 inset-0 right-full">
        <span
          css={[
            isSelected
              ? tw`text-opacity-100 bg-opacity-100 bg-primary text-on-primary`
              : tw`border`,
            tw`flex items-center justify-center w-6 h-6 ml-auto rounded-full`,
          ]}
        >
          {isSelected && <CheckIcon tw="h-4 w-4" />}
        </span>
      </div>
      <div tw="p-3 md:p-4 flex items-center">
        <div tw="flex items-center md:text-center md:flex-col flex-grow">
          {item.before && (
            <div tw="mr-4 mb-0 md:mb-4 md:mr-0">{item.before}</div>
          )}
          <div>
            <div tw="text-lg">{item.name}</div>
            {item.description && (
              <div tw="mb-0 mt-1 text-gray-500">{item.description}</div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
