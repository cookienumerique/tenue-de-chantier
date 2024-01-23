import axios from 'axios';

import Utilisateur from '@/interfaces/Utilisateur';

/**
 * @description Retrieve the current user with its token
 */
const findMe = async (): Promise<{
  utilisateur: Utilisateur;
  token: string;
}> => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/utilisateurs/me`
  );
};

export default findMe;
