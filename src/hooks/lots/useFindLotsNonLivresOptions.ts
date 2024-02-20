import useFindAllLot from '@/hooks/lots/useFindAllLot';
import LabelValue from '@/interfaces/LabelValue';
import Lot from '@/interfaces/Lot';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Retrieve all Lot not delivery and transform them into LabelValue[]
 */
export default function useFindLotsNonLivresOptions(): FindByIdReturn<
  LabelValue[]
> {
  const queryParameters = new URLSearchParams({
    livre: 'no',
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
