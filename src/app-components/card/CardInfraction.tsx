import type { ReactElement } from 'react';
import { GiInjustice } from 'react-icons/gi';

import Card from '@/app-components/card/Card';
import LabelValue from '@/components/text/LabelValue';
import Infraction from '@/interfaces/Infraction';

type CardInfractionProps = {
  infraction: Infraction | undefined;
  isLoading: boolean;
  isError: boolean;
};

/**
 * @description Affiche les informations d'une infraction
 */
export default function CardInfraction(
  props: CardInfractionProps
): ReactElement {
  const { infraction, isLoading, isError } = props;

  return (
    <Card
      title="Infraction"
      isError={isError}
      isLoading={isLoading}
      color="infraction.600"
      icon={<GiInjustice size={20} />}
    >
      <LabelValue
        label="categorie"
        value={infraction?.categorie}
      />
      <LabelValue
        label="Sous categorie"
        value={infraction?.sousCategorie}
      />
      <LabelValue
        label="libelle"
        value={infraction?.libelle}
      />
      <LabelValue
        label="montant"
        value={infraction?.montant}
        amount
      />
      <LabelValue
        label="niveau"
        value={infraction?.niveau?.value}
      />
      <LabelValue
        label="type"
        value={infraction?.type?.value}
      />
    </Card>
  );
}
