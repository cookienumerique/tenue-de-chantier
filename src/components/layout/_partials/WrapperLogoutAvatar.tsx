import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import AvatarUtilisateur from '@/app-components/avatar/AvatarUtilisateur';
import ButtonLogout from '@/components/button/ButtonLogout';

/**
 * @description Wrapper for ButtonLogout and AvatarUtilisateur
 * @constructor
 */
function WrapperLogoutAvatar(): ReactElement {
  return (
    <Stack
      alignSelf="end"
      direction="row"
      spacing="xs"
    >
      <ButtonLogout />
      <AvatarUtilisateur />
    </Stack>
  );
}

export default WrapperLogoutAvatar;
