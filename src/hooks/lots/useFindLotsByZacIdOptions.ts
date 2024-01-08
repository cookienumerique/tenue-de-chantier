import capitalize from '@/functions/capitalize';
import useFindLotByZacId from '@/hooks/lots/useFindLotByZacId';
import LabelValue from '@/interfaces/LabelValue';
import Lot from '@/interfaces/Lot';
import FindByIdProps from '@/types/query/FindByIdProps';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Retrieve all Lot by ZacId and transform them into LabelValue[]
 */
export default function useFindLotsByZacIdOptions({
  id,
}: FindByIdProps): FindByIdReturn<LabelValue[]> {
  const { data, isLoading, isError, invalidate } =
    useFindLotByZacId({ id, enabled: !!id });

  const options = data?.map(
    (lot: Lot): LabelValue => ({
      label: capitalize(lot?.libLot),
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
