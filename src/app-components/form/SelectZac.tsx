import { ReactElement } from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';

import Select from '@/components/form/Select';
import useFindAllZacSelectOptions from '@/hooks/zacs/useFindAllZacSelectOptions';
import LabelValue from '@/interfaces/LabelValue';

type SelectZacProps = {
  defaultValue?: string | number | null;
  name?: string;
  callbackOnChange?: (
    labelValue: OnChangeValue<
      LabelValue | undefined,
      false
    >,
    meta: ActionMeta<string | number>
  ) => void;
  required?: boolean;
};
/**
 * @description Select Zac
 * @param props
 * @constructor
 */
export default function SelectZac(
  props: SelectZacProps
): ReactElement {
  const {
    defaultValue,
    name = 'zacId',
    callbackOnChange,
    required = false,
  } = props;
  const {
    data: options,
    isLoading,
    isError,
  } = useFindAllZacSelectOptions();

  return (
    <Select
      label="ZAC"
      placeholder="Sélection de la ZAC"
      isLoading={isLoading}
      isError={isError}
      options={options}
      defaultValue={options?.find(
        (option) =>
          option?.value?.toString() ===
          defaultValue?.toString()
      )}
      name={name}
      onChange={callbackOnChange}
      required={required}
    />
  );
}
