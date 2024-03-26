import { useDisclosure } from '@chakra-ui/hooks';
import { AiOutlineComment } from 'react-icons/ai';
import { CgArrowsExchange } from 'react-icons/cg';
import {
  IoCalendarSharp,
  IoMailOutline,
} from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { RiDownloadCloudLine } from 'react-icons/ri';
import { TbPhotoShare } from 'react-icons/tb';

import ActionInfractionEnum from '@/enums/ActionInfractionEnum';
import PatrimoineZacEnum from '@/enums/PatrimoineZacEnum';
import downloadTemplate from '@/functions/file/downloadTemplate';
import ActionInfractionType from '@/types/action/ActionInfractionType';

type BuildMenuActionInfractionLotProps = {
  actions: ActionInfractionType | undefined;
  patrimoineZac: PatrimoineZacEnum | undefined;
};

type BuildMenuActionInfractionLotReturn = {
  isOpenModalFiles: boolean;
  onCloseModalFiles: () => void;
  isOpenModalStatutInfraction: boolean;
  onCloseModalStatutInfraction: () => void;
  isOpenModalDateButoir: boolean;
  onCloseModalDateButoir: () => void;
  isOpenModalCommentaireInfraction: boolean;
  onCloseModalCommentaireInfraction: () => void;
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
  patrimoineZac,
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

  const {
    isOpen: isOpenModalCommentaireInfraction,
    onOpen: onOpenModalCommentaireInfraction,
    onClose: onCloseModalCommentaireInfraction,
  } = useDisclosure();

  const {
    isOpen: isOpenModalDateButoir,
    onOpen: onOpenModalDateButoir,
    onClose: onCloseModalDateButoir,
  } = useDisclosure();

  const data = {
    [ActionInfractionEnum.UPLOAD_FILES]: {
      label: 'Ajouter des photos',
      icon: TbPhotoShare,
      onClick: () => onOpenModalFiles(),
    },
    [ActionInfractionEnum.AJOUTER_COMMENTAIRE]: {
      label: 'Ajouter un commentaire',
      icon: AiOutlineComment,
      onClick: () => onOpenModalCommentaireInfraction(),
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
          downloadTemplate({
            fileName: `${patrimoineZac}/courrier_infraction.docx`,
          }).then((r) => r),
      },
    [ActionInfractionEnum.ECRIRE_COURRIER_CONSTAT_CARENCE]:
      {
        label: 'Ecrire un courrier de constat de carence',
        icon: RiDownloadCloudLine,
        onClick: () =>
          downloadTemplate({
            fileName: `${patrimoineZac}/courrier_de_carence.docx`,
          }).then((r) => r),
      },
    [ActionInfractionEnum.ECRIRE_COURRIER_COMPLEMENTAIRE]:
      {
        label: 'Ecrire un courrier complémentaire',
        icon: RiDownloadCloudLine,
        onClick: () =>
          downloadTemplate({
            fileName: `${patrimoineZac}/courrier_constat_de_récidive.docx`,
          }).then((r) => r),
      },
    [ActionInfractionEnum.CHANGER_STATUT]: {
      label: 'Changer de statut',
      icon: CgArrowsExchange,
      onClick: () => onOpenModalStatutInfraction(),
    },
    [ActionInfractionEnum.MODIFIER_DATE_BUTOIR]: {
      label: 'Modifier la date butoir',
      icon: IoCalendarSharp,
      onClick: () => onOpenModalDateButoir(),
    },
  };

  return {
    isOpenModalFiles,
    onCloseModalFiles,
    isOpenModalStatutInfraction,
    onCloseModalStatutInfraction,
    isOpenModalDateButoir,
    onCloseModalDateButoir,
    isOpenModalCommentaireInfraction,
    onCloseModalCommentaireInfraction,
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
