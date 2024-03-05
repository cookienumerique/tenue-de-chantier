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

import Textarea from '@/components/form/Textarea';
import useCreateEvenementCommentaire from '@/hooks/evenement/useCreateEvenementCommentaire';

type ModalStatutInfractionProps = {
  isOpen: boolean;
  onClose: () => void;
  infractionLotId: string | undefined;
  callbackOnUpdate: () => void;
};

/**
 * @description Modal for add comment
 * @param props
 * @constructor
 */
export default function ModalStatutInfraction(
  props: ModalStatutInfractionProps
): ReactElement {
  const {
    infractionLotId,
    isOpen,
    onClose,
    callbackOnUpdate,
  } = props;

  const {
    mutate: createEvenementCommentaire,
    isLoading: isLoadingCreationEvenementCommentaire,
  } = useCreateEvenementCommentaire({
    callbackOnSuccess: () => {
      onClose();
      callbackOnUpdate();
    },
  });

  /**
   * @description Handle the submit of the form
   * @param commentaire
   */
  const handleSubmit = ({
    value,
  }: {
    infractionLotId: string;
    value: string;
  }) => {
    console.log(value);
    if (!infractionLotId || !value) return;

    const payload = {
      infractionLotId: infractionLotId,
      value,
    };
    createEvenementCommentaire(payload);
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
        <ModalHeader>Ecrire un commentaire</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formiz connect={form}>
            <Stack>
              <Textarea
                name="value"
                label="Commentaire"
                required
              />
            </Stack>
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
              isLoading={
                isLoadingCreationEvenementCommentaire
              }
            >
              Commenter
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
