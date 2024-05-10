import type { ReactElement } from 'react';
import { PiUserCircleLight } from 'react-icons/pi';

import Card from '@/app-components/card/Card';
import LabelValue from '@/components/text/LabelValue';

type CardZacProps = {
  nom: string | null | undefined;
  prenom: string | null | undefined;
  tel: string | null | undefined;
  mail: string | null | undefined;
  societe: string | null | undefined;
  adresse: string | null | undefined;
  isLoading: boolean;
  isError: boolean;
};

/**
 * @description Affiche les informations d'une Zac
 */
export default function CardContact(
  props: CardZacProps
): ReactElement {
  const {
    nom,
    prenom,
    tel,
    mail,
    societe,
    adresse,
    isLoading,
    isError,
  } = props;
  return (
    <Card
      isLoading={isLoading}
      isError={isError}
      title="Contact"
      color="zac.500"
      icon={<PiUserCircleLight size={20} />}
      cardProps={{ height: 'fit-content' }}
    >
      <LabelValue
        label="Responsable"
        value={`${prenom ?? ''} ${nom ?? 'Non renseigné'}`}
        capitalize={false}
      />
      <LabelValue
        label="Téléphone"
        value={tel ?? 'Non renseigné'}
      />
      <LabelValue
        label="Mail"
        value={mail ?? 'Non renseigné'}
        capitalize={false}
      />
      <LabelValue
        label="Entreprise"
        value={societe ?? 'Non renseigné'}
        capitalize={false}
      />
      <LabelValue
        label="Adresse"
        value={adresse ?? 'Non renseigné'}
      />
    </Card>
  );
}
