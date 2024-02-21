import { Stack, Th, Thead, Tr } from '@chakra-ui/react';
import { flexRender, Table } from '@tanstack/react-table';
import { ReactElement } from 'react';
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from 'react-icons/hi';

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
            <Th
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              cursor={
                header.column.getCanSort()
                  ? 'pointer'
                  : 'normal'
              }
            >
              <Stack
                direction="row"
                alignItems="center"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {{
                  asc: <HiOutlineChevronDown size={13} />,
                  desc: <HiOutlineChevronUp size={13} />,
                }[
                  header.column.getIsSorted() as string
                ] ?? null}
              </Stack>
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
  );
};

export default HeadTable;
