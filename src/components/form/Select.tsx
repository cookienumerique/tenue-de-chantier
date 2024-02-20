import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Skeleton,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';
import { FieldValidation, useField } from '@formiz/core';
import { ReactElement } from 'react';
import {
  ActionMeta,
  default as ReactSelect,
  OnChangeValue,
} from 'react-select';

import LabelValue from '@/interfaces/LabelValue';

type SelectProps = {
  options: LabelValue[] | undefined;
  defaultValue?: LabelValue | undefined;
  label?: string;
  name: string;
  helperMessage?: string;
  placeholder?: string;
  isLoading?: boolean;
  isError?: boolean;
  onChange?: (
    newValue: OnChangeValue<
      LabelValue | undefined,
      false
    >,
    meta: ActionMeta<string | number>
  ) => void;
  required?: boolean;
  optionMessage?: string;
  validations?: FieldValidation[];
  isDisabled?: boolean;
};

export default function Select(
  props: SelectProps
): ReactElement {
  const {
    placeholder,
    onChange = () => null,
    defaultValue,
    label,
    options,
    helperMessage,
    isLoading = false,
    isError = false,
    required = false,
    optionMessage = 'Aucune option disponible',
    validations,
    isDisabled = false,
  } = props;

  const {
    value,
    setValue,
    errorMessage,
    isValid,
    isSubmitted,
  } = useField(props, {
    defaultValue,
    validations,
    keepValue: true,
    // @ts-expect-error to fix
    formatValue: (labelValue: LabelValue | undefined) =>
      labelValue,
  });

  const handleChange = (
    newValue: OnChangeValue<
      LabelValue | undefined,
      false
    >,
    meta: ActionMeta<string | number>
  ) => {
    setValue(newValue);
    onChange(newValue, meta);
  };

  if (isLoading)
    return (
      <Stack>
        <SkeletonText
          noOfLines={1}
          skeletonHeight={3}
          width="10em"
        />
        <Skeleton
          width="100%"
          borderRadius="md"
          height="36px"
        />
      </Stack>
    );

  if (isError) return <div>Error...</div>;

  return (
    <FormControl
      isInvalid={!isValid}
      isRequired={required}
    >
      <FormLabel aria-required={required}>
        {label}
      </FormLabel>
      <ReactSelect
        instanceId={props?.name}
        // @ts-expect-error to fix
        onChange={handleChange}
        // @ts-expect-error to fix
        value={value}
        // @ts-expect-error to fix
        options={options}
        placeholder={placeholder}
        required={required}
        aria-invalid={!isValid}
        noOptionsMessage={() => optionMessage}
        isDisabled={isDisabled}
      />
      {helperMessage ? (
        <FormHelperText>{helperMessage}</FormHelperText>
      ) : null}
      {!isValid ? (
        <FormErrorMessage>
          {required && !value && isSubmitted
            ? 'Ce champ est obligatoire'
            : ''}
          {errorMessage}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
}
