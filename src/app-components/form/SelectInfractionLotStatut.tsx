import { ReactElement } from 'react';

import Select from '@/components/form/Select';
import useFindEnumsByEnumName from '@/hooks/enums/useFindEnumsByEnum';
import LabelValue from '@/interfaces/LabelValue';

type SelectInfractionLotStatutProps = {
  defaultValue?:
    | Array<LabelValue>
    | LabelValue
    | undefined;
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

  // Generate a key for the defaultValue for refresh component
  const generateKey = () => {
    // If the default values are array of objects, we need to return a string like "value1,value2"
    if (Array.isArray(defaultValue)) {
      return defaultValue?.reduce((acc, value) => {
        return `${acc},${value.value}`;
      }, '');
    }
  };

  return (
    <Select
      isMulti
      label="Statut de l'infraction"
      placeholder={options?.[0]?.label}
      isLoading={isLoading}
      isError={isError}
      options={options}
      defaultValue={defaultValue}
      name={name}
      required={required}
      key={generateKey()}
    />
  );
}
