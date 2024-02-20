import { InputProps as InputChakraProps } from '@chakra-ui/input';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input as InputChakra,
} from '@chakra-ui/react';
import { useField } from '@formiz/core';
import { ChangeEvent, ReactElement, useRef } from 'react';

type InputProps = InputChakraProps & {
  name: string;
  required?: boolean;
  label: string;
  helperMessage?: string;
};
export default function Input(
  props: InputProps
): ReactElement {
  const {
    required,
    label,
    helperMessage,
    min,
    defaultValue,
    key,
  } = props;
  const ref = useRef<HTMLInputElement>();
  const {
    value,
    setValue,
    errorMessage,
    isValid,
    isSubmitted,
  } = useField(props, {
    formatValue: (value: string | null) => value,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event?.target?.value);
  };

  return (
    <FormControl
      isInvalid={!isValid}
      isRequired={required}
    >
      <FormLabel aria-required={required}>
        {label}
      </FormLabel>
      <InputChakra
        ref={ref}
        onChange={handleChange}
        min={min}
        defaultValue={defaultValue}
        key={key}
        {...props}
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
