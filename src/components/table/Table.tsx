import {
  Table as TableChakra,
  TableContainer,
} from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';
import { ReactElement } from 'react';

import BodyTable from '@/components/table/BodyTable';
import HeadTable from '@/components/table/HeadTable';
import InfractionLot from '@/interfaces/InfractionLot';

type RowsTableProps = {
  table: Table<InfractionLot>;
  onClickRow: (infractionLot: InfractionLot) => void;
};

const Table = (props: RowsTableProps): ReactElement => {
  const { table, onClickRow } = props;
  return (
    <TableContainer backgroundColor="white">
      <TableChakra
        size="md"
        variant="striped"
        colorScheme="gray"
      >
        <HeadTable table={table} />
        <BodyTable
          table={table}
          onClickRow={onClickRow}
        />
      </TableChakra>
    </TableContainer>
  );
};

export default Table;
