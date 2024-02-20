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
import dayjs from 'dayjs';
import { ReactElement } from 'react';

import InputDateButoir from '@/app-components/form/InputDateButoir';
import useUpdateInfractionLot from '@/hooks/infractionLots/useUpdateInfractionLot';

type ModalDateButoirProps = {
  isOpen: boolean;
  onClose: () => void;
  infractionLotId: string | undefined;
  callbackOnUpdate: () => void;
  dateButoir: string | undefined;
};

/**
 * @description Modal for change dateButoir
 * @param props
 * @constructor
 */
export default function ModalDateButoir(
  props: ModalDateButoirProps
): ReactElement {
  const {
    infractionLotId,
    dateButoir,
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
    dateButoir,
  }: {
    dateButoir: string;
  }) => {
    if (!infractionLotId || !dateButoir) return;
    const payload = {
      dateButoir,
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
          Modifier la date butoir de l&apos;infraction
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formiz connect={form}>
            <InputDateButoir
              defaultValue={dateButoir}
              min={dayjs().format('YYYY-MM-DD')}
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
              Modifier la date butoir
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
