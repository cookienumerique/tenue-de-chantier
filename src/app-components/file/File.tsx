import {
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { MouseEvent, ReactElement, useRef } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import TextPrimary from '@/components/text/TextPrimary';
import formatDate from '@/functions/date/formatDate';
import downloadFileById from '@/functions/file/downloadFileById';
import useDeleteFile from '@/hooks/file/useDeleteFile';
import FileInterface from '@/interfaces/File';

type FileProps = {
  file: FileInterface | undefined;
  callbackOnDelete?: () => void;
  minTemplate?: boolean;
};

/**
 * @description Display a file
 * @param props
 * @constructor
 */
export default function File(
  props: FileProps
): ReactElement {
  const {
    file,
    callbackOnDelete = () => null,
    minTemplate = false,
  } = props;
  const ref = useRef<string | undefined>();

  const {
    mutate: deleteFile,
    isLoading: isLoadingDeleteFile,
  } = useDeleteFile({
    callbackOnSuccess: () => {
      callbackOnDelete();
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
    id: string | undefined
  ) => {
    if (!id) return;
    e?.stopPropagation();
    deleteFile(id);
    ref.current = id;
  };

  /**
   * @description Download the file
   * @param id
   * @param fileName
   */
  const downloadFile = (
    id: string | undefined,
    fileName: string | undefined
  ) => {
    if (!id || !fileName) return;
    return downloadFileById({ id, fileName });
  };

  if (minTemplate) {
    return (
      <Stack
        border="1px solid"
        borderColor="gray.100"
        borderRadius="md"
        padding="2xs"
        _hover={{
          backgroundColor: 'gray.50',
        }}
        cursor="pointer"
        onClick={() => downloadFile(file?.id, file?.nom)}
      >
        <Tooltip
          label={file?.nom}
          backgroundColor="gray.100"
          color="gray.600"
        >
          <Image
            src="/images/file-icon.png"
            alt="file"
            boxSize="20px"
          />
        </Tooltip>
      </Stack>
    );
  }

  return (
    <Stack
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
      onClick={() => downloadFile(file?.id, file?.nom)}
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
        onClick={(e) => handleRemoveFile(e, file?.id)}
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
  );
}
