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

import Select from '@/components/form/Select';
import useUpdateInfractionLot from '@/hooks/infractionLots/useUpdateInfractionLot';
import LabelValue from '@/interfaces/LabelValue';

type ModalStatutInfractionProps = {
  isOpen: boolean;
  onClose: () => void;
  infractionLotId: string | undefined;
  callbackOnUpdate: () => void;
  optionsStatut: LabelValue[] | undefined;
};

/**
 * @description Modal for change the statut of the infractionLot
 * @param props
 * @constructor
 */
export default function ModalStatutInfraction(
  props: ModalStatutInfractionProps
): ReactElement {
  const {
    infractionLotId,
    optionsStatut,
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
    statut,
  }: {
    infractionLotId: string;
    statut: LabelValue;
  }) => {
    if (!infractionLotId || !statut?.label) return;

    const payload = {
      infractionLotId: infractionLotId,
      statut: statut?.label?.toString(),
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
          Modifier le statut de l&apos;infraction
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formiz connect={form}>
            <Select
              label="Choisissez un nouveau statut"
              placeholder={optionsStatut?.[0]?.label?.toString()}
              options={optionsStatut}
              name="statut"
              required
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
              isLoading={isLoadingUpdate}
            >
              Modifier
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
