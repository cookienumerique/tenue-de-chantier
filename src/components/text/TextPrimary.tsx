import { Text, TextProps } from '@chakra-ui/react';
import type { ReactElement } from 'react';

/**
 * @description Afficher un texte primaire
 */
export default function TextPrimary(
  props: { wordWrap?: string } & TextProps
): ReactElement {
  const { children, wordWrap, ...rest } = props;

  if (!children) return <></>;
  return (
    <Text
      fontSize="sm"
      wordWrap={wordWrap}
      {...rest}
    >
      {children}
    </Text>
  );
}
