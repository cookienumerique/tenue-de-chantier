import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import AlertErrorFetchData from '@/components/alert/AlertErrorFetchData';
import SkeletonList from '@/components/skeleton/SkeletonList';
import InfractionLot from '@/interfaces/InfractionLot';
import ListItemLastInfractionsLot from '@/pages/_partials/ListItemLastInfractionsLot';

type ListLastInfractionsLotProps = {
  isLoading: boolean;
  isError: boolean;
  infractionsLot: InfractionLot[] | undefined;
  onRowClicked: (id: string) => void;
};
/**
 * @description List items list of last infractions
 * @param props
 * @constructor
 */
export default function ListLastInfractionsLot(
  props: ListLastInfractionsLotProps
): ReactElement {
  const {
    isLoading,
    isError,
    infractionsLot,
    onRowClicked,
  } = props;
  return (
    <Stack>
      {isLoading ? <SkeletonList height={20} /> : <></>}

      {isError ? <AlertErrorFetchData /> : <></>}

      {infractionsLot?.map((infractionLot) => (
        <ListItemLastInfractionsLot
          key={infractionLot?.id}
          infractionLot={infractionLot}
          onRowClicked={onRowClicked}
        />
      ))}
    </Stack>
  );
}
