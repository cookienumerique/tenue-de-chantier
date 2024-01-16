import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import ButtonShortCut from '@/components/button/ButtonShortCut';
import HeaderLarge from '@/components/layout/_partials/HeaderLarge';
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
      <HeaderLarge />
      {/* Body */}
      <Body
        paddingY="sm"
        paddingX="md"
      >
        {children}
      </Body>
      <ButtonShortCut />
      {/* Footer */}
    </Stack>
  );
}
