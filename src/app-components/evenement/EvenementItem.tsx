import { Stack, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import EvenementItemByType from '@/app-components/evenement/EvenementItemByType';
import EvenementTypeEnum from '@/enums/EvenementTypeEnum';
import formatDate from '@/functions/date/formatDate';
import Evenement from '@/interfaces/Evenement';

type EvenementItemProps = {
  evenement: Evenement | undefined;
};

/**
 * @description Affiche un item d'evenement
 */
export default function EvenementItem(
  props: EvenementItemProps
): ReactElement {
  const { evenement } = props;

  const color = 'gray.100';

  // If the event is of type "Ajouter document" and there is no file, we don't display anything
  if (
    evenement?.type ===
      EvenementTypeEnum.AJOUTER_DOCUMENT &&
    evenement?.files?.length === 0
  ) {
    return <></>;
  }

  return (
    <Stack
      borderY={`1px solid`}
      borderColor={color}
      paddingBottom="2xs"
    >
      <Stack
        backgroundColor={color}
        borderBottomRadius="4px"
        width="fit-content"
      >
        <Text
          paddingX="2xs"
          fontWeight="bold"
          fontSize="sm"
          color="gray.800"
        >
          {evenement?.type}
        </Text>
      </Stack>
      <EvenementItemByType
        type={evenement?.type}
        valeur={evenement?.valeur}
        files={evenement?.files}
      />
      <Text
        fontSize="xs"
        color="gray.500"
        textAlign="right"
      >
        {`Le ${formatDate(
          evenement?.date,
          'DD/MM/YYYY à HH:mm'
        )} par ${
          evenement?.utilisateur?.prenom
        } ${evenement?.utilisateur?.nom}.`}
      </Text>
    </Stack>
  );
}
