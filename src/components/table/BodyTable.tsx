import { Tbody, Th, Tr } from '@chakra-ui/react';
import { flexRender, Table } from '@tanstack/react-table';
import { ReactElement } from 'react';

import InfractionLot from '@/interfaces/InfractionLot';

type RowsTableProps<T> = {
  table: Table<T>;
  onClickRow: (infractionLot: T) => void;
  messageNoResult?: string;
};

const BodyTable = (
  props: RowsTableProps<InfractionLot>
): ReactElement => {
  const {
    table,
    onClickRow,
    messageNoResult = 'Aucun résultat',
  } = props;
  return (
    <Tbody>
      {table?.getRowModel().rows.length === 0 ? (
        <Tr>
          <Th
            textAlign="center"
            colSpan={
              table.getHeaderGroups()?.[0]?.headers
                ?.length
            }
          >
            {messageNoResult}
          </Th>
        </Tr>
      ) : (
        table?.getRowModel().rows.map((row, index) => (
          <Tr
            key={row.id}
            backgroundColor={
              index % 2 === 0 ? 'white' : 'gray.50'
            }
            _hover={{
              backgroundColor: 'gray.100',
              boxShadow: 'sm',
            }}
            cursor="pointer"
          >
            {row.getVisibleCells().map((cell) => (
              <Th
                color={
                  // @ts-expect-error color is not in the type
                  cell.column?.columnDef?.meta?.color
                }
                key={cell?.id}
                onClick={() =>
                  onClickRow(cell?.row?.original)
                }
              >
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </Th>
            ))}
          </Tr>
        ))
      )}
    </Tbody>
  );
};

export default BodyTable;
