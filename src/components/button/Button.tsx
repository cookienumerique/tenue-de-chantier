import {
  Button as ButtonChakra,
  ButtonProps as ButtonPropsChakra,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

type ButtonProps = ButtonPropsChakra;

export default function Button(
  props: ButtonProps
): ReactElement {
  const {
    children,
    isLoading = false,
    colorScheme = 'primary',
    type = 'button',
    onClick,
    width,
  } = props;
  return (
    <ButtonChakra
      isLoading={isLoading}
      colorScheme={colorScheme}
      onClick={onClick}
      type={type}
      width={width}
    >
      {children}
    </ButtonChakra>
  );
}
