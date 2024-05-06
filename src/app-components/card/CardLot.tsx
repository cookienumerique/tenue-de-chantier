import type { ReactElement } from 'react';
import { PiBuildings } from 'react-icons/pi';

import BadgeCpg from '@/app-components/badge/BadgeCpg';
import Card from '@/app-components/card/Card';
import LabelValue from '@/app-components/text/LabelValue';
import Lot from '@/interfaces/Lot';

type CardLotProps = {
  isLoading: boolean;
  isError: boolean;
  lot: Lot | undefined;
};
/**
 * @description Affiche les informations d'une lot
 */
export default function CardLot(
  props: CardLotProps
): ReactElement {
  const { isLoading = true, lot, isError } = props;

  return (
    <Card
      isLoading={isLoading}
      isError={isError}
      title={"Lot : " + lot?.libLot ?? 'Lot'}
      color="lot.600"
      icon={<PiBuildings size={20} />}
      cardProps={{ height: 'fit-content' }}
    >

      <LabelValue
        label="ZAC"
        capitalize={false}
        value={lot?.zac?.libZacMin}
      />

      <LabelValue
	label="EPA"
        capitalize={false}
        value={lot?.zac?.libAmgr}
      />

      <LabelValue label="CPG">
        <BadgeCpg cpg={lot?.cpg?.value} />
      </LabelValue>

      <LabelValue
        label="Livré"
        value={lot?.livre ? 'Oui' : 'Non'}
      />

      <LabelValue
        label="Code"
        capitalize={false}
        value={lot?.codLot}
      />
    </Card>
  );
}
