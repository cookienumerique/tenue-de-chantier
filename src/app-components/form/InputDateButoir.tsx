import { ReactElement } from 'react';

import Input from '@/components/form/Input';

type InputDateButoirProps = {
  defaultValue: string | undefined;
};
export default function InputDateButoir(
  props: InputDateButoirProps
): ReactElement {
  const { defaultValue } = props;
  return (
    <Input
      label="Date butoir"
      type="date"
      name="dateButoir"
      defaultValue={defaultValue}
    />
  );
}
