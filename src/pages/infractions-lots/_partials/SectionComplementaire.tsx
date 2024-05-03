import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import Textarea from '@/components/form/Textarea';
import Section from '@/components/section/Section';
import CpgEnum from '@/enums/CpgEnum';

type SectionComplementaireProps = {
  cpg: CpgEnum | undefined;
};

/**
 * @description Section du formulaire "informations complémentaires" pour la création d'une infraction
 */
export default function SectionComplementaire(
  props: SectionComplementaireProps
): ReactElement {
  const { cpg } = props;

  if (!cpg) return <></>;

  return (
    <Section title="Informations complémentaires (utiles pour la rédaction des courriers) :">
      <Stack
        gap="inherit"
        direction={{ base: 'column', md: 'row' }}
        width="100%"
      >
        <Textarea
          width="100%"
          label="Description de l'infraction :"
          name="description"
        />
        <Textarea
          width="100%"
          label="Mesures correctives à mettre en place :"
          name="mesuresCorrectives"
        />
      </Stack>
    </Section>
  );
}

function getInitialProps() {
  return {};
}

SectionComplementaire.getInitialProps = getInitialProps;
