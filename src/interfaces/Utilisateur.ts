import ProfilEnum from '@/enums/ProfilEnum';

export default interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  profil: { name: string; value: ProfilEnum };
  email: string;
  identifiant: string;
  nomEntreprise: string;
  lastZacIdUsed: number | undefined;
}
