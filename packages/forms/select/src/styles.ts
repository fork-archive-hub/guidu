import { colors } from '@uidu/theme';
import { theme } from 'twin.macro';

export default function baseStyles(validationState, isCompact) {
  return {
    // control: (css, { isFocused, isDisabled }) => {
    //   let borderColor = isFocused ? colors.B100 : colors.N20;
    //   let backgroundColor = isFocused ? colors.N0 : colors.N20;
    //   if (isDisabled) {
    //     backgroundColor = colors.N20;
    //   }
    //   if (validationState === 'error') borderColor = colors.R400;
    //   if (validationState === 'success') borderColor = colors.G400;

    //   let borderColorHover = isFocused ? colors.B100 : colors.N30;
    //   if (validationState === 'error') borderColorHover = colors.R400;
    //   if (validationState === 'success') borderColorHover = colors.G400;

    //   const transitionDuration = '200ms';

    //   return {
    //     ...css,
    //     backgroundColor,
    //     borderColor,
    //     borderStyle: 'solid',
    //     borderRadius: '3px',
    //     borderWidth: '2px',
    //     boxShadow: 'none',
    //     minHeight: isCompact ? gridSize() * 4 : gridSize() * 5,
    //     padding: 0,
    //     transition: `background-color ${transitionDuration} ease-in-out,
    //     border-color ${transitionDuration} ease-in-out`,

    //     '-ms-overflow-style': '-ms-autohiding-scrollbar',
    //     '::-webkit-scrollbar': {
    //       height: gridSize(),
    //       width: gridSize(),
    //     },
    //     '::-webkit-scrollbar-corner': {
    //       display: 'none',
    //     },

    //     ':hover': {
    //       '::-webkit-scrollbar-thumb': {
    //         backgroundColor: 'rgba(0,0,0,0.2)',
    //       },
    //       cursor: 'pointer',
    //       backgroundColor: isFocused ? colors.N0 : colors.N30,
    //       borderColor: borderColorHover,
    //     },
    //     '::-webkit-scrollbar-thumb:hover': {
    //       backgroundColor: 'rgba(0,0,0,0.4)',
    //     },
    //   };
    // },
    control: (base, state) => ({
      // none of react-selects styles are passed to <View />
      ...base,
      backgroundColor: 'rgb(var(--body-on-primary-bg))',
      borderRadius: '.25rem',
      borderColor: state.isFocused
        ? 'rgb(var(--brand-primary))'
        : 'rgb(var(--border))',
      boxShadow: state.isFocused
        ? '0 0 0 0.2rem rgba(var(--brand-primary), .25)'
        : 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? 'rgb(var(--brand-primary))'
          : 'rgb(var(--border))',
        ...(state.isFocused && {}),
      },
    }),
    placeholder: (base, state) => ({
      color: theme`colors.gray.400`,
    }),
    // valueContainer: css => ({
    //   ...css,
    //   paddingBottom: isCompact ? 0 : 2,
    //   paddingTop: isCompact ? 0 : 2,
    // }),
    valueContainer: (base, state) => ({
      ...base,
      padding:
        state.isMulti && state.hasValue
          ? 'calc(.75rem - 2px) .5rem'
          : 'calc(.75rem - 1px) 1rem calc(.75rem - 1px) 1rem',
    }),
    clearIndicator: (css) => ({
      ...css,
      color: colors.N70,
      paddingLeft: '2px',
      paddingRight: '2px',
      paddingBottom: isCompact ? 0 : 6,
      paddingTop: isCompact ? 0 : 6,
      ':hover': {
        color: colors.N500,
      },
    }),
    loadingIndicator: (css) => ({
      ...css,
      paddingBottom: isCompact ? 0 : 6,
      paddingTop: isCompact ? 0 : 6,
    }),
    dropdownIndicator: (css, { isDisabled }) => {
      let color = colors.N500;
      if (isDisabled) {
        color = colors.N70;
      }
      return {
        ...css,
        color,
        paddingBottom: isCompact ? 0 : 6,
        paddingTop: isCompact ? 0 : 6,
        paddingLeft: '6px',
        paddingRight: '6px',
        ':hover': {
          color: colors.N200,
        },
      };
    },
    input: (base, state) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
      // margin: '0 2px',
    }),
    option: (base, { isSelected, isFocused, isDisabled }) => ({
      ...base,
      padding: '.75rem 1rem',
      backgroundColor:
        isSelected || isFocused
          ? 'rgba(var(--brand-primary), .05)'
          : 'transparent',
      color: isDisabled
        ? 'rgb(var(--brand-subtle))'
        : 'rgba(var(--body-primary), 1)',
      '&:hover': {
        backgroundColor: 'rgba(var(--brand-primary), .1)',
        color: isDisabled
          ? 'rgb(var(--brand-subtle))'
          : 'rgba(var(--body-primary), 1)',
      },
    }),
    multiValue: (css) => ({
      ...css,
      borderRadius: '.25rem',
      backgroundColor: 'rgba(var(--brand-primary), .65)',
      color: 'rgb(var(--brand-on-primary))',
      maxWidth: '100%',
    }),
    multiValueLabel: (css) => ({
      ...css,
      color: 'rgb(var(--brand-on-primary))',
    }),
    // multiValueRemove: (css, { isFocused }) => ({
    //   ...css,
    //   backgroundColor: isFocused && colors.R75,
    //   color: isFocused && colors.R400,
    //   paddingLeft: '2px',
    //   paddingRight: '2px',
    //   borderRadius: '0px 2px 2px 0px',
    //   ':hover': {
    //     color: colors.R400,
    //     backgroundColor: colors.R75,
    //   },
    // }),
    indicatorSeparator: (base) => ({
      ...base,
      margin: '.75rem 0',
    }),
    indicatorsContainer: (base) => ({
      ...base,
      marginLeft: '1rem',
    }),
    menu: (base) => ({
      ...base,
      boxShadow: 'none',
      border: '1px solid rgb(var(--border))',
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
  };
}
