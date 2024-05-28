import { Grid, GridItem, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { GoFileDirectoryFill } from 'react-icons/go';

import Card from '@/app-components/card/Card';
import useFindEvenementsByInfractionLotId from '@/hooks/evenement/useFindEvenementsByInfractionLotId';
import useFindFilesInfractionLotById from '@/hooks/file/useFindFilesInfractionLotById';
import FileInterface from '@/interfaces/File';
import File from 'app-components/file/File';

type CardDocumentProps = {
  isLoading: boolean;
  isError: boolean;
  files: FileInterface[] | undefined;
  infractionLotId: string | undefined;
};

/**
 * @description Affiche les documents
 */
export default function CardDocument(
  props: CardDocumentProps
): ReactElement {
  const { isLoading, isError, files, infractionLotId } =
    props;

  /**
   * @description Invalidate the files
   */
  const { invalidate: invalidateFilesInfractionLot } =
    useFindFilesInfractionLotById({
      infractionLotId,
    });

  const { invalidate: invalidateEvenements } =
    useFindEvenementsByInfractionLotId({
      id: infractionLotId,
      enabled: !!infractionLotId,
    });

  const callbackOnDeleteFile = () => {
    invalidateFilesInfractionLot();
    invalidateEvenements();
  };

  return (
    <Card
      title="Documents"
      isError={isError}
      isLoading={isLoading}
      color="gray.600"
      icon={<GoFileDirectoryFill size={20} />}
      width="100%"
    >
      <Grid
        templateColumns={{
          base: 'repeat(2 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
          xl: 'repeat(7, 1fr)',
        }}
        gap="sm"
      >
        {files?.length === 0 ? (
          <Text
            as="i"
            textAlign="center"
          >
            Aucun document enregistré
          </Text>
        ) : (
          files?.map((file) => (
            <GridItem
              width="100%"
              key={file?.id}
            >
              <File
                key={file?.id}
                file={file}
                callbackOnDelete={callbackOnDeleteFile}
                width={{
                  base: '15em',
                  sm: '10em',
                  md: '10em',
                }}
              />
            </GridItem>
          ))
        )}
      </Grid>
    </Card>
  );
}
