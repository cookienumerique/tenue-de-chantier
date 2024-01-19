import { Badge, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';

import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = (): ReactElement => {
  const router = useRouter();
  const handleRedirect = (
    id: number | null
  ): Promise<boolean> => {
    if (id === null)
      return router.push(`/infractions-lots`);
    else
      return router.push(`/infractions-lots?lotId=${id}`);
  };

  return (
    <Stack>
      <Text as="u">
        Simulation de la sélection d&apos;un lot:
      </Text>
      <Text
        cursor="pointer"
        onClick={() => handleRedirect(null)}
      >
        Créer une infraction from scratch {` `}{' '}
        <Badge colorScheme="green">Nouveau</Badge>
      </Text>
      <Text
        cursor="pointer"
        onClick={() => handleRedirect(1)}
      >
        Créer une infraction pour le lot 1
      </Text>
      <Text
        cursor="pointer"
        onClick={() => handleRedirect(2)}
      >
        Créer une infraction pour le lot 2
      </Text>
    </Stack>
  );
};

HomePage.getLayout = function getLayout(
  page: ReactElement
) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
