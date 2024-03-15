import {
  Button,
  ResponsiveValue,
} from '@chakra-ui/react';
import { MouseEventHandler, ReactElement } from 'react';

type ButtonCancelProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  width?: ResponsiveValue<string | number>;
};
export default function ButtonCancel(
  props: ButtonCancelProps
): ReactElement {
  const { onClick, width = 'auto' } = props;
  return (
    <Button
      width={width}
      type="button"
      colorScheme="gray"
      onClick={onClick}
    >
      Annuler
    </Button>
  );
}
