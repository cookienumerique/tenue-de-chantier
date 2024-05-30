import {
  ReactElement,
  useCallback,
  useMemo,
} from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';

import Select from '@/components/form/Select';
import useFindZacWithLotsEnChantiersSelectOptions from '@/hooks/zacs/useFindZacWithLotsEnChantiersSelectOptions';
import LabelValue from '@/interfaces/LabelValue';

type SelectZacWithLotsEnChantiersProps = {
  defaultValue?:
    | Array<LabelValue>
    | LabelValue
    | undefined;
  name?: string;
  callbackOnChange?: (
    labelValue: OnChangeValue<
      LabelValue | undefined,
      false
    >,
    meta: ActionMeta<string | number>
  ) => void;
  required?: boolean;
  isMulti?: boolean;
};
/**
 * @description Select Zac with lots en chantiers
 * @param props
 * @constructor
 */
export default function SelectZacWithLotsEnChantiers(
  props: SelectZacWithLotsEnChantiersProps
): ReactElement {
  const {
    defaultValue,
    name = 'zacId',
    callbackOnChange,
    required = false,
    isMulti = false,
  } = props;
  const {
    data: options,
    isLoading,
    isError,
  } = useFindZacWithLotsEnChantiersSelectOptions();

  // Order the zac list alphabetically
  const zacListOrdered = useMemo(
    () =>
      options?.sort((a, b) => {
        if (!a?.label || !b?.label) {
          return 0;
        }
        return a?.label
          ?.toString()
          ?.localeCompare(b?.label?.toString());
      }),
    [options]
  );

  // Generate the key for the default value, for refresh component
  const generateKey = useCallback(() => {
    // If the default values are array of objects, we need to return a string like "value1,value2"
    if (Array.isArray(defaultValue)) {
      return defaultValue?.reduce((acc, value, key) => {
        return `${acc}${key === 0 ? '' : ','}${value.label}`;
      }, '');
    }
  }, [defaultValue]);

  // Get the default value from the options
  const defaultValueLabel = useMemo(
    () =>
      options
        // Filter the options by the default value
        ?.filter((labelValue) =>
          generateKey()
            ?.split(',')
            ?.includes(labelValue?.value?.toString())
        ),
    [options, generateKey]
  );

  return (
    <Select
      isMulti={isMulti}
      label="ZAC"
      placeholder="Sélection de la ZAC"
      isLoading={isLoading}
      isError={isError}
      options={zacListOrdered}
      defaultValue={defaultValueLabel}
      name={name}
      onChange={callbackOnChange}
      required={required}
      key={generateKey()}
    />
  );
}
