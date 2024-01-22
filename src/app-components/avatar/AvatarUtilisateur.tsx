import { Avatar } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { useAuthentification } from '@/context/AuthentificationProvider';

function AvatarUtilisateur(): ReactElement {
  const { user } = useAuthentification();
  return (
    <Avatar
      name={`${user?.nom} ${user?.prenom}`}
      size="sm"
      cursor="pointer"
    />
  );
}

export default AvatarUtilisateur;
