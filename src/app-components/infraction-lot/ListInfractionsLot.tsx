import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ReactElement, useState } from 'react';

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
const ListInfractionsLot = (
  props: ListeInfractionsLotProps
): ReactElement => {
  const {
    data: infractionsLot,
    isLoading,
    isError,
  } = props;
  const { columns } = useBuildColumns();
  const [sorting, setSorting] = useState<SortingState>(
    []
  );
  const table = useReactTable({
    columns,
    data: infractionsLot as InfractionLot[],
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return <SkeletonList />;
  }

  if (isError) {
    return <AlertErrorFetchData />;
  }

  return <Table table={table} />;
};

export default ListInfractionsLot;
