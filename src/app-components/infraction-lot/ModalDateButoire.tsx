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

import Input from '@/components/form/Input';
import useUpdateInfractionLot from '@/hooks/infractionLots/useUpdateInfractionLot';

type ModalDateButoireProps = {
  isOpen: boolean;
  onClose: () => void;
  infractionLotId: string | undefined;
  callbackOnUpdate: () => void;
  dateButoire: string | undefined;
};

/**
 * @description Modal for change dateButoire
 * @param props
 * @constructor
 */
export default function ModalDateButoire(
  props: ModalDateButoireProps
): ReactElement {
  const {
    infractionLotId,
    dateButoire,
    isOpen,
    onClose,
    callbackOnUpdate,
  } = props;

  const {
    mutate: updateInfractionLot,
    isLoading: isLoadingUpdate,
  } = useUpdateInfractionLot({
    callbackOnSuccess: () => {
      onClose();
      callbackOnUpdate();
    },
  });

  /**
   * @description Handle the submit of the form
   * @param statut
   */
  const handleSubmit = ({
    dateButoire,
  }: {
    dateButoire: string;
  }) => {
    if (!infractionLotId || !dateButoire) return;
    const payload = {
      dateButoire,
      infractionLotId,
    };
    updateInfractionLot(payload);
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
        <ModalHeader>
          Modifier la date butoire de l&apos;infraction
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formiz connect={form}>
            <Input
              label="Date butoire"
              type="date"
              name="dateButoire"
              defaultValue={dateButoire}
            />
          </Formiz>
        </ModalBody>

        <ModalFooter>
          <Stack
            gap="xs"
            direction={{ base: 'column', sm: 'row' }}
            width="100%"
            justifyContent="end"
          >
            <Button
              width={{ base: '100%', sm: 'fit-content' }}
              type="button"
              colorScheme="gray"
              onClick={onClose}
            >
              Fermer
            </Button>
            <Button
              width={{ base: '100%', sm: 'fit-content' }}
              type="button"
              colorScheme="primary"
              onClick={form.submit}
              isLoading={isLoadingUpdate}
            >
              Modifier la date butoire
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
