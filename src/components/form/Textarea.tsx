import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea as TextareaChakra,
  TextareaProps as TextareaChakraProps,
} from '@chakra-ui/react';
import { useField } from '@formiz/core';
import { ReactElement, useRef } from 'react';

type TextareaProps = TextareaChakraProps & {
  name: string;
  required?: boolean;
  label: string;
  helperMessage?: string;
};
export default function Textarea(
  props: TextareaProps
): ReactElement {
  const {
    required,
    label,
    helperMessage,
    defaultValue,
    key,
  } = props;
  const ref = useRef<HTMLTextAreaElement>();
  const {
    value,
    setValue,
    errorMessage,
    isValid,
    isSubmitted,
  } = useField(props);

  return (
    <FormControl
      isInvalid={!isValid}
      isRequired={required}
    >
      <FormLabel aria-required={required}>
        {label}
      </FormLabel>
      <TextareaChakra
        ref={ref}
        defaultValue={defaultValue}
        onChange={(e) => setValue(e?.target?.value)}
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
