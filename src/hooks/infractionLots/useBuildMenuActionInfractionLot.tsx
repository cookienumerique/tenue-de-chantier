import { useDisclosure } from '@chakra-ui/hooks';
import { As } from '@chakra-ui/react';
import { AiOutlineComment } from 'react-icons/ai';
import { CgArrowsExchange } from 'react-icons/cg';
import {
  IoCalendarSharp,
  IoMailOutline,
} from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { RiDownloadCloudLine } from 'react-icons/ri';
import { TbPhotoShare } from 'react-icons/tb';
import nl2br from 'react-nl2br';

import ActionInfractionEnum from '@/enums/ActionInfractionEnum';
import PatrimoineZacEnum from '@/enums/PatrimoineZacEnum';
import downloadTemplate from '@/functions/file/downloadTemplate';
import useFindContentEmailByInfractionId from '@/hooks/infractionLots/useFindContentEmailByInfractionId';
import ActionInfractionType from '@/types/action/ActionInfractionType';

type BuildMenuActionInfractionLotProps = {
  actions: ActionInfractionType | undefined;
  infractionLotId: string | undefined;
  patrimoineZac: PatrimoineZacEnum | undefined;
};
export type Actions = {
  label: string;
  icon: IconType;
  onClick?: () => void;
  as?: As | undefined;
  href?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}[];

type BuildMenuActionInfractionLotReturn = {
  isOpenModalFiles: boolean;
  onCloseModalFiles: () => void;
  isOpenModalStatutInfraction: boolean;
  onCloseModalStatutInfraction: () => void;
  isOpenModalDateButoir: boolean;
  onCloseModalDateButoir: () => void;
  isOpenModalCommentaireInfraction: boolean;
  onCloseModalCommentaireInfraction: () => void;
  actions: Actions;
};
/**
 * @description Build menu action infraction lot
 */
const useBuildMenuActionInfractionLot = ({
  actions,
  infractionLotId,
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

  const {
    data: contentEmail,
    isLoading: isLoadingContentEmail,
  } = useFindContentEmailByInfractionId({
    id: infractionLotId,
  });

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
      as: 'a' as As,
      href: `mailto:?subject=${contentEmail?.email?.subject}&body=${nl2br(contentEmail?.email?.body)}`,
      label: 'Écrire un email',
      icon: IoMailOutline,
      isLoading: isLoadingContentEmail,
      isDisabled: isLoadingContentEmail,
    },
    [ActionInfractionEnum.ECRIRE_COURRIER_MISE_EN_DEMEURE]:
      {
        label: 'Écrire un courrier de mise en demeure',
        icon: RiDownloadCloudLine,
        onClick: () =>
          downloadTemplate({
            fileName: `${patrimoineZac}/courrier_infraction.docx`,
          }).then((r) => r),
      },
    [ActionInfractionEnum.ECRIRE_COURRIER_CONSTAT_CARENCE]:
      {
        label: 'Écrire un courrier de constat de carence',
        icon: RiDownloadCloudLine,
        onClick: () =>
          downloadTemplate({
            fileName: `${patrimoineZac}/courrier_de_carence.docx`,
          }).then((r) => r),
      },
    [ActionInfractionEnum.ECRIRE_COURRIER_COMPLEMENTAIRE]:
      {
        label: 'Écrire un courrier complémentaire',
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
