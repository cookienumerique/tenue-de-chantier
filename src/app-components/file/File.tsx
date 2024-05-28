import {
  Icon,
  Image,
  ResponsiveValue,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import {
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import TextPrimary from '@/components/text/TextPrimary';
import formatDate from '@/functions/date/formatDate';
import downloadFileById from '@/functions/file/downloadFileById';
import useDeleteFile from '@/hooks/file/useDeleteFile';
import FileInterface from '@/interfaces/File';

type FileProps = {
  file: FileInterface | undefined;
  callbackOnDelete?: () => void;
  canDelete?: boolean;
  width: ResponsiveValue<string>;
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
    width,
    canDelete = true,
  } = props;
  const ref = useRef<string | undefined>();
  const [thumbnail, setThumbnail] = useState<
    string | undefined
  >(undefined);
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

  const getThumbnail = async (
    file?: FileInterface | undefined
  ) => {
    if (file) {
      const response = await axios.get(
        `http://localhost:8080/v1/files/${file?.id}`,
        { responseType: 'blob' }
      );
      const thumbnail = URL.createObjectURL(
        response.data
      );
      setThumbnail(thumbnail);
    }
  };

  useEffect(() => {
    getThumbnail(file);
  }, [file]);

  return (
    <Stack
      border="1px solid"
      borderColor="gray.200"
      direction="row"
      _hover={{
        backgroundColor: 'gray.50',
      }}
      cursor="pointer"
      onClick={() => downloadFile(file?.id, file?.nom)}
      borderRadius="lg"
      width="100%"
      height="100%"
      boxShadow="sm"
    >
      <Stack
        gap={0}
        alignItems="center"
        width="100%"
      >
        <Image
          src={thumbnail}
          alt={file?.nom}
          width="100%"
          borderTopRadius="lg"
          //boxSize={width}
          height={width}
          objectFit="cover"
        />

        <Stack
          direction="row"
          alignItems="space-between"
          width="100%"
          padding="2xs"
        >
          <Stack
            gap={0}
            width="inherit"
          >
            <TextPrimary
              fontSize="xs"
              fontWeight="bold"
              wordWrap="anywhere"
            >
              {file?.nom}
            </TextPrimary>
            <TextPrimary
              fontSize="xs"
              color="gray.500"
            >
              {`${formatDate(file?.dateCreation)}`}
            </TextPrimary>
            <TextPrimary
              fontSize="xs"
              color="gray.500"
            >
              {`${file?.utilisateur?.nom} ${file?.utilisateur?.prenom}`}
            </TextPrimary>
          </Stack>

          {canDelete ? (
            <Stack
              padding="2xs"
              onClick={(e) =>
                handleRemoveFile(e, file?.id)
              }
              borderRadius="md"
              _hover={{
                backgroundColor: 'red.400',
              }}
              backgroundColor="red.500"
              height="fit-content"
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
                  color="white"
                  boxSize={4}
                />
              )}
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
