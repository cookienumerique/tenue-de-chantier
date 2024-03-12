import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import LayoutHeader from '@/components/layout/_partials/LayoutHeader';
import Body from '@/components/layout/body/Body';

export type LayoutProps = {
  flex?: number;
  gap?: number;
  children: ReactElement | ReactElement[];
};

/**
 * @description Layout for large screen
 * @param props
 * @constructor
 */
export default function LayoutLarge(
  props: LayoutProps
): ReactElement {
  const { children, flex, gap } = props;

  return (
    <Stack
      flex={flex}
      gap={gap}
    >
      {/* Header */}
      <LayoutHeader />
      {/* Body */}
      <Body
        paddingY="sm"
        paddingX="md"
      >
        {children}
      </Body>
      {/* Footer */}
    </Stack>
  );
}
