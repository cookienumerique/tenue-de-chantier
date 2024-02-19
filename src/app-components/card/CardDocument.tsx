import { Stack, Text } from '@chakra-ui/react';
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
    >
      <Stack gap={0}>
        {files?.length === 0 ? (
          <Text
            as="i"
            textAlign="center"
          >
            Aucun document enregistré
          </Text>
        ) : (
          files?.map((file) => (
            <File
              key={file?.id}
              file={file}
              callbackOnDelete={callbackOnDeleteFile}
            />
          ))
        )}
      </Stack>
    </Card>
  );
}
