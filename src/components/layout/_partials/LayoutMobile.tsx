import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import ButtonShortCut from '@/components/button/ButtonShortCut';
import HeaderMobile from '@/components/layout/_partials/HeaderMobile';
import { LayoutProps } from '@/components/layout/_partials/LayoutLarge';
import Body from '@/components/layout/Body/Body';

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
      <HeaderMobile />
      {/* Content */}
      <Body
        paddingY="xs"
        paddingX="sm"
      >
        {children}
      </Body>
      {/* Footer */}
      <Stack>
        <ButtonShortCut />
      </Stack>
    </Stack>
  );
}
