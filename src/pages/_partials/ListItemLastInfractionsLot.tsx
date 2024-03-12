import { Box, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

import TextSecondary from '@/components/text/TextSecondary';
import capitalize from '@/functions/capitalize';
import formatDate from '@/functions/date/formatDate';
import InfractionLot from '@/interfaces/InfractionLot';

type ListItemLastInfractionsLotProps = {
  infractionLot: InfractionLot;
  onRowClicked: (id: string) => void;
};
/**
 * @description Item list of last infractions
 * @param props
 * @constructor
 */
export default function ListItemLastInfractionsLot(
  props: ListItemLastInfractionsLotProps
): ReactElement {
  const { infractionLot, onRowClicked } = props;
  return (
    <Stack
      gap="3xs"
      key={infractionLot?.id}
      backgroundColor="gray.50"
      borderRadius="md"
      paddingY="2xs"
      paddingX="xs"
      cursor="pointer"
      _hover={{
        backgroundColor: 'gray.100',
      }}
      onClick={() => onRowClicked(infractionLot?.id)}
      fontSize="sm"
    >
      <Stack direction="row">
        <Text fontSize="md">
          <Box
            as="span"
            color="zac.500"
            fontWeight="bold"
          >
            {infractionLot?.lot?.zac?.libZacMin}
          </Box>
          {` - `}
          <Box
            as="span"
            color="lot.500"
            fontWeight="bold"
          >
            {infractionLot?.lot?.libLot}
          </Box>
        </Text>
      </Stack>

      <Text fontSize="xs">
        {capitalize(
          infractionLot?.infraction?.sousCategorie
        )}
      </Text>
      <TextSecondary
        textAlign="right"
        fontStyle="italic"
        fontSize="xs"
      >
        {`Détecté par ${
          infractionLot?.utilisateur?.nom
        } ${
          infractionLot?.utilisateur?.prenom
        }, le ${formatDate(
          infractionLot?.date,
          'DD/MM/YYYY à HH:mm'
        )} `}
      </TextSecondary>
    </Stack>
  );
}
