import {
  SlideFade,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoMdSearch } from 'react-icons/io';
import {
  IoAddSharp,
  IoMapOutline,
} from 'react-icons/io5';
import { TfiClose } from 'react-icons/tfi';

import IconButton from '@/components/button/IconButton';

export default function ButtonShortCut(): ReactElement {
  const [isOpenedMenu, setIsOpenedMenu] =
    React.useState<boolean>(false);
  const { push } = useRouter();

  const fontSizeBreakPoint = useBreakpointValue({
    base: '20px',
    lg: '25px',
  });

  /**
   * @description Handle click on menu button
   */
  const handleClickMenu = () => {
    setIsOpenedMenu((prev) => !prev);
  };

  const handleRedirectHomePage = () => {
    setIsOpenedMenu(false);
    push('/').then((r) => r);
  };

  const handleRedirectSearchPage = () => {};

  const handleRedirectCreateInfractionLotPage = () => {
    setIsOpenedMenu(false);
    push('/infractions-lots').then((r) => r);
  };

  const commonProps = {
    isRound: true,
    colorScheme: 'primary',
    fontSize: fontSizeBreakPoint,
    width: '2.5em',
    height: '2.5em',
    color: 'white',
    boxShadow: 'lg',
  };

  return (
    <Stack
      position="fixed"
      alignItems="center"
      bottom="2em"
      right="2em"
      gap="1.5em"
      backgroundColor="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2.5em"
      padding="2xs"
      fontSize={fontSizeBreakPoint}
    >
      {isOpenedMenu && (
        <SlideFade
          offsetY="2em"
          in={isOpenedMenu}
        >
          <Stack gap="1em">
            <IconButton
              {...commonProps}
              aria-label="carte"
              label="Accéder à la carte"
              icon={<IoMapOutline />}
              onClick={handleRedirectHomePage}
            />
            <IconButton
              {...commonProps}
              label="Rechercher"
              aria-label="search"
              icon={<IoMdSearch />}
              onClick={handleRedirectSearchPage}
              disabled
            />
            <IconButton
              {...commonProps}
              label="Créer une infraction"
              aria-label="create"
              icon={<IoAddSharp />}
              onClick={
                handleRedirectCreateInfractionLotPage
              }
            />
          </Stack>
        </SlideFade>
      )}

      <Stack>
        <IconButton
          {...commonProps}
          label={isOpenedMenu ? 'Fermer' : 'Menu rapide'}
          aria-label="create"
          icon={
            isOpenedMenu ? (
              <TfiClose />
            ) : (
              <HiOutlineDotsHorizontal />
            )
          }
          onClick={handleClickMenu}
          fontSize={fontSizeBreakPoint}
        />
      </Stack>
    </Stack>
  );
}
