import {
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MouseEvent, ReactElement, useRef } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GoFileDirectoryFill } from 'react-icons/go';

import Card from '@/app-components/card/Card';
import TextPrimary from '@/components/text/TextPrimary';
import formatDate from '@/functions/date/formatDate';
import downloadFileById from '@/functions/file/downloadFileById';
import useDeleteFile from '@/hooks/file/useDeleteFile';
import useFindFilesInfractionLotById from '@/hooks/file/useFindFilesInfractionLotById';
import File from '@/interfaces/File';

type CardDocumentProps = {
  isLoading: boolean;
  isError: boolean;
  files: File[] | undefined;
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
  const ref = useRef<string | undefined>();
  /**
   * @description Download the file
   * @param id
   * @param fileName
   */
  const downloadFile = (id: string, fileName: string) => {
    return downloadFileById({ id, fileName });
  };

  /**
   * @description Invalidate the files
   */
  const { invalidate: invalidateFilesInfractionLot } =
    useFindFilesInfractionLotById({
      infractionLotId,
    });

  const {
    mutate: deleteFile,
    isLoading: isLoadingDeleteFile,
  } = useDeleteFile({
    callbackOnSuccess: () => {
      invalidateFilesInfractionLot();
      ref.current = undefined;
    },
  });

  /**
   * @description Remove the file
   * @param e
   * @param id
   */
  const handleRemoveFile = (
    e: MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e?.stopPropagation();
    deleteFile(id);
    ref.current = id;
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
            <Stack
              key={file?.id}
              borderBottom="1px solid"
              borderColor="gray.200"
              paddingX="2xs"
              paddingY="2xs"
              direction="row"
              gap="2xs"
              justifyContent="space-between"
              _hover={{
                backgroundColor: 'gray.50',
              }}
              cursor="pointer"
              onClick={() =>
                downloadFile(file?.id, file?.nom)
              }
              alignItems="center"
            >
              <Stack
                direction="row"
                alignItems="center"
              >
                <Image
                  src="/images/file-icon.png"
                  alt="file"
                  boxSize="20px"
                />
                <Stack gap={0}>
                  <TextPrimary fontWeight="bold">
                    {file?.nom}
                  </TextPrimary>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                  >
                    {`${formatDate(
                      file?.dateCreation
                    )} - ${file?.utilisateur?.nom} ${
                      file?.utilisateur?.prenom
                    }`}
                  </Text>
                </Stack>
              </Stack>
              <Stack
                padding="2xs"
                onClick={(e) =>
                  handleRemoveFile(e, file?.id)
                }
                borderRadius="50%"
                _hover={{
                  backgroundColor: 'gray.200',
                }}
              >
                {isLoadingDeleteFile &&
                ref?.current === file?.id ? (
                  <Spinner
                    boxSize={4}
                    color="primary.500"
                  />
                ) : (
                  <Icon
                    as={AiOutlineDelete}
                    color="red.500"
                    boxSize={4}
                  />
                )}
              </Stack>
            </Stack>
          ))
        )}
      </Stack>
    </Card>
  );
}
