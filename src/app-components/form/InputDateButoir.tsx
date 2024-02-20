import { ReactElement } from 'react';

import Input from '@/components/form/Input';

type InputDateButoirProps = {
  name?: string;
  defaultValue?: string | undefined;
  min?: string;
};
export default function InputDateButoir(
  props: InputDateButoirProps
): ReactElement {
  const {
    defaultValue,
    name = 'dateButoir',
    min,
  } = props;

  return (
    <Input
      key={defaultValue}
      min={min}
      label="Date butoir"
      type="date"
      name={name}
      defaultValue={defaultValue}
    />
  );
}
