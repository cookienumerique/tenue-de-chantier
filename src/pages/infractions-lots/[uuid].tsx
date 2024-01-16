import { Grid, GridItem, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

import CardEvenement from '@/app-components/card/CardEvenement';
import CardInfraction from '@/app-components/card/CardInfraction';
import CardLot from '@/app-components/card/CardLot';
import CardZac from '@/app-components/card/CardZac';
import TitleInfractionLot from '@/app-components/text/TitleInfractionLot';
import Layout from '@/components/layout/Layout';
import CreatedByOn from '@/components/text/CreatedByOn';
import useFindInfractionLotById from '@/hooks/infractionLots/useFindInfractionLotById';
import useFindInfractionById from '@/hooks/infractions/useFindInfractionById';
import useFindLotById from '@/hooks/lots/useFindLotById';
import useFindUtilisateurById from '@/hooks/utilisateur/useFindUtilisateurById';
import useFindZacById from '@/hooks/zacs/useFindZacById';

import { NextPageWithLayout } from '../_app';

const VisualisationInfractionLotPage: NextPageWithLayout =
  (): ReactElement => {
    const router = useRouter();
    const { uuid } = router?.query;

    // Récupération du lot
    const {
      data: infractionLot,
      isLoading: isLoadingInfractionLot,
      // isError: isErrorInfractionLot,
    } = useFindInfractionLotById({
      id: uuid,
      enabled: !!uuid,
    });

    const {
      data: lot,
      isLoading: isLoadingLot,
      isError: isErrorLot,
    } = useFindLotById({
      id: infractionLot?.lotId,
      enabled: !!infractionLot?.lotId,
    });

    const {
      data: zac,
      isLoading: isLoadingZac,
      isError: isErrorZac,
    } = useFindZacById({
      id: lot?.zac?.id,
      enabled: !!lot?.zac?.id,
    });

    const {
      data: utilisateur,
      isLoading: isLoadingUtilisateur,
    } = useFindUtilisateurById({
      id: infractionLot?.utilisateur?.id,
      enabled: !!infractionLot?.utilisateur?.id,
    });

    const {
      data: infraction,
      isLoading: isLoadingInfraction,
      isError: isErrorInfraction,
    } = useFindInfractionById({
      id: infractionLot?.infraction?.id,
      enabled: !!infractionLot?.infraction?.id,
    });

    return (
      <Grid
        templateColumns="repeat(12, 1fr)"
        gap={6}
      >
        <GridItem colSpan={12}>
          <Stack
            spacing={
              isLoadingUtilisateur ||
              isLoadingInfractionLot
                ? '2xs'
                : 0
            }
          >
            {/* Header*/}
            <TitleInfractionLot
              statut={infractionLot?.statut?.value}
              urgence={infractionLot?.urgence?.value}
              nbJoursDepuisCreation={
                infractionLot?.nbJoursDepuisCreation
              }
              isLoading={isLoadingInfractionLot}
            />

            <CreatedByOn
              nom={`${utilisateur?.nom} ${utilisateur?.prenom}`}
              date={infractionLot?.date}
              isLoading={
                isLoadingUtilisateur ||
                isLoadingInfractionLot
              }
            />
          </Stack>
          {/* SubHeader informations utilisateurs */}
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
          <CardZac
            zac={zac}
            isLoading={isLoadingZac}
            isError={isErrorZac}
          />
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
          <CardLot
            lot={lot}
            isLoading={isLoadingLot}
            isError={isErrorLot}
          />
        </GridItem>

        <GridItem
          colSpan={{ base: 12, md: 6, lg: 4 }}
          rowSpan={{ base: 1, xl: 2 }}
        >
          <CardEvenement
            isError={false}
            isLoading={false}
          />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 12, xl: 8 }}>
          <CardInfraction
            infraction={infraction}
            isError={isErrorInfraction}
            isLoading={isLoadingInfraction}
          />
        </GridItem>
      </Grid>
    );
  };

VisualisationInfractionLotPage.getLayout =
  function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };
export default VisualisationInfractionLotPage;
