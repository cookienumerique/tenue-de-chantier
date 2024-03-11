import { ReactElement } from 'react';

import Input from '@/components/form/Input';

type InputDateButoirProps = {
  name?: string;
  defaultValue?: string | undefined;
  min?: string;
  required?: boolean;
};
export default function InputDateButoir(
  props: InputDateButoirProps
): ReactElement {
  const {
    defaultValue,
    name = 'dateButoir',
    min,
    required = false,
  } = props;

  return (
    <Input
      key={defaultValue}
      min={min}
      label="Date butoir"
      type="date"
      name={name}
      defaultValue={defaultValue}
      required={required}
    />
  );
}
