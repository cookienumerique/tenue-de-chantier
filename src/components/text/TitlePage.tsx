import { Text, TextProps } from '@chakra-ui/react';
import type { ReactElement } from 'react';

/**
 * @description Display title
 */
export default function TitlePage(
  props: TextProps
): ReactElement {
  const { children, ...rest } = props;

  if (!children) return <></>;
  return (
    <Text
      fontSize="lg"
      color="gray.600"
      fontWeight="bold"
      {...rest}
    >
      {children}
    </Text>
  );
}
