import dayjs from 'dayjs';
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
      min={dayjs().format('YYYY-MM-DD')}
      label="Date butoir"
      type="date"
      name="dateButoir"
      defaultValue={defaultValue}
    />
  );
}
