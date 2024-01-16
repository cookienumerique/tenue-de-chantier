import InfractionLotStatutEnum from '@/enums/InfractionLotStatutEnum';
import InfractionLotUrgenceEnum from '@/enums/InfractionLotUrgenceEnum';
import Infraction from '@/interfaces/Infraction';
import Utilisateur from '@/interfaces/Utilisateur';

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
}
