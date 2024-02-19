import { Stack, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import File from '@/app-components/file/File';
import EvenementTypeEnum from '@/enums/EvenementTypeEnum';
import formatDate from '@/functions/date/formatDate';
import FileInterface from '@/interfaces/File';

type EvenementItemByTypeProps = {
  valeur: string | undefined;
  type: EvenementTypeEnum | undefined;
  files: FileInterface[] | undefined;
};

/**
 * @description Affiche un item d'evenement
 */
export default function EvenementItemByType(
  props: EvenementItemByTypeProps
): ReactElement {
  const { type, valeur, files } = props;
  switch (type) {
    case EvenementTypeEnum.ECRIRE_EMAIL:
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenue dynamique pour un email
        </Text>
      );

    case EvenementTypeEnum.CHANGER_DATE_BUTOIR:
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

    case EvenementTypeEnum.CREER_INFRACTION:
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour une infraction créée
        </Text>
      );

    case EvenementTypeEnum.PRODUIRE_MISE_EN_DEMEURE:
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour une mise en demeure
          produite
        </Text>
      );

    case EvenementTypeEnum.PRODUIRE_CONSTAT_CARENCE:
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour un constat de carence
          produit
        </Text>
      );

    case EvenementTypeEnum.CHANGER_DE_STATUT:
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour un changement de statut
        </Text>
      );

    case EvenementTypeEnum.PRODUIRE_COURRIER_REGULARISATION:
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          Contenu dynamique pour un courrier de
          régularisation produit
        </Text>
      );

    case EvenementTypeEnum.AJOUTER_DOCUMENT:
      return (
        <Stack
          gap="2xs"
          direction="row"
        >
          {files?.map((file) => (
            <File
              key={file?.id}
              file={file}
              minTemplate
            />
          ))}
        </Stack>
      );

    case EvenementTypeEnum.AJOUTER_COMMENTAIRE:
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
