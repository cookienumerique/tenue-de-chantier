import { Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

import TagUrgence from '@/app-components/tag/infraction-lot/TagUrgence';
import SkeletonText from '@/components/skeleton/SkeletonText';
import InfractionLotStatutEnum from '@/enums/InfractionLotStatutEnum';
import InfractionLotUrgenceEnum from '@/enums/InfractionLotUrgenceEnum';

type TitleProps = {
  statut: InfractionLotStatutEnum | undefined;
  urgence: InfractionLotUrgenceEnum | undefined;
  isLoading: boolean;
};

/**
 * @description Affiche le titre et le statut d'une infraction_lot
 */
export default function TitleInfractionLot(
  props: TitleProps
): ReactElement {
  const { statut, urgence, isLoading } = props;

  if (isLoading) {
    return (
      <Stack direction="row">
        <SkeletonText width="7em" />
        <SkeletonText width="4em" />
      </Stack>
    );
  }
  return (
    <Stack direction="row">
      <Text
        color="gray.700"
        fontWeight="bold"
      >
        {statut}
      </Text>
      <TagUrgence urgence={urgence} />
    </Stack>
  );
}
