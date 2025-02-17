import {
  IconButton,
  Image,
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
import { MdHelpOutline } from 'react-icons/md';

import { NavigationItem } from '@/components/layout/_partials/NavigationItem';
import WrapperLogoutAvatar from '@/components/layout/_partials/WrapperLogoutAvatar';
import HeaderTitle from '@/components/layout/header/HeaderTitle';
import InfractionLotStatutEnum from '@/enums/InfractionLotStatutEnum';

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

  const isTabletteAndMore = useBreakpointValue({
    base: false,
    sm: true,
  });

  const navData = [
    {
      label: "Page d'aide",
      icon: <MdHelpOutline />,
      onClick: () => push('/aide'),
    },
    {
      label: 'Accéder à la carte',
      icon: <IoMapOutline />,
      onClick: () => push('/'),
    },
    {
      label: 'Créer une infraction',
      icon: <IoAddSharp />,
      onClick: () => push('/infractions-lots'),
    },
    {
      label: 'Rechercher des infractions',
      icon: <IoMdSearch />,
      onClick: () => {
        const queryParams = new URLSearchParams();
        Object.values(InfractionLotStatutEnum).forEach(
          (statut) => {
            if (
              !queryParams
                .get('statut')
                ?.split(',')
                .includes(statut) &&
              statut !==
                InfractionLotStatutEnum.INFRACTION_FERMEE
            ) {
              queryParams.append('statut', statut);
            }
          }
        );
        push(
          `/liste-infractions-lots?${queryParams?.toString()}`
        ).then((r) => r);
      },
    },
  ];

  return (
    <Stack
      paddingY="xs"
      paddingX={{ base: 'sm', md: 'md' }}
      position="sticky"
      top="0"
      backgroundColor="white"
      zIndex={1}
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
          zIndex={1}
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

          <Image
            src="/images/epa-logo.png"
            alt="logo-epa"
            width={{
              base: '140px',
              sm: '140px',
              md: '150px',
              lg: '120px',
              xl: '120px',
            }}
          />
          {isTabletteAndMore ? (
            <HeaderTitle
              fontSize={{
                base: '2xs',
                sm: 'xs',
                xl: 'sm',
              }}
            />
          ) : (
            <></>
          )}
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
                  fontSize={{ base: '2xs', xl: 'sm' }}
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
