import useFindAllLot from '@/hooks/lots/useFindAllLot';
import LabelValue from '@/interfaces/LabelValue';
import Lot from '@/interfaces/Lot';
import FindByIdProps from '@/types/query/FindByIdProps';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Retrieve all Lot by ZacId and transform them into LabelValue[]
 */
export default function useFindLotsEnChantierByZacIdOptions({
  id,
}: FindByIdProps): FindByIdReturn<LabelValue[]> {
  const queryParameters = new URLSearchParams({
    zacId: id?.toString() as string,
    enChantier: 'true',
  });
  const { data, isLoading, isError, invalidate } =
    useFindAllLot({ queryParameters, enabled: !!id });

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
    isLoading: isLoading && !!id,
    isError,
    invalidate,
  };
}
