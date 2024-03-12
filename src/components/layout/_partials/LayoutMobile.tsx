import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import LayoutHeader from '@/components/layout/_partials/LayoutHeader';
import { LayoutProps } from '@/components/layout/_partials/LayoutLarge';
import Body from '@/components/layout/body/Body';

/**
 * @description Layout for mobile
 * @param props
 * @constructor
 */
export default function LayoutMobile(
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
      {/* Content */}
      <Body
        paddingY="xs"
        paddingX="sm"
      >
        {children}
      </Body>
    </Stack>
  );
}
