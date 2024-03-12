import {
  Box,
  Grid,
  GridItem,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import Section from '@/components/section/Section';
import CardLastInfractionsLot from '@/pages/_partials/CardLastInfractionsLot';
import CardZacFavoris from '@/pages/_partials/CardZacFavoris';

import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = (): ReactElement => {
  const { query } = useRouter();
  const { zacId } = query ?? {};

  const idZacUtilisateur = zacId ?? 95;
  const gap = 8;

  return (
    <Grid
      gap={gap}
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem colSpan={{ base: 12, lg: 8 }}>
        <Section
          title="Sélectionner un lot pour débuter votre navigation"
          flex={{ base: '1', lg: '2', xl: '4' }}
          overflowY="scroll"
        >
          <Box
            as="iframe"
            src={`${process?.env?.NEXT_PUBLIC_APP_CARTO_URL}?id_zac=${idZacUtilisateur}`}
            height="75vh"
          />
        </Section>
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 4 }}>
        <Stack gap={gap}>
          {/* Last infractions created */}
          <CardLastInfractionsLot />
          <CardZacFavoris />
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
