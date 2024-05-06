import type { ReactElement } from 'react';
import { PiSquaresFourFill } from 'react-icons/pi';

import Card from '@/app-components/card/Card';
import LabelValue from '@/components/text/LabelValue';
import Zac from '@/interfaces/Zac';

type CardZacProps = {
  zac: Zac | undefined;
  isLoading: boolean;
  isError: boolean;
};

/**
 * @description Affiche les informations d'une Zac
 */
export default function CardZac(
  props: CardZacProps
): ReactElement {
  const { zac, isLoading, isError } = props;
  return (
    <Card
      isLoading={isLoading}
      isError={isError}
      title="Contact"
      color="zac.500"
      icon={<PiSquaresFourFill size={20} />}
      cardProps={{ height: 'fit-content' }}
    >
      <LabelValue
        label="Responsable"
        value="Prénom Nom"
        capitalize={false}
      />
      <LabelValue
        label="Téléphone"
        value="00 00 00 00 00"
      />
      <LabelValue
        label="Mail"
        value="adresse@url.tld"
        capitalize={false}
      />
      <LabelValue
        label="Entreprise"
        value="Nom entreprise"
        capitalize={false}
      />
      <LabelValue
        label="Adresse"
        value={zac?.codStat}
      />
    </Card>
  );
}
