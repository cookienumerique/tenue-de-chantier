import { Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';

import TagStatutInfractionLot from '@/app-components/tag/infraction-lot/TagStatutInfractionLot';
import TagUrgence from '@/app-components/tag/infraction-lot/TagUrgence';
import InfractionLot from '@/interfaces/InfractionLot';

export default function useBuildColumns() {
  const columnHelper =
    createColumnHelper<InfractionLot>();
  const columns = [
    columnHelper.accessor(
      (infractionLot) =>
        infractionLot?.lot?.zac?.libZacMin,
      {
        id: 'zac',
        header: () => <Text>ZAC</Text>,
        cell: (row) => row?.getValue(),
        meta: {
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
          color: 'lot.500',
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
      }
    ),
    columnHelper.accessor(
      (infractionLot) => (
        <TagStatutInfractionLot
          statut={infractionLot?.statut?.value}
          width="fit-content"
        />
      ),
      {
        id: 'statut',
        header: () => <Text>Statut</Text>,
        cell: (row) => row?.getValue(),
      }
    ),
    columnHelper.accessor(
      (infractionLot) =>
        infractionLot?.infraction?.sousCategorie,
      {
        id: 'sousCategorie',
        header: () => <Text>Sous-catégorie</Text>,
        cell: (row) => row?.getValue(),
      }
    ),
    columnHelper.accessor(
      (infractionLot) =>
        `${infractionLot?.utilisateur?.nom} ${infractionLot?.utilisateur?.prenom}`,
      {
        id: 'utilisateur',
        header: () => <Text>Détécté par</Text>,
        cell: (row) => row?.getValue(),
      }
    ),
  ];

  return { columns };
}
