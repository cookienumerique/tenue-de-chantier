import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { ReactElement } from 'react';

import InputFiles from '@/components/form/InputFiles';
import getReferenceTable from '@/functions/file/getReferenceTable';
import useUploadFiles from '@/hooks/file/useUploadFiles';

type ModalFilesProps = {
  isOpen: boolean;
  onClose: () => void;
  infractionLotId: string | undefined;
};

/**
 * @description Modal for adding files to an infraction lot
 * @param props
 * @constructor
 */
export default function ModalFiles(
  props: ModalFilesProps
): ReactElement {
  const { infractionLotId, isOpen, onClose } = props;

  const {
    mutate: uploadFiles,
    isLoading: isLoadingUpload,
  } = useUploadFiles({
    callbackOnSuccess: onClose,
  });
  const handleSubmit = ({
    files,
  }: {
    files: FileList[];
  }) => {
    if (!infractionLotId)
      return console.error(
        'infractionLotId is undefined'
      );

    const formData = new FormData();
    const { infraction_lot } = getReferenceTable();
    formData.set('referenceTable', infraction_lot);
    formData.set('referenceId', infractionLotId);
    // Add files to formData
    Array.from(files ?? [])?.map?.((file, index) =>
      formData.append(
        `files[${index}]`,
        file as unknown as Blob
      )
    );
    uploadFiles(formData);
  };

  const form = useForm({
    onValidSubmit: handleSubmit,
  });
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Gérer les fichiers</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formiz connect={form}>
            <InputFiles
              label="Ajouter des fichiers"
              type="file"
              name="files"
              multiple
            />
          </Formiz>
        </ModalBody>

        <ModalFooter>
          <Stack
            gap="xs"
            direction="row"
          >
            <Button
              width="fit-content"
              type="button"
              colorScheme="gray"
              onClick={onClose}
            >
              Fermer
            </Button>
            <Button
              width="fit-content"
              type="button"
              colorScheme="primary"
              onClick={form.submit}
              isLoading={isLoadingUpload}
            >
              Enregistrer
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
