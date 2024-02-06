import {
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { BsFillSendArrowUpFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { MdMarkEmailRead } from 'react-icons/md';
import {
  RiEye2Line,
  RiTimerFlashFill,
} from 'react-icons/ri';

import InfractionLotStatutEnum from '@/enums/InfractionLotStatutEnum';

type TagStatutInfractionLotProps = {
  statut: InfractionLotStatutEnum | undefined;
  width?: string;
};

/**
 * @description Tag d'urgence
 */
export default function TagStatutInfractionLot(
  props: TagStatutInfractionLotProps
): ReactElement {
  const { statut, width = 'fit-content' } = props;

  let colorScheme = 'red';
  let icon = HiLockClosed;

  if (
    statut === InfractionLotStatutEnum.DETECTION_INITIAL
  ) {
    icon = RiEye2Line;
    colorScheme = 'gray';
  } else if (
    statut ===
    InfractionLotStatutEnum.CONTACT_AMIABLE_ETABLI
  ) {
    colorScheme = 'blue';
    icon = MdMarkEmailRead;
  } else if (
    statut ===
      InfractionLotStatutEnum.CONSTAT_DE_MISE_EN_DEMEURE_ENVOYE ||
    statut ===
      InfractionLotStatutEnum.CONSTAT_DE_CARENCE_ENVOYE
  ) {
    icon = BsFillSendArrowUpFill;
    colorScheme = 'purple';
  } else if (
    statut ===
      InfractionLotStatutEnum.DELAI_AMIABLE_DEPASSE ||
    statut ===
      InfractionLotStatutEnum.DELAI_DE_MISE_EN_DEMEURE_DEPASSE
  ) {
    icon = RiTimerFlashFill;
    colorScheme = 'orange';
  } else if (
    statut ===
      InfractionLotStatutEnum.RESOLU_SUITE_AU_CONSTAT_DE_CARENCE ||
    statut ===
      InfractionLotStatutEnum.PRESOMPTION_DE_RESOLUTION
  ) {
    icon = IoIosCheckmarkCircle;
    colorScheme = 'green';
  }

  return (
    <Stack
      spacing={4}
      width={width}
    >
      <Tag
        colorScheme={colorScheme}
        size="sm"
        as="div"
        height="min-content"
      >
        <TagLeftIcon as={icon} />
        <TagLabel>{statut}</TagLabel>
      </Tag>
    </Stack>
  );
}
