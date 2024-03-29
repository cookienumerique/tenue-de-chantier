import { ReactElement } from 'react';

import Input from '@/components/form/Input';

type InputDateButoirProps = {
  name?: string;
  defaultValue?: string | undefined;
  min?: string;
  required?: boolean;
  label?: string;
};
export default function InputDateButoir(
  props: InputDateButoirProps
): ReactElement {
  const {
    defaultValue,
    name = 'dateButoir',
    min,
    required = false,
    label = 'Date butoir',
  } = props;

  return (
    <Input
      key={defaultValue}
      min={min}
      label={label}
      type="date"
      name={name}
      defaultValue={defaultValue}
      required={required}
    />
  );
}
