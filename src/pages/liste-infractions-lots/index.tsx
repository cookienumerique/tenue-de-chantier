import { useDisclosure } from '@chakra-ui/hooks';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { BsFilterCircle } from 'react-icons/bs';
import { FaUser, FaUserAltSlash } from 'react-icons/fa';
import { MdFilterListOff } from 'react-icons/md';
import { PiSquaresFourFill } from 'react-icons/pi';

import DrawerFilters from '@/app-components/infraction-lot/DrawerFilters';
import ListInfractionsLot from '@/app-components/infraction-lot/ListInfractionsLot';
import Button from '@/components/button/Button';
import Layout from '@/components/layout/Layout';
import TitlePage from '@/components/text/TitlePage';
import { useAuthentification } from '@/context/AuthentificationProvider';
import InfractionLotStatutEnum from '@/enums/InfractionLotStatutEnum';
import useFindInfractionLot from '@/hooks/infractionLots/useFindInfractionLot';
import useFindZacFavoris from '@/hooks/zac-favoris/useFindZacFavoris';

const ListeInfractionsLotsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { push, pathname, query } = useRouter();
  const { user } = useAuthentification();

  const searchParams = useMemo(
    () => new URLSearchParams(query as unknown as string),
    [query]
  );

  const searchByMyFavoriteZac =
    !!searchParams.get('myZac');

  const {
    data: infractionsLot,
    isLoading,
    isError,
  } = useFindInfractionLot({
    queryParameters: searchParams,
  });

  const {
    data: zacFavoris,
    isLoading: isLoadingZacFavoris,
  } = useFindZacFavoris();

  const zacFavorisIds = zacFavoris?.map(
    (zacFavoris) => zacFavoris?.zac?.id
  );

  // Initialize status by default
  const initStatusByDefault = useCallback(async () => {
    Object.values(InfractionLotStatutEnum).forEach(
      (statut) => {
        if (
          !searchParams
            .get('statut')
            ?.split(',')
            .includes(statut) &&
          statut !==
            InfractionLotStatutEnum.INFRACTION_FERMEE
        ) {
          searchParams.append('statut', statut);
        }
      }
    );
    return push(
      `${pathname}?${searchParams?.toString()}`
    ).then((r) => r);
  }, [pathname, searchParams, push]);

  const handleResetFilters = () => initStatusByDefault();

  const handleDisplayInfractionOfMyFavoriteZac = () => {
    // If the user is already in the query parameters, remove it
    if (searchParams.get('zacId')) {
      searchParams.delete('zacId');
      searchParams.delete('myZac');
    } else {
      searchParams.set('myZac', '1');
      zacFavorisIds?.forEach((zacId) => {
        searchParams.append('zacId', zacId?.toString());
      });
    }
    push(`${pathname}?${searchParams?.toString()}`).then(
      (r) => r
    );
  };
  const handleDisplayMyInfractions = () => {
    // If the user is already in the query parameters, remove it
    if (searchParams.get('utilisateur')) {
      searchParams.delete('utilisateur');
    } else {
      // If the user is not in the query parameters, add it
      searchParams.set(
        'utilisateur',
        `${user?.prenom} ${user?.nom}`
      );
    }
    push(`${pathname}?${searchParams?.toString()}`).then(
      (r) => r
    );
  };

  useEffect(() => {
    // If the status is already in the query parameters, do nothing
    if (searchParams?.has('statut')) {
      return;
    }
    // Initialize status by default
    initStatusByDefault().then((r) => r);
  }, [initStatusByDefault, searchParams]);

  return (
    <Stack>
      <Stack>
        <TitlePage>Liste des infractions</TitlePage>
      </Stack>

      <Stack
        width="100%"
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '2xs', md: 'sm' }}
        justifyContent="end"
      >
        <Button
          size="sm"
          leftIcon={
            searchParams.get('utilisateur') ? (
              <FaUser />
            ) : (
              <FaUserAltSlash />
            )
          }
          colorScheme="purple"
          variant={
            searchParams.get('utilisateur')
              ? 'solid'
              : 'outline'
          }
          onClick={handleDisplayMyInfractions}
        >
          {searchParams.get('utilisateur') ===
          `${user?.prenom} ${user?.nom}`
            ? `Infractions de ${searchParams.get('utilisateur')}`
            : ''}

          {!searchParams.get('utilisateur')
            ? 'Voir mes infractions'
            : ''}
        </Button>
        <Button
          size="sm"
          variant={
            searchByMyFavoriteZac ? 'solid' : 'outline'
          }
          isDisabled={zacFavoris?.length === 0}
          isLoading={isLoadingZacFavoris}
          leftIcon={<PiSquaresFourFill />}
          colorScheme="purple"
          onClick={() =>
            handleDisplayInfractionOfMyFavoriteZac()
          }
        >
          Infractions de mes ZAC favorites
        </Button>
        <Button
          size="sm"
          leftIcon={<MdFilterListOff />}
          onClick={handleResetFilters}
          variant="outline"
        >
          Réinitialiser les filtres
        </Button>
        <Button
          size="sm"
          leftIcon={<BsFilterCircle />}
          onClick={onOpen}
        >
          Filtrer
        </Button>
        <DrawerFilters
          isOpen={isOpen}
          onClose={onClose}
        />
      </Stack>
      <ListInfractionsLot
        isLoading={isLoading}
        isError={isError}
        data={infractionsLot}
      />
    </Stack>
  );
};

ListeInfractionsLotsPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default ListeInfractionsLotsPage;
