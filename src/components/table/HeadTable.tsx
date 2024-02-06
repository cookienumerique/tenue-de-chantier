import { Th, Thead, Tr } from '@chakra-ui/react';
import { flexRender, Table } from '@tanstack/react-table';
import { ReactElement } from 'react';

import InfractionLot from '@/interfaces/InfractionLot';

type HeadTableProps = {
  table: Table<InfractionLot>;
};

const HeadTable = (
  props: HeadTableProps
): ReactElement => {
  const { table } = props;
  return (
    <Thead borderRadius="sm">
      {table.getHeaderGroups().map((headerGroup) => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
  );
};

export default HeadTable;
