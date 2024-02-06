import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import ListeInfractionsLot from '@/app-components/infraction-lot/ListeInfractionsLot';
import Layout from '@/components/layout/Layout';
import TitlePage from '@/components/text/TitlePage';
import useFindInfractionLot from '@/hooks/infractionLots/useFindInfractionLot';

const ListeInfractionsLotsPage = () => {
  const { query } = useRouter();
  const { zacId, lotId } = query;
  const searchParams = new URLSearchParams();

  if (zacId) searchParams.set('zacId', zacId as string);
  if (lotId) searchParams.set('lotId', lotId as string);

  const {
    data: infractionsLot,
    isLoading,
    isError,
  } = useFindInfractionLot({
    queryParameters: searchParams,
    enabled: !!zacId || !!lotId,
  });

  return (
    <Stack>
      <Stack>
        <TitlePage>Liste des infractions</TitlePage>
      </Stack>
      <ListeInfractionsLot
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
