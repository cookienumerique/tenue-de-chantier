import {
  IconButton as IconButtonChakra,
  IconButtonProps as IconButtonPropsChakra,
  PlacementWithLogical,
  ResponsiveValue,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

type IconButtonProps = {
  label: string;
  placement?: PlacementWithLogical;
  size?: ResponsiveValue<'sm' | 'md' | 'lg' | 'xl'>;
} & IconButtonPropsChakra;
export default function IconButton(
  props: IconButtonProps
): ReactElement {
  const {
    label,
    backgroundColor,
    color,
    placement = 'left',
    size = 'sm',
    ...rest
  } = props;
  return (
    <Stack>
      <Tooltip
        placement={placement}
        color={color}
        label={label}
        backgroundColor={backgroundColor}
      >
        <IconButtonChakra
          borderRadius="50%"
          color={color}
          backgroundColor={backgroundColor}
          _active={{ backgroundColor: 'none' }}
          size={size}
          {...rest}
        />
      </Tooltip>
    </Stack>
  );
}
