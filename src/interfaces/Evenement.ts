import EvenementTypeEnum from '@/enums/EvenementTypeEnum';
import Utilisateur from '@/interfaces/Utilisateur';

export default interface Evenement {
  id: string;
  type: { name: string; value: EvenementTypeEnum };
  date: string;
  utilisateur: Utilisateur;
  valeur: string;
}
