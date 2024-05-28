import CpgEnum from '@/enums/CpgEnum';
import Zac from '@/interfaces/Zac';

export default interface Lot {
  id: string;
  zac: Zac;
  cod: string;
  libLot: string;
  codeInsee: string;
  codeDept: string;
  libComm: string;
  codeSect: string;
  livre: boolean;
  geom: string;
  description: string;
  dateLivraison: string;
  dateDebutTravaux: string;
  progConfidentiel: string;
  preneur: string;
  codLot: string;
  montantChargeFonciere: number;
  cpg: { name: string; value: CpgEnum };
  adresse: string;
  nom: string | null | undefined;
  prenom: string | null | undefined;
  tel: string | null | undefined;
  mail: string | null | undefined;
  societe: string | null | undefined;
  adresse1: string | null | undefined;
  enChantier?: boolean;
}
