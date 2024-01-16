import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

type BodyProps = {
  children: ReactElement | ReactElement[];
  paddingY: string;
  paddingX: string;
};

export default function Body(
  props: BodyProps
): ReactElement {
  const {
    paddingY = 'md',
    paddingX = 'lg',
    children,
  } = props;
  return (
    <Stack
      backgroundColor="gray.50"
      paddingY={paddingY}
      paddingX={paddingX}
      flex="1"
    >
      {children}
    </Stack>
  );
}
