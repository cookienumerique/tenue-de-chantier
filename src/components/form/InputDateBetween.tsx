import {
  FormLabel,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

import InputDateButoir from '@/app-components/form/InputDateButoir';

type InputDateBetweenProps = {
  label: string;
  nameFrom: string;
  nameTo: string;
  defaultValueFrom?: string | null;
  defaultValueTo?: string | null;
};
export default function InputDateBetween(
  props: InputDateBetweenProps
): ReactElement {
  const {
    label,
    nameFrom,
    nameTo,
    defaultValueFrom,
    defaultValueTo,
  } = props;

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  return (
    <Stack
      gap="sm"
      border="1px solid"
      borderColor="gray.200"
      padding="sm"
      borderRadius="md"
      position="relative"
      direction={isMobile ? 'column' : 'row'}
      width="fit-content"
    >
      <FormLabel
        position="absolute"
        top="-0.8em"
        backgroundColor="white"
        paddingX="xs"
      >
        {label}
      </FormLabel>
      <Stack direction={isMobile ? 'column' : 'row'}>
        <Stack width="12em">
          <InputDateButoir
            label="De"
            name={nameFrom}
            defaultValue={defaultValueFrom ?? undefined}
          />
        </Stack>
        <Stack width="12em">
          <InputDateButoir
            label="À"
            name={nameTo}
            defaultValue={defaultValueTo ?? undefined}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
