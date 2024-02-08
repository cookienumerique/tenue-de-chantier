import { InputProps as InputChakraProps } from '@chakra-ui/input';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input as InputChakra,
  Stack,
} from '@chakra-ui/react';
import { useField } from '@formiz/core';
import { ChangeEvent, ReactElement, useRef } from 'react';
import { MdCloudUpload } from 'react-icons/md';

import TextSecondary from '@/components/text/TextSecondary';

type InputProps = InputChakraProps & {
  name: string;
  required?: boolean;
  label: string;
  helperMessage?: string;
};
export default function InputFiles(
  props: InputProps
): ReactElement {
  const { required, label, helperMessage } = props;
  const ref = useRef<HTMLInputElement>();
  const {
    value,
    setValue,
    errorMessage,
    isValid,
    isSubmitted,
  } = useField(props, {
    formatValue: (files: FileList | null) => files,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event?.target?.files);
  };

  return (
    <FormControl
      isInvalid={!isValid}
      isRequired={required}
    >
      <FormLabel aria-required={required}>
        {label}
      </FormLabel>
      <Stack>
        <Stack
          cursor="pointer"
          border="2px solid"
          borderRadius="lg"
          borderColor="gray.200"
          onClick={() => ref?.current?.click()}
          padding="sm"
          justifyContent="center"
          alignItems="center"
        >
          <Icon
            as={MdCloudUpload}
            color="primary.500"
            boxSize="8"
          />
          <TextSecondary fontSize="sm">
            Sélectionnez les fichiers à charger
          </TextSecondary>
        </Stack>

        <Stack gap="2xs">
          {Array.from(value ?? [])?.map((file, index) => {
            return (
              <TextSecondary key={index}>
                {file.name}
              </TextSecondary>
            );
          })}
        </Stack>
      </Stack>
      <InputChakra
        ref={ref}
        display="none"
        onChange={handleChange}
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
