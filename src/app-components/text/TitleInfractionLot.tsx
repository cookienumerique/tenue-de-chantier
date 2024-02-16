import { Icon, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { CiTimer } from 'react-icons/ci';
import { IoCalendarSharp } from 'react-icons/io5';

import ButtonActionsInfractionLot from '@/app-components/button/ButtonActionsInfractionLot';
import TagUrgence from '@/app-components/tag/infraction-lot/TagUrgence';
import SkeletonText from '@/components/skeleton/SkeletonText';
import CreatedByOn from '@/components/text/CreatedByOn';
import InfractionLotStatutEnum from '@/enums/InfractionLotStatutEnum';
import InfractionLotUrgenceEnum from '@/enums/InfractionLotUrgenceEnum';
import Utilisateur from '@/interfaces/Utilisateur';
import ActionInfractionType from '@/types/action/ActionInfractionType';

type TitleProps = {
  id: string | undefined;
  statut: InfractionLotStatutEnum | undefined;
  urgence: InfractionLotUrgenceEnum | undefined;
  utilisateur: Utilisateur | undefined;
  date: string | undefined;
  nbJoursDepuisCreation: number | undefined;
  nbJoursDateButoir: number | undefined;
  isLoadingInfractionsLot: boolean;
  isLoadingUtilisateur: boolean;
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
    date,
    utilisateur,
    isLoadingUtilisateur,
    nbJoursDateButoir,
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
        <Stack gap="3xs">
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
          <CreatedByOn
            textAlign={{ base: 'right', sm: 'left' }}
            nom={`${utilisateur?.nom} ${utilisateur?.prenom}`}
            date={date}
            isLoading={isLoadingUtilisateur}
          />
        </Stack>
        <Stack
          alignItems="end"
          direction={{ base: 'column', md: 'row' }}
        >
          {/* Section nb jours depuis création */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            gap="md"
          >
            <Stack
              color="gray.700"
              fontSize="xs"
              gap="3xs"
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="end"
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
              <Stack
                direction="row"
                alignItems="center"
              >
                <Icon
                  color="inherit"
                  as={IoCalendarSharp}
                  boxSize={4}
                />
                <Text color="inherit">
                  {`${nbJoursDateButoir} jours restants avant la date butoir`}
                </Text>
              </Stack>
            </Stack>
            <ButtonActionsInfractionLot
              actions={actions}
              isLoading={isLoadingActions}
              isError={isErrorActions}
              infractionLotId={id}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
