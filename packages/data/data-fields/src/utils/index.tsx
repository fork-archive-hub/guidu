import { Column, ColumnDef } from '@tanstack/react-table';
import numeral from 'numeral';
import {
  addField,
  addressField,
  attachmentsField,
  avatarField,
  byName,
  checkboxField,
  collectionField,
  contactField,
  countryField,
  coverField,
  currencyField,
  dateField,
  emailField,
  memberField,
  multipleSelectField,
  numberField,
  paymentMethodField,
  percentField,
  phoneField,
  progressField,
  ratingField,
  singleSelectField,
  stringField,
  textField,
  uidField,
  urlField,
  voteField,
} from '../fields';
import { FieldGroup, FieldKind } from '../types';

const getColumnType = (kind: FieldKind) => {
  switch (kind) {
    case 'addField':
      return addField;
    case 'address':
      return addressField;
    case 'attachments':
      return attachmentsField;
    case 'avatar':
      return avatarField;
    case 'checkbox':
      return checkboxField;
    case 'collection':
      return collectionField;
    case 'contact':
      return contactField;
    case 'country':
      return countryField;
    case 'cover':
      return coverField;
    case 'currency':
      return currencyField;
    case 'date':
      return dateField;
    case 'email':
      return emailField;
    case 'member':
      return memberField;
    case 'multipleSelect':
      return multipleSelectField;
    case 'number':
      return numberField;
    case 'paymentMethod':
      return paymentMethodField;
    case 'percent':
      return percentField;
    case 'phone':
      return phoneField;
    case 'progress':
      return progressField;
    case 'rating':
      return ratingField;
    case 'singleSelect':
      return singleSelectField;
    case 'string':
      return stringField;
    case 'text':
      return textField;
    case 'uid':
      return uidField;
    case 'url':
      return urlField;
    case 'vote':
      return voteField;
    default:
      return {};
  }
};

export function buildNextColumn<T>({
  columns,
}: {
  columns: ColumnDef<T, unknown>[];
}): ColumnDef<T, unknown>[] {
  return columns.map((column) => {
    const columnType = getColumnType(column.meta?.kind);
    return {
      id: column.accessorKey,
      accessor: column.id,
      ...columnType,
      ...column,
      meta: {
        ...(columnType?.meta || {}),
        ...column.meta,
      },
    };
  });
}

export const buildColumn = ({ columns, ...fieldGroup }: FieldGroup) => {
  return columns.map(({ primary, kind, ...column }) => {
    return {
      fieldGroup,
      id: column.id,
      accessor: column.id,
      ...(kind ? { ...getColumnType(kind) } : {}),
      ...(primary
        ? {
            canMove: false,
            canHide: false,
            lockPinned: true,
            isPrimary: true,
            showRowGroup: true,
            pinned: 'left',
          }
        : {}),
      ...column,
    };
  });
};

export function buildNextColumns<T>(
  columns: ColumnDef<T>[],
): Array<ColumnDef<T>> {
  return columns.reduce(
    (arr, item) => [...arr, ...buildNextColumn(item)],
    [] as ColumnDef<T>[],
  );
}

export const buildColumns = (columns): Array<FieldGroup> => {
  return columns.reduce((arr, item) => {
    return [...arr, ...buildColumn(item)];
  }, []);
};

export function getPrimary<T>(columns: Column<T>[]) {
  return columns.find((column) => column.columnDef.meta?.isPrimary);
}

export function getCover<T>(columns: Column<T>[]) {
  return columns.find((column) => column.columnDef.meta?.kind === 'cover');
}

export function getAvatar<T>(columns: Column<T>[]) {
  return columns.find((column) => column.columnDef.meta?.kind === 'avatar');
}

export const numericComparator = (number1, number2) => {
  const numericNumber1 = numeral(number1).value();
  const numericNumber2 = numeral(number2).value();
  if (numericNumber1 === null && number2 === null) {
    return 0;
  }

  if (isNaN(numericNumber1)) {
    return -1;
  }

  if (isNaN(numericNumber2)) {
    return 1;
  }

  if (numericNumber1 === null) {
    return -1;
  }

  if (numericNumber2 === null) {
    return 1;
  }

  return numericNumber1 - numericNumber2;
};

export const getColumnDef = (columnDefs, filterOrGrouperOrSorter) =>
  columnDefs.filter((c) => c.id === filterOrGrouperOrSorter.id)[0];

export const getFieldFromColumnDef = (columnDef) => byName[columnDef.kind];
