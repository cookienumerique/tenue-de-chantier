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
    leftIcon,
    isDisabled = false,
    size,
    variant,
  } = props;
  return (
    <ButtonChakra
      variant={variant}
      isLoading={isLoading}
      colorScheme={colorScheme}
      onClick={onClick}
      type={type}
      width={width}
      leftIcon={leftIcon}
      isDisabled={isDisabled}
      size={size}
    >
      {children}
    </ButtonChakra>
  );
}
