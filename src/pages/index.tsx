import {
  Box,
  Grid,
  GridItem,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Section from '@/components/section/Section';
import { useDocumentTitle } from '@/hooks/app/useDocumentTitle';
import CardLastInfractionsLot from '@/pages/_partials/CardLastInfractionsLot';
import CardZacFavoris from '@/pages/_partials/CardZacFavoris';
import useFindMe from '@/services/useFindMe';

import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = (): ReactElement => {
  const { query, push } = useRouter();
  const { zacId: zacInQueryParam } = query ?? {};
  const { utilisateur, isLoading } = useFindMe();
  const { lastZacIdUsed } = utilisateur ?? {};

  const [idZacUtilisateur, setIdZacUtilisateur] =
    useState<number>();
  const gap = 8;

  useEffect(() => {
    if (!lastZacIdUsed) return;
    setIdZacUtilisateur(lastZacIdUsed);
  }, [lastZacIdUsed, push]);

  const zacId = zacInQueryParam ?? idZacUtilisateur;

  useDocumentTitle('Accueil');

  return (
    <Grid
      gap={gap}
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem colSpan={{ base: 12, lg: 8 }}>
        <Section
          flex={{ base: '1', lg: '2', xl: '4' }}
          overflowY="scroll"
        >
          {isLoading &&
          process.env.NEXT_PUBLIC_APP_ENV !==
            'development' ? (
            <>Chargement...</>
          ) : (
            <Box
              as="iframe"
              src={
                zacId
                  ? `${process?.env?.NEXT_PUBLIC_APP_CARTO_URL}?id_zac=${zacId}`
                  : ''
              }
              height="75vh"
            />
          )}
        </Section>
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 4 }}>
        <Stack gap={gap}>
          <CardZacFavoris />
          {/* Last infractions created */}
          <CardLastInfractionsLot />
        </Stack>
      </GridItem>
    </Grid>
  );
};

HomePage.getLayout = function getLayout(
  page: ReactElement
) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
