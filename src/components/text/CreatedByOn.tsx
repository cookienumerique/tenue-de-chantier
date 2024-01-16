import { Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import SkeletonText from '@/components/skeleton/SkeletonText';
import formatDate from '@/functions/date/formatDate';

type CreatedByOnProps = {
  nom: string | undefined;
  date: string | undefined;
  isLoading: boolean;
};
/**
 * @description Afficher le nom de l'utilisateur et la date de création
 */
export default function CreatedByOn(
  props: CreatedByOnProps
): ReactElement {
  const { nom, date, isLoading } = props;

  if (isLoading) {
    return (
      <SkeletonText
        width="7em"
        skeletonHeight={2}
        noOfLines={1}
      />
    );
  }

  return (
    <Text
      fontSize="xs"
      color="gray.500"
    >{`Créé par ${nom}, le ${formatDate(date)}`}</Text>
  );
}
