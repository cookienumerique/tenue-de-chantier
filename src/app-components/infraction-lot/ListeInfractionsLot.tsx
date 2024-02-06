import {
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import AlertErrorFetchData from '@/components/alert/AlertErrorFetchData';
import SkeletonList from '@/components/skeleton/SkeletonList';
import Table from '@/components/table/Table';
import useBuildColumns from '@/hooks/infractionLots/useBuildColumns';
import InfractionLot from '@/interfaces/InfractionLot';

type ListeInfractionsLotProps = {
  data: InfractionLot[] | undefined;
  isLoading: boolean;
  isError: boolean;
};
/**
 * @description List of infraction lots
 * @param props
 * @constructor
 */
const ListeInfractionsLot = (
  props: ListeInfractionsLotProps
): ReactElement => {
  const {
    data: infractionsLot,
    isLoading,
    isError,
  } = props;
  const { columns } = useBuildColumns();
  const { push } = useRouter();

  const table = useReactTable({
    columns,
    data: infractionsLot as InfractionLot[],
    getCoreRowModel: getCoreRowModel(),
  });

  const onClickRow = (infractionLot: InfractionLot) =>
    push(`/infractions-lots/${infractionLot?.id}`);

  if (isLoading) {
    return <SkeletonList />;
  }

  if (isError) {
    return <AlertErrorFetchData />;
  }

  return (
    <Table
      table={table}
      onClickRow={onClickRow}
    />
  );
};

export default ListeInfractionsLot;
