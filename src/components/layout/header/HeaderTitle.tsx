import { ResponsiveValue, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
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
  const { push } = useRouter();
  return (
    <Text
      fontSize={fontSize}
      color="gray.800"
      fontWeight="bold"
      textAlign="center"
      onClick={() => push('/')}
      cursor="pointer"
    >
      {process?.env?.NEXT_PUBLIC_APP_NAME?.toUpperCase() ??
        'My app'}
    </Text>
  );
}
