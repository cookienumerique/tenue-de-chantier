import { Icon, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { CiTimer } from 'react-icons/ci';

import ButtonActionsInfractionLot from '@/app-components/button/ButtonActionsInfractionLot';
import TagUrgence from '@/app-components/tag/infraction-lot/TagUrgence';
import SkeletonText from '@/components/skeleton/SkeletonText';
import InfractionLotStatutEnum from '@/enums/InfractionLotStatutEnum';
import InfractionLotUrgenceEnum from '@/enums/InfractionLotUrgenceEnum';
import ActionInfractionType from '@/types/action/ActionInfractionType';

type TitleProps = {
  id: string | undefined;
  statut: InfractionLotStatutEnum | undefined;
  urgence: InfractionLotUrgenceEnum | undefined;
  nbJoursDepuisCreation: number | undefined;
  isLoadingInfractionsLot: boolean;
  actions: ActionInfractionType | undefined;
  isLoadingActions: boolean;
  isErrorActions: boolean;
};

/**
 * @description Affiche le titre et le statut d'une infraction_lot
 */
export default function TitleInfractionLot(
  props: TitleProps
): ReactElement {
  const {
    id,
    statut,
    urgence,
    nbJoursDepuisCreation,
    isLoadingInfractionsLot,
    actions,
    isLoadingActions,
    isErrorActions,
  } = props;

  if (isLoadingInfractionsLot) {
    return (
      <Stack direction="row">
        <SkeletonText width="7em" />
        <SkeletonText width="4em" />
      </Stack>
    );
  }
  return (
    <Stack direction="row">
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={0}
        width="100%"
        justifyContent="space-between"
      >
        {/* Section urgence et statut */}
        <Stack
          direction="row"
          alignItems="center"
        >
          <Text
            color="gray.700"
            fontWeight="bold"
            fontSize="xl"
          >
            {statut}
          </Text>
          <TagUrgence urgence={urgence} />
        </Stack>
        <Stack alignItems="end">
          {/* Section nb jours depuis création */}
          <Stack>
            <ButtonActionsInfractionLot
              actions={actions}
              isLoading={isLoadingActions}
              isError={isErrorActions}
              infractionLotId={id}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            color="gray.700"
            fontSize="xs"
          >
            <Icon
              color="inherit"
              as={CiTimer}
              boxSize={4}
            />
            <Text color="inherit">
              {`${nbJoursDepuisCreation} jours depuis la détection`}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
