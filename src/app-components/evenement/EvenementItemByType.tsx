import { Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import EvenementTypeEnum from '@/enums/EvenementTypeEnum';
import formatDate from '@/functions/date/formatDate';

type EvenementItemByTypeProps = {
  valeur: string | undefined;
  type:
    | { name: string; value: EvenementTypeEnum }
    | undefined;
};

/**
 * @description Affiche un item d'evenement
 */
export default function EvenementItemByType(
  props: EvenementItemByTypeProps
): ReactElement {
  const { type, valeur } = props;
  switch (type?.name) {
    case 'ECRIRE_EMAIL':
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenue dynamique pour un email
        </Text>
      );

    case 'CHANGER_DATE_BUTOIR':
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          {`La date butoir a été définie au ${
            valeur ? formatDate(valeur) : '"Non définie"'
          }`}
        </Text>
      );

    case 'CREER_INFRACTION':
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour une infraction créée
        </Text>
      );

    case 'PRODUIRE_MISE_EN_DEMEURE':
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour une mise en demeure
          produite
        </Text>
      );

    case 'PRODUIRE_CONSTAT_CARENCE':
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour un constat de carence
          produit
        </Text>
      );

    case 'CHANGER_DE_STATUT':
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour un changement de statut
        </Text>
      );

    case 'PRODUIRE_COURRIER_REGULARISATION':
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour un courrier de
          régularisation produit
        </Text>
      );

    case 'AJOUTER_DOCUMENT':
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique sur les documents ajoutés
        </Text>
      );

    case 'AJOUTER_COMMENTAIRE':
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour un commentaire ajouté
        </Text>
      );

    default:
      return <></>;
  }
}
