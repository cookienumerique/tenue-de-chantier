import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react';

import { Actions } from '@/hooks/infractionLots/useBuildMenuActionInfractionLot';

type ButtonMenuProps = {
  width?: string;
  label?: string;
  colorScheme?: string;
  size?: string;
  items: Actions;
  isLoading?: boolean;
};

/**
 * @description Button with a menu
 * @param props
 * @constructor
 */
const ButtonMenu = (props: ButtonMenuProps) => {
  const {
    width = 'fit-content',
    label = 'Actions',
    size = 'sm',
    colorScheme = 'primary',
    items = [],
    isLoading = false,
  } = props;

  return (
    <Menu>
      <MenuButton
        isDisabled={items?.length === 0}
        width={width}
        size={size}
        as={Button}
        rightIcon={<ChevronDownIcon />}
        colorScheme={colorScheme}
        isLoading={isLoading}
      >
        {label}
      </MenuButton>
      <MenuList>
        {items?.map(
          ({ icon, label, isLoading, ...rest }) => {
            return (
              <MenuItem
                key={label}
                icon={
                  isLoading ? (
                    <Spinner />
                  ) : icon ? (
                    <Icon
                      boxSize={5}
                      as={icon}
                    />
                  ) : undefined
                }
                {...rest}
              >
                {label}
              </MenuItem>
            );
          }
        )}
      </MenuList>
    </Menu>
  );
};

export default ButtonMenu;
