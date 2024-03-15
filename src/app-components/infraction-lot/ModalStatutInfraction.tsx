import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  Field,
  Formiz,
  useForm,
  useFormFields,
} from '@formiz/core';
import dayjs from 'dayjs';
import { ReactElement } from 'react';

import InputDateButoir from '@/app-components/form/InputDateButoir';
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
  console.log(
    statut?.value?.label,
    InfractionLotStatutEnum.INFRACTION_FERMEE
  );
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
              Annuler
            </Button>
            {infractionWillBeClosed ? (
              <Popover>
                {({ onClose }) => (
                  <>
                    <PopoverTrigger>
                      <Button
                        width={{
                          base: '100%',
                          sm: 'fit-content',
                        }}
                        type="button"
                        colorScheme="red"
                        isLoading={isLoadingUpdate}
                      >
                        Fermer l&apos;infraction
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverBody>
                        <Stack gap="2xs">
                          <Text
                            fontSize="sm"
                            color="gray.600"
                          >
                            Êtes-vous sûr de vouloir
                            fermer cette infraction?{' '}
                            <Box
                              as="span"
                              fontWeight="bold"
                            >
                              Cette action est
                              irréversible.
                            </Box>
                          </Text>
                          <Stack
                            direction={{ md: 'row' }}
                            justifyContent="end"
                          >
                            <Button
                              width={{
                                base: '100%',
                                sm: 'fit-content',
                              }}
                              type="button"
                              colorScheme="gray"
                              onClick={onClose}
                            >
                              Annuler
                            </Button>
                            <Button
                              width={{
                                base: '100%',
                                sm: 'fit-content',
                              }}
                              type="button"
                              colorScheme="green"
                              onClick={form.submit}
                              isLoading={isLoadingUpdate}
                            >
                              Confirmer
                            </Button>
                          </Stack>
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </>
                )}
              </Popover>
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
      </ModalContent>
    </Modal>
  );
}
