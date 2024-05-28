import { Grid, GridItem, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import nl2br from 'react-nl2br';

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
          {`Le statut a été défini a "${valeur}"`}
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
        <Grid
          templateColumns={{
            base: 'repeat(2,1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          gap="2xs"
          overflowX="scroll"
        >
          {files?.map((file) => (
            <GridItem
              width="100%"
              key={file?.id}
            >
              <File
                key={file?.id}
                file={file}
                canDelete={false}
                width={{
                  base: '4em',
                  sm: '8em',
                  md: '6em',
                }}
              />
            </GridItem>
          ))}
        </Grid>
      );

    case EvenementTypeEnum.AJOUTER_COMMENTAIRE:
      return (
        <Text
          as="i"
          fontSize="xs"
        >
          {nl2br(valeur ?? 'Commentaire supprimé.')}
        </Text>
      );

    default:
      return <></>;
  }
}
