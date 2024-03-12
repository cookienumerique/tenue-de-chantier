import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoMdSearch } from 'react-icons/io';
import {
  IoAddSharp,
  IoMapOutline,
} from 'react-icons/io5';

import { NavigationItem } from '@/components/layout/_partials/NavigationItem';
import WrapperLogoutAvatar from '@/components/layout/_partials/WrapperLogoutAvatar';
import HeaderTitle from '@/components/layout/header/HeaderTitle';

/**
 * @description Header for large screen
 * @constructor
 */
export default function LayoutHeader(): ReactElement {
  const { push } = useRouter();

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const navData = [
    {
      label: 'Accéder à la carte',
      icon: <IoMapOutline />,
      onClick: () => push('/'),
    },
    {
      label: 'Créer une infraction',
      icon: <IoAddSharp />,
      onClick: () => push('infractions-lots'),
    },
    {
      label: 'Rechercher des infractions',
      icon: <IoMdSearch />,
      onClick: () => push('/liste-infractions-lots'),
    },
  ];

  return (
    <Stack
      paddingY="xs"
      paddingX={{ base: 'sm', md: 'md' }}
      position="sticky"
      top="0"
      backgroundColor="white"
    >
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="center"
          gap="sm"
        >
          {isMobile ? (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HiMenu />}
                variant="outline"
                size="sm"
              />
              <MenuList>
                {navData?.map((item) => (
                  <MenuItem
                    key={item?.label}
                    icon={item?.icon}
                    onClick={item?.onClick}
                  >
                    {item?.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ) : (
            <></>
          )}
          <HeaderTitle
            fontSize={{ base: 'sm', md: 'md' }}
          />
        </Stack>
        <Stack direction="row">
          {isDesktop ? (
            <Stack
              direction="row"
              gap="2xs"
            >
              {navData?.map((item) => (
                <NavigationItem
                  key={item?.label}
                  onClick={item?.onClick}
                  icon={item?.icon}
                >
                  {item?.label}
                </NavigationItem>
              ))}
            </Stack>
          ) : (
            <></>
          )}

          <WrapperLogoutAvatar />
        </Stack>
      </Stack>
    </Stack>
  );
}
