import { Stack } from '@chakra-ui/react';
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
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <Stack
          key={headerGroup.id}
          width="100%"
          direction="row"
          gap={0}
        >
          {headerGroup.headers.map((header) => (
            <Stack
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              cursor={
                header.column.getCanSort()
                  ? 'pointer'
                  : 'normal'
              }
              direction="row"
              alignItems="center"
              width="fit-content"
              {...header.column?.columnDef?.meta}
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
              }[header.column.getIsSorted() as string] ??
                null}
            </Stack>
          ))}
        </Stack>
      ))}
    </>
  );
};

export default HeadTable;
