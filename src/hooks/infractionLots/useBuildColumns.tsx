import { Stack, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { FaEye } from 'react-icons/fa';

import TagStatutInfractionLot from '@/app-components/tag/infraction-lot/TagStatutInfractionLot';
import TagUrgence from '@/app-components/tag/infraction-lot/TagUrgence';
import IconButton from '@/components/button/IconButton';
import TextSecondary from '@/components/text/TextSecondary';
import InfractionLot from '@/interfaces/InfractionLot';

export default function useBuildColumns() {
  const columnHelper =
    createColumnHelper<InfractionLot>();
  const { push } = useRouter();
  const commonProps = {
    paddingY: '2xs',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'gray.600',
    fontSize: 'sm',
    paddingX: 'xs',
  };
  const columns = [
    columnHelper.accessor(
      (infractionLot) => infractionLot?.id,
      {
        id: 'action',
        cell: (row) => (
          <Stack
            width="2em"
            border="1px"
          >
            <IconButton
              aria-label="read-infraction-lot"
              backgroundColor="primary.500"
              label="Voir l'infraction"
              color="white"
              size="xs"
              icon={<FaEye color="white" />}
              borderRadius="4em"
              onClick={(e) => {
                e?.preventDefault();
                push(
                  `/infractions-lots/${row?.getValue()}`
                ).then((r) => r);
              }}
            />
          </Stack>
        ),
        header: () => <Stack width="2em" />,
        meta: {
          ...commonProps,
        },
      }
    ),
    columnHelper.accessor(
      (infractionLot) =>
        infractionLot?.lot?.zac?.libZacMin,
      {
        id: 'zac',
        header: () => <Text>ZAC</Text>,
        cell: (row) => row?.getValue(),
        meta: {
          ...commonProps,
          minWidth: '20em',
          color: 'zac.500',
        },
      }
    ),
    columnHelper.accessor(
      (infractionLot) => infractionLot?.lot?.libLot,
      {
        id: 'lot',
        header: () => <Text>Lot</Text>,
        cell: (row) => row?.getValue(),
        meta: {
          ...commonProps,
          color: 'lot.500',
          minWidth: '7em',
        },
      }
    ),
    columnHelper.accessor(
      (infractionLot) => infractionLot?.urgence?.value,
      {
        id: 'urgence',
        header: () => <Text>Urgence</Text>,
        cell: (row) => (
          <TagUrgence
            urgence={row?.getValue()}
            width="fit-content"
          />
        ),
        meta: {
          ...commonProps,
          minWidth: '10em',
        },
      }
    ),
    columnHelper.accessor(
      (infractionLot) => infractionLot?.statut?.value,
      {
        id: 'statut',
        header: () => <Text>Statut</Text>,
        cell: (row) => (
          <TagStatutInfractionLot
            statut={row?.getValue()}
            width="fit-content"
          />
        ),
        meta: {
          ...commonProps,
          minWidth: '20em',
        },
      }
    ),
    columnHelper.accessor(
      (infractionLot) =>
        infractionLot?.infraction?.sousCategorie,
      {
        id: 'sousCategorie',
        header: () => (
          <TextSecondary color="">
            Sous-catégorie
          </TextSecondary>
        ),
        cell: (row) => row?.getValue(),
        meta: {
          ...commonProps,
          minWidth: '45em',
          flex: 1,
        },
      }
    ),
    columnHelper.accessor(
      (infractionLot) =>
        `${infractionLot?.utilisateur?.nom} ${infractionLot?.utilisateur?.prenom}`,
      {
        id: 'utilisateur',
        header: () => <Text>Détecté par</Text>,
        cell: (row) => row?.getValue(),
        meta: {
          ...commonProps,
          minWidth: '15em',
        },
      }
    ),
  ];

  return { columns };
}
