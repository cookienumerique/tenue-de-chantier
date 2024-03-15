import {
  ResponsiveValue,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

type NavigationProps = {
  children: string;
  onClick: () => void;
  icon: React.ReactNode;
  fontSize?: ResponsiveValue<
    string & NonNullable<unknown>
  >;
};
export const NavigationItem = (
  props: NavigationProps
) => {
  const {
    children,
    onClick,
    icon,
    fontSize = 'sm',
  } = props;
  return (
    <Stack
      onClick={onClick}
      _hover={{
        backgroundColor: 'gray.50',
      }}
      paddingX="xs"
      paddingY="2xs"
      cursor="pointer"
      direction="row"
      alignItems="center"
      borderRadius="md"
      fontWeight="bold"
      gap="2xs"
    >
      {icon}
      <Text
        fontSize={fontSize}
        color="gray.600"
      >
        {children}
      </Text>
    </Stack>
  );
};
