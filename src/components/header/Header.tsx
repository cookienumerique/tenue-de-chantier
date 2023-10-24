import { Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

export default function Header(): ReactElement {
  const nameApp = process?.env?.NEXT_APP_NAME;

  return (
    <Stack
      backgroundColor="purple.800"
      paddingY={4}
      fontSize="lg"
    >
      <Text
        as="h1"
        color="white"
        textAlign="center"
        fontWeight="bold"
      >
        {nameApp?.toUpperCase()}
      </Text>
    </Stack>
  );
}
