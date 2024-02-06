import {
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import {
  RiAlarmWarningFill,
  RiAlarmWarningLine,
} from 'react-icons/ri';

import InfractionLotUrgenceEnum from '@/enums/InfractionLotUrgenceEnum';

type TagUrgenceProps = {
  urgence: InfractionLotUrgenceEnum | undefined;
  width?: string;
};

/**
 * @description Tag d'urgence
 */
export default function TagUrgence(
  props: TagUrgenceProps
): ReactElement {
  const { urgence, width = 'fit-content' } = props;

  let colorScheme = 'gray';
  let icon = RiAlarmWarningFill;

  if (urgence === InfractionLotUrgenceEnum.NON_CRITIQUE) {
    icon = RiAlarmWarningLine;
    colorScheme = 'blue';
  } else if (
    urgence === InfractionLotUrgenceEnum.URGENT
  ) {
    colorScheme = 'red';
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
        <TagLabel>{urgence}</TagLabel>
      </Tag>
    </Stack>
  );
}
