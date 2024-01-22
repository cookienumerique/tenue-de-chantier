import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import WrapperLogoutAvatar from '@/components/layout/_partials/WrapperLogoutAvatar';
import HeaderTitle from '@/components/layout/header/HeaderTitle';

/**
 * @description Header for large screen
 * @constructor
 */
export default function LayoutHeader(): ReactElement {
  return (
    <Stack
      paddingY="xs"
      paddingX={{ base: 'sm', md: 'md' }}
    >
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <HeaderTitle
          fontSize={{ base: 'sm', md: 'lg' }}
        />
        <WrapperLogoutAvatar />
      </Stack>
    </Stack>
  );
}
