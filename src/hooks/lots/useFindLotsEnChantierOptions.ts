import useFindAllLot from '@/hooks/lots/useFindAllLot';
import LabelValue from '@/interfaces/LabelValue';
import Lot from '@/interfaces/Lot';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Retrieve all lots that are not delivered
 */
export default function useFindLotsEnChantierOptions(): FindByIdReturn<
  LabelValue[]
> {
  const queryParameters = new URLSearchParams({
    enChantier: 'true',
  });

  const { data, isLoading, isError, invalidate } =
    useFindAllLot({ queryParameters });

  // Filtrer les lots livrés / non livrés
  const options = data
    ?.filter((lotItem) => !lotItem?.livre)
    ?.map(
      (lot: Lot): LabelValue => ({
        label: lot?.libLot,
        value: lot.id,
      })
    );

  return {
    data: options,
    isLoading,
    isError,
    invalidate,
  };
}
