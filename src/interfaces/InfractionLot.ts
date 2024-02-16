import InfractionLotStatutEnum from '@/enums/InfractionLotStatutEnum';
import InfractionLotUrgenceEnum from '@/enums/InfractionLotUrgenceEnum';
import Infraction from '@/interfaces/Infraction';
import Lot from '@/interfaces/Lot';
import Utilisateur from '@/interfaces/Utilisateur';
import Zac from '@/interfaces/Zac';

export default interface InfractionLot {
  id: string;
  date: string;
  statut: {
    name: string;
    value: InfractionLotStatutEnum;
  };
  urgence: {
    name: string;
    value: InfractionLotUrgenceEnum;
  };
  utilisateur: Utilisateur;
  infraction: Infraction;
  lotId: number;
  nbJoursDepuisCreation: number;
  nbJoursDateButoir: number;
  dateButoir: string;
  zac: Zac;
  lot: Lot;
}
