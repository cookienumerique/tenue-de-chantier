import { ReactElement } from 'react';
import { RiLogoutCircleLine } from 'react-icons/ri';

import IconButton from '@/components/button/IconButton';
import { useAuthentification } from '@/context/AuthentificationProvider';

export default function ButtonLogout(): ReactElement {
  const { logout } = useAuthentification();
  return (
    <IconButton
      border="1px solid"
      borderColor="gray.200"
      aria-label="Se déconnecter"
      backgroundColor="gray.50"
      borderRadius="50%"
      label="Se déconnecter"
      color="gray.700"
      size="sm"
      icon={<RiLogoutCircleLine />}
      onClick={logout}
    />
  );
}
