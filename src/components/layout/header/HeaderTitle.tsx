import { ResponsiveValue, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

type HeaderTitleProps = {
  fontSize?: ResponsiveValue<
    string & NonNullable<unknown>
  >;
};
export default function HeaderTitle(
  props: HeaderTitleProps
): ReactElement {
  const { fontSize } = props;
  return (
    <Text
      fontSize={fontSize}
      color="gray.800"
      fontWeight="bold"
      textAlign="center"
    >
      {process?.env?.NEXT_PUBLIC_APP_NAME?.toUpperCase() ??
        'My app'}
    </Text>
  );
}
