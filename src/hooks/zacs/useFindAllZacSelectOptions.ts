import capitalize from '@/functions/capitalize';
import useFindAllZac from '@/hooks/zacs/useFindAllZac';
import LabelValue from '@/interfaces/LabelValue';
import Zac from '@/interfaces/Zac';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description Convertir les ZAC en options pour les select
 */
export default function useFindAllZacSelectOptions(): FindListReturn<
  LabelValue[]
> {
  const { data, isLoading, isError, invalidate } =
    useFindAllZac();

  const options = data?.map(
    (zac: Zac): LabelValue => ({
      label: capitalize(zac?.libZacMin),
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
