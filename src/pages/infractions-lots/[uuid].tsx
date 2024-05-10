import { Grid, GridItem, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

import CardContact from '@/app-components/card/CardContact';
import CardDocument from '@/app-components/card/CardDocument';
import CardEvenement from '@/app-components/card/CardEvenement';
import CardInfraction from '@/app-components/card/CardInfraction';
import CardLot from '@/app-components/card/CardLot';
import TitleInfractionLot from '@/app-components/text/TitleInfractionLot';
import Layout from '@/components/layout/Layout';
import useFindEvenementsByInfractionLotId from '@/hooks/evenement/useFindEvenementsByInfractionLotId';
import useFindFilesInfractionLotById from '@/hooks/file/useFindFilesInfractionLotById';
import useFindActionsByInfractionLotId from '@/hooks/infractionLots/useFindActionsByInfractionLotId';
import useFindInfractionLotById from '@/hooks/infractionLots/useFindInfractionLotById';
import useFindInfractionById from '@/hooks/infractions/useFindInfractionById';
import useFindLotById from '@/hooks/lots/useFindLotById';
import useFindUtilisateurById from '@/hooks/utilisateurs/useFindUtilisateurById';

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

    const {
      data: evenements,
      isLoading: isLoadingEvenements,
      isError: isErrorEvenements,
    } = useFindEvenementsByInfractionLotId({
      id: infractionLot?.id,
      enabled: !!infractionLot?.id,
    });

    // Retrieve actions possibles for infractionLot
    const {
      data: actions,
      isLoading: isLoadingActions,
      isError: isErrorActions,
    } = useFindActionsByInfractionLotId({
      id: infractionLot?.id,
      enabled: !!infractionLot?.id,
    });

    const {
      data: files,
      isLoading: isLoadingFiles,
      isError: isErrorFiles,
    } = useFindFilesInfractionLotById({
      infractionLotId: infractionLot?.id,
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
              id={infractionLot?.id}
              statut={infractionLot?.statut?.value}
              urgence={infractionLot?.urgence?.value}
              nbJoursDepuisCreation={
                infractionLot?.nbJoursDepuisCreation
              }
              nbJoursDateButoir={
                infractionLot?.nbJoursDateButoir
              }
              dateButoir={infractionLot?.dateButoir}
              utilisateur={utilisateur}
              date={infractionLot?.date}
              isLoadingUtilisateur={isLoadingUtilisateur}
              isLoadingInfractionsLot={
                isLoadingInfractionLot
              }
              actions={actions}
              isLoadingActions={isLoadingActions}
              isErrorActions={isErrorActions}
            />
          </Stack>
          {/* SubHeader informations utilisateurs */}
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
          <CardLot
            lot={lot}
            isLoading={isLoadingLot}
            isError={isErrorLot}
          />
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
          <CardContact
            nom={lot?.nom}
            prenom={lot?.prenom}
            tel={lot?.tel}
            mail={lot?.mail}
            adresse={lot?.adresse1}
            societe={lot?.societe}
            isLoading={isLoadingLot}
            isError={isErrorLot}
          />
        </GridItem>

        <GridItem
          colSpan={{ base: 12, md: 6, lg: 4 }}
          rowSpan={{ base: 1, xl: 2 }}
        >
          <CardEvenement
            isError={isErrorEvenements}
            isLoading={isLoadingEvenements}
            evenements={evenements}
          />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 12, xl: 8 }}>
          <CardInfraction
            infraction={infraction}
            isError={isErrorInfraction}
            isLoading={isLoadingInfraction}
          />
        </GridItem>

        <GridItem
          colSpan={{ base: 12, md: 6, lg: 4 }}
          rowSpan={{ base: 1, xl: 2 }}
        >
          <CardDocument
            isError={isErrorFiles}
            isLoading={isLoadingFiles}
            files={files}
            infractionLotId={infractionLot?.id}
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
