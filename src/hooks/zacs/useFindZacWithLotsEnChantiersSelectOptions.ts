import useFindZacWithLotsEnChantiers from '@/hooks/zacs/useFindZacWithLotsEnChantiers';
import LabelValue from '@/interfaces/LabelValue';
import Zac from '@/interfaces/Zac';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description Convert zac with lots en chantiers to select options
 */
export default function useFindZacWithLotsEnChantiersSelectOptions(): FindListReturn<
  LabelValue[]
> {
  const { data, isLoading, isError, invalidate } =
    useFindZacWithLotsEnChantiers();

  const options = data?.map(
    (zac: Zac): LabelValue => ({
      label: zac?.libZacMin,
      value: zac.id,
    })
  );

  return {
    data: options,
    isLoading,
    isError,
    invalidate,
  };
}
