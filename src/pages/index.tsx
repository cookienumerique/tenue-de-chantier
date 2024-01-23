import { Box, Stack, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import Section from '@/components/section/Section';

import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = (): ReactElement => {
  const idZacUtilisateur = 95;

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      gap={6}
      flex="1"
    >
      <Section
        title="Sélectionner un lot pour débuter votre navigation"
        flex="1"
        overflowY="scroll"
      >
        <Box
          as="iframe"
          src={`${process?.env?.NEXT_PUBLIC_APP_CARTO_URL}?id_zac=${idZacUtilisateur}`}
          height="70vh"
        />
      </Section>
      <Section
        title="ZAC en favoris"
        flex="1"
      >
        <Text as="i">En cours de développement</Text>
      </Section>
    </Stack>
  );
};

HomePage.getLayout = function getLayout(
  page: ReactElement
) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
