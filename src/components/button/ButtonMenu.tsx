import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type ButtonMenuProps = {
  width?: string;
  label?: string;
  colorScheme?: string;
  size?: string;
  items:
    | Array<{
        label: string;
        onClick: () => void;
        icon: IconType | undefined;
      }>
    | undefined;
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
        {items?.map((actionItem) => (
          <MenuItem
            key={actionItem?.label}
            onClick={actionItem?.onClick}
            icon={
              actionItem?.icon ? (
                <Icon
                  boxSize={5}
                  as={actionItem?.icon}
                />
              ) : undefined
            }
          >
            {actionItem?.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ButtonMenu;
