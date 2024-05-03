import { Stack } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { TbTimelineEventText } from 'react-icons/tb';

import Card from '@/app-components/card/Card';
import EvenementList from '@/app-components/evenement/EvenementList';
import Evenement from '@/interfaces/Evenement';

type CardEvenementProps = {
  isLoading: boolean;
  isError: boolean;
  evenements: Evenement[] | undefined;
};

/**
 * @description Affiche les informations d'evenements
 */
export default function CardEvenement(
  props: CardEvenementProps
): ReactElement {
  const { isLoading, isError, evenements } = props;

  return (
    <Card
      title="Évenements"
      isError={isError}
      isLoading={isLoading}
      color="evenement.600"
      icon={<TbTimelineEventText size={20} />}
    >
      <Stack
        maxHeight="20em"
        overflowY="scroll"
      >
        <EvenementList evenements={evenements} />
      </Stack>
    </Card>
  );
}
