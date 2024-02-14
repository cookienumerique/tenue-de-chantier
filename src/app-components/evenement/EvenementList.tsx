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

  const evenementsSortedByDateCreation = evenements?.sort(
    (a, b) => {
      if (a.date && b.date) {
        return (
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
        );
      }
      return 0;
    }
  );
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
          {evenementsSortedByDateCreation?.map(
            (evenement) => (
              <EvenementItem
                evenement={evenement}
                key={evenement?.id}
              />
            )
          )}
        </>
      )}
    </Stack>
  );
}
