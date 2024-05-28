import { ReactElement } from 'react';

import Select from '@/components/form/Select';
import useFindLotsEnChantierOptions from '@/hooks/lots/useFindLotsEnChantierOptions';

type SelectLotProps = {
  defaultValue?: string | number | null;
  name?: string;
  isDisabled?: boolean;
  required?: boolean;
};
/**
 * @description Select Lot by ZacId
 */
export default function SelectLotsEnChantier(
  props: SelectLotProps
): ReactElement {
  const {
    defaultValue,
    name = 'optionLot',
    isDisabled = false,
    required = false,
  } = props;

  const {
    data: options,
    isError: isErrorLot,
    isLoading,
  } = useFindLotsEnChantierOptions();

  return (
    <Select
      label="Lot"
      placeholder="Sélection du lot"
      isError={isErrorLot}
      isLoading={isLoading}
      options={options}
      defaultValue={options?.find(
        (option) =>
          option?.value?.toString() ===
          defaultValue?.toString()
      )}
      name={name}
      required={required}
      isDisabled={isDisabled}
      key={defaultValue}
    />
  );
}
