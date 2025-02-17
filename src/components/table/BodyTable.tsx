import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Stack,
} from '@chakra-ui/react';
import { flexRender, Table } from '@tanstack/react-table';
import { ReactElement } from 'react';

import LabelValue from '@/components/text/LabelValue';
import TextSecondary from '@/components/text/TextSecondary';
import InfractionLot from '@/interfaces/InfractionLot';

type RowsTableProps<T> = {
  table: Table<T>;
  messageNoResult?: string;
};

const BodyTable = (
  props: RowsTableProps<InfractionLot>
): ReactElement => {
  const { table, messageNoResult = 'Aucun résultat' } =
    props;
  return (
    <>
      {/* When no result */}
      {table?.getRowModel().rows.length === 0 ? (
        <Stack
          backgroundColor="white"
          padding="sm"
        >
          <TextSecondary textAlign="center">
            {messageNoResult}
          </TextSecondary>
        </Stack>
      ) : (
        <Accordion
          width="100%"
          allowMultiple
        >
          {table?.getRowModel().rows.map((row, index) => (
            <AccordionItem
              as="div"
              cursor="pointer"
              key={row.id}
              backgroundColor={
                index % 2 === 0 ? 'white' : 'gray.50'
              }
              _hover={{
                backgroundColor: 'gray.100',
                boxShadow: 'sm',
              }}
              border="1px"
              borderColor="gray.200"
            >
              <AccordionButton padding={0}>
                {row.getVisibleCells().map((cell) => (
                  <Stack
                    {...cell.column?.columnDef?.meta}
                    key={cell?.id}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </Stack>
                ))}
              </AccordionButton>
              <AccordionPanel>
                <Stack>
                  <LabelValue
                    label="libellé"
                    value={
                      row?.original?.infraction?.libelle
                    }
                  />

                  <LabelValue
                    label="Contact"
                    value={`${row?.original?.lot?.nom ? row?.original?.lot?.nom : 'Non renseigné'} ${row?.original?.lot?.prenom ?? ''}`}
                  />

                  <LabelValue
                    label="Entreprise"
                    value={
                      row?.original?.lot?.societe ??
                      'Non renseigné'
                    }
                  />

                  <LabelValue
                    label="Email"
                    value={
                      row?.original?.lot?.mail ??
                      'Non renseigné'
                    }
                  />
                  <LabelValue
                    label="Téléphone"
                    value={
                      row?.original?.lot?.tel ??
                      'Non renseigné'
                    }
                  />
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default BodyTable;
