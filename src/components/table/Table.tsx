import { Grid, GridItem } from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';
import { ReactElement } from 'react';

import BodyTable from '@/components/table/BodyTable';
import HeadTable from '@/components/table/HeadTable';
import InfractionLot from '@/interfaces/InfractionLot';

type RowsTableProps = {
  table: Table<InfractionLot>;
};

const Table = (props: RowsTableProps): ReactElement => {
  const { table } = props;

  return (
    <Grid
      templateColumns="repeat(1, 1fr)"
      gap={0}
      overflowY="scroll"
      width="100%"
    >
      <GridItem w="100%">
        <HeadTable table={table} />
      </GridItem>
      <GridItem w="100%">
        <BodyTable table={table} />
      </GridItem>
    </Grid>
  );
};

export default Table;
