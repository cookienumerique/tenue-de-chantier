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
import {
  Field,
  Formiz,
  useForm,
  useFormFields,
} from '@formiz/core';
import dayjs from 'dayjs';
import { ReactElement } from 'react';

import ButtonCancel from '@/app-components/button/ButtonCancel';
import InputDateButoir from '@/app-components/form/InputDateButoir';
import PopoverCloseInfraction from '@/app-components/popover/PopoverCloseInfraction';
import Select from '@/components/form/Select';
import InfractionLotStatutEnum from '@/enums/InfractionLotStatutEnum';
import useUpdateInfractionLot from '@/hooks/infractionLots/useUpdateInfractionLot';
import LabelValue from '@/interfaces/LabelValue';

type ModalStatutInfractionProps = {
  isOpen: boolean;
  onClose: () => void;
  infractionLotId: string | undefined;
  callbackOnUpdate: () => void;
  optionsStatut: LabelValue[] | undefined;
  dateButoir: string | undefined;
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
    dateButoir,
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
   * @param dateButoir
   */
  const handleSubmit = ({
    statut,
    dateButoir,
  }: {
    infractionLotId: string;
    statut: LabelValue;
    dateButoir: string;
  }) => {
    if (!infractionLotId || !statut?.label) return;

    const payload = {
      infractionLotId: infractionLotId,
      statut: statut?.label?.toString(),
      dateButoir,
    };
    updateInfractionLot(payload);
  };

  const form = useForm({
    onValidSubmit: handleSubmit,
  });

  const { statut } = useFormFields({
    connect: form,
    fields: ['statut'],
  }) as { statut: Field<LabelValue> };

  const infractionWillBeClosed =
    statut?.value?.label ===
    InfractionLotStatutEnum.INFRACTION_FERMEE;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <Formiz connect={form}>
          <ModalHeader>
            Modifier le statut de l&apos;infraction
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Select
                label="Choisissez un nouveau statut"
                placeholder={optionsStatut?.[0]?.label?.toString()}
                options={optionsStatut}
                name="statut"
                required
              />

              <InputDateButoir
                defaultValue={dateButoir}
                min={dayjs().format('YYYY-MM-DD')}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack
              gap="xs"
              direction={{ base: 'column', sm: 'row' }}
              width="100%"
              justifyContent="end"
            >
              <ButtonCancel
                onClick={onClose}
                width={{
                  base: '100%',
                  sm: 'fit-content',
                }}
              />

              {infractionWillBeClosed ? (
                <PopoverCloseInfraction
                  isLoading={isLoadingUpdate}
                />
              ) : (
                <Button
                  width={{
                    base: '100%',
                    sm: 'fit-content',
                  }}
                  type="button"
                  colorScheme="primary"
                  onClick={form.submit}
                  isLoading={isLoadingUpdate}
                >
                  Modifier le statut
                </Button>
              )}
            </Stack>
          </ModalFooter>
        </Formiz>
      </ModalContent>
    </Modal>
  );
}
