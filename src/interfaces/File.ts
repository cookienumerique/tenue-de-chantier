import Utilisateur from '@/interfaces/Utilisateur';

export default interface File {
  id: string;
  nom: string;
  path: string;
  utilisateur: Utilisateur;
}
