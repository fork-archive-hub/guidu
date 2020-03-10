export { components, createFilter, mergeStyles } from 'react-select';
export { makeAsyncSelect } from 'react-select/async';
export { makeCreatableSelect } from 'react-select/creatable';
export { default as AsyncCreatableSelect } from './AsyncCreatableSelect';
export { default as AsyncSelect } from './AsyncSelect';
export { default as CheckboxSelect } from './CheckboxSelect';
export { CheckboxOption, RadioOption } from './components/input-options';
export { default as CountrySelect } from './CountrySelect';
export { default as CreatableSelect } from './CreatableSelect';
export { allCountries } from './data/countries';
export { default as PopupSelect } from './PopupSelect';
export { default as RadioSelect } from './RadioSelect';
import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import SelectComponent from './Select';

const Select = withFormsy(ComponentHOC(SelectComponent));

export default Select;
