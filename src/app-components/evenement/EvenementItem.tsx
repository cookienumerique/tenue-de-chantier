import { Stack, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import EvenementItemByType from '@/app-components/evenement/EvenementItemByType';
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
          {evenement?.type?.value}
        </Text>
      </Stack>
      <EvenementItemByType
        type={evenement?.type}
        valeur={evenement?.valeur}
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
