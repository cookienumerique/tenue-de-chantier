import { useDisclosure } from '@chakra-ui/hooks';
import { CgArrowsExchange } from 'react-icons/cg';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { IoMailOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { MdOutlineCheckBox } from 'react-icons/md';
import { RiDownloadCloudLine } from 'react-icons/ri';
import { TbPhotoShare } from 'react-icons/tb';

import ActionInfractionEnum from '@/enums/ActionInfractionEnum';
import ActionInfractionType from '@/types/action/ActionInfractionType';

type BuildMenuActionInfractionLotProps = {
  actions: ActionInfractionType | undefined;
};

type BuildMenuActionInfractionLotReturn = {
  isOpenModalFiles: boolean;
  onCloseModalFiles: () => void;
  isOpenModalStatutInfraction: boolean;
  onCloseModalStatutInfraction: () => void;
  actions:
    | {
        label: string;
        icon: IconType;
        onClick: () => void;
      }[]
    | undefined;
};
/**
 * @description Build menu action infraction lot
 */
const useBuildMenuActionInfractionLot = ({
  actions,
}: BuildMenuActionInfractionLotProps): BuildMenuActionInfractionLotReturn => {
  const {
    isOpen: isOpenModalFiles,
    onOpen: onOpenModalFiles,
    onClose: onCloseModalFiles,
  } = useDisclosure();

  const {
    isOpen: isOpenModalStatutInfraction,
    onOpen: onOpenModalStatutInfraction,
    onClose: onCloseModalStatutInfraction,
  } = useDisclosure();

  const data = {
    [ActionInfractionEnum.UPLOAD_FILES]: {
      label: 'Ajouter des photos',
      icon: TbPhotoShare,
      onClick: () => onOpenModalFiles(),
    },
    [ActionInfractionEnum.ECRIRE_EMAIL]: {
      label: 'Ecrire un email',
      icon: IoMailOutline,
      onClick: () => alert('Ecrire un email'),
    },
    [ActionInfractionEnum.ECRIRE_COURRIER_MISE_EN_DEMEURE]:
      {
        label: 'Ecrire un courrier de mise en demeure',
        icon: RiDownloadCloudLine,
        onClick: () =>
          alert('Ecrire un courrier de mise en demeure'),
      },
    [ActionInfractionEnum.INDIQUER_PROBABLEMENT_RESOLU]: {
      label: 'Indiquer probablement résolu',
      icon: MdOutlineCheckBox,
      onClick: () =>
        alert('Indiquer probablement résolu'),
    },
    [ActionInfractionEnum.FERMER_INFRACTION]: {
      label: 'Fermer l’infraction',
      icon: HiLockClosed,
      onClick: () => alert('Fermer l’infraction'),
    },
    [ActionInfractionEnum.ECRIRE_COURRIER_CONSTAT_CARENCE]:
      {
        label: 'Ecrire un courrier de constat de carence',
        icon: RiDownloadCloudLine,
        onClick: () =>
          alert(
            'Ecrire un courrier de constat de carence'
          ),
      },
    [ActionInfractionEnum.ECRIRE_COURRIER_COMPLEMENTAIRE]:
      {
        label: 'Ecrire un courrier complémentaire',
        icon: RiDownloadCloudLine,
        onClick: () =>
          alert('Ecrire un courrier complémentaire'),
      },
    [ActionInfractionEnum.REOUVRIR_INFRACTION]: {
      label: 'Réouvrir l’infraction',
      icon: HiLockOpen,
      onClick: () => alert('Réouvrir l’infraction'),
    },
    [ActionInfractionEnum.CHANGER_STATUT]: {
      label: 'Changer de statut',
      icon: CgArrowsExchange,
      onClick: () => onOpenModalStatutInfraction(),
    },
  };

  return {
    isOpenModalFiles,
    onCloseModalFiles,
    isOpenModalStatutInfraction,
    onCloseModalStatutInfraction,
    actions: Object.entries(actions ?? {})?.map(
      (action) => {
        const [key] = action as [
          ActionInfractionEnum,
          string | string[],
        ];
        return data?.[key];
      }
    ),
  };
};

export default useBuildMenuActionInfractionLot;
