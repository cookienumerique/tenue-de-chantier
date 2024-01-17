import { Stack, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import EvenementItem from '@/app-components/evenement/EvenementItem';
import Evenement from '@/interfaces/Evenement';

type EvenementListProps = {
  evenements: Evenement[] | undefined;
};

/**
 * @description Affiche une liste d'evenements
 */
export default function EvenementList(
  props: EvenementListProps
): ReactElement {
  const { evenements } = props;

  return (
    <Stack spacing="xs">
      {evenements?.length === 0 ? (
        <Text
          as="i"
          textAlign="center"
        >
          Aucun événement enregistré
        </Text>
      ) : (
        <>
          {evenements?.map((evenement) => (
            <EvenementItem
              evenement={evenement}
              key={evenement?.id}
            />
          ))}
        </>
      )}
    </Stack>
  );
}
