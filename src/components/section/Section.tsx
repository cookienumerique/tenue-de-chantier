import {
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

type SectionProps = {
  children: ReactElement | ReactElement[];
  title?: string;
} & StackProps;

export default function Section(
  props: SectionProps
): ReactElement {
  const { children, title, ...rest } = props;
  return (
    <Stack
      borderRadius="md"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
      backgroundColor="white"
      paddingY="sm"
      paddingX="sm"
      gap="sm"
      {...rest}
    >
      {title ? (
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="gray.700"
        >
          {title}
        </Text>
      ) : (
        <></>
      )}

      <Stack gap="sm">{children}</Stack>
    </Stack>
  );
}
