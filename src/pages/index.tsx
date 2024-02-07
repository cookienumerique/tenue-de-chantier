import {
  Box,
  Stack,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import type { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import Section from '@/components/section/Section';
import CardLastInfractionsLot from '@/pages/_partials/CardLastInfractionsLot';

import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = (): ReactElement => {
  const idZacUtilisateur = 95;
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
          <Section
            title="ZAC en favoris"
            flex="1"
          >
            <Text as="i">En cours de développement</Text>
          </Section>
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
