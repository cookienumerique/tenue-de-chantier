import EvenementTypeEnum from '@/enums/EvenementTypeEnum';
import File from '@/interfaces/File';
import Utilisateur from '@/interfaces/Utilisateur';

export default interface Evenement {
  id: string;
  type: EvenementTypeEnum;
  date: string;
  utilisateur: Utilisateur;
  valeur: string;
  files: File[];
}
