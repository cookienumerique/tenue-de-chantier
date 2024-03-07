import { ReactElement } from 'react';

import Select from '@/components/form/Select';
import useFindEnumsByEnumName from '@/hooks/enums/useFindEnumsByEnum';

type SelectInfractionLotUrgenceProps = {
  defaultValue?: string | number | null;
  name?: string;
  required?: boolean;
};
/**
 * @description Select les dégrés d'urgence infraction_lot
 */
export default function SelectInfractionLotUrgence(
  props: SelectInfractionLotUrgenceProps
): ReactElement {
  const {
    defaultValue,
    name = 'optionUrgence',
    required = false,
  } = props;

  const {
    data: enums,
    isLoading,
    isError,
  } = useFindEnumsByEnumName({
    enumName: 'InfractionLotUrgenceEnum',
  });

  const options = enums?.map((enumItem) => ({
    value: enumItem,
    label: enumItem,
  }));

  return (
    <Select
      label="Degré d'urgence"
      placeholder={options?.[0]?.label}
      isLoading={isLoading}
      isError={isError}
      options={options}
      defaultValue={options?.find(
        (option) => option.value === defaultValue
      )}
      name={name}
      required={required}
    />
  );
}
