import { ReactElement } from 'react';

import Input from '@/components/form/Input';

type InputDateCreationProps = {
  defaultValue?: string | undefined;
  label?: string;
};
export default function InputDateCreation(
  props: InputDateCreationProps
): ReactElement {
  const { defaultValue, label = 'Date de création' } =
    props;

  return (
    <Input
      key={defaultValue}
      label={label}
      type="date"
      name="date"
      defaultValue={defaultValue}
    />
  );
}
