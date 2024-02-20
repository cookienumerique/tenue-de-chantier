import { ReactElement } from 'react';

import Select from '@/components/form/Select';
import useFindEnumsByEnumName from '@/hooks/enums/useFindEnumsByEnum';

type SelectInfractionLotStatutProps = {
  defaultValue?: string | number | null;
  name?: string;
  required?: boolean;
};
/**
 * @description Select les statuts infraction_lot
 */
export default function SelectInfractionLotStatut(
  props: SelectInfractionLotStatutProps
): ReactElement {
  const {
    defaultValue,
    name = 'optionStatut',
    required = false,
  } = props;

  const {
    data: enums,
    isLoading,
    isError,
  } = useFindEnumsByEnumName({
    enumName: 'InfractionLotStatutEnum',
  });

  const options = enums?.map((enumItem) => ({
    value: enumItem,
    label: enumItem,
  }));

  return (
    <Select
      label="Statut de l'infraction"
      placeholder={options?.[0]?.label}
      isLoading={isLoading}
      isError={isError}
      options={options}
      defaultValue={options?.find(
        (option) => option.value === defaultValue
      )}
      name={name}
      required={required}
      key={defaultValue}
    />
  );
}
