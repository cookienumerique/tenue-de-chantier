import { Image, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import TitlePage from '@/components/text/TitlePage';

const HelpPage = () => {
  return (
    <Stack>
      <TitlePage>Page d&apos;aide</TitlePage>

      <Stack gap="xs">
        <Text
          fontSize="lg"
          fontWeight="bold"
        >
          Ceci est un text bold
        </Text>
        <Text
          fontSize="md"
          fontStyle="italic"
        >
          Ceci est un text italique
        </Text>
        <Text
          fontSize="xs"
          textDecoration="underline"
        >
          Ceci est un text souligné
        </Text>

        <Image
          src="/images/epa-logo.png"
          alt="hero"
          width="150px"
        />
      </Stack>
    </Stack>
  );
};

HelpPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default HelpPage;
