import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import ButtonCancel from '@/app-components/button/ButtonCancel';
import InputDateButoir from '@/app-components/form/InputDateButoir';
import InputDateCreation from '@/app-components/form/InputDateCreation';
import SelectInfractionLotStatut from '@/app-components/form/SelectInfractionLotStatut';
import SelectInfractionLotUrgence from '@/app-components/form/SelectInfractionLotUrgence';
import SelectInfraction from '@/app-components/form/SelectInfractions';
import SelectLotsNonLivres from '@/app-components/form/SelectLotsNonLivres';
import SelectZac from '@/app-components/form/SelectZac';
import SelectUtilisateurs from '@/app-components/utilisateur/SelectUtilisateur';
import removeNullsProperties from '@/functions/helper/removeNullsProperties';
import LabelValue from '@/interfaces/LabelValue';

type DrawerFiltersProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DrawerFilters(
  props: DrawerFiltersProps
): ReactElement {
  const { isOpen, onClose } = props;
  const { push, pathname, query } = useRouter();
  const queryParamsUrl = new URLSearchParams(
    query as unknown as string
  );

  const handleSubmit = (values: {
    optionLot: LabelValue | undefined;
    optionZac: LabelValue | undefined;
    optionUrgence: LabelValue | undefined;
    optionSousCategorie: LabelValue | undefined;
    optionUtilisateur: LabelValue | undefined;
    optionStatut: LabelValue | undefined;
    dateButoir: string | undefined;
    date: string | undefined;
  }) => {
    const {
      optionLot,
      optionZac,
      optionUrgence,
      optionSousCategorie,
      optionUtilisateur,
      optionStatut,
      dateButoir,
      date,
    } = values;

    const payload = {
      zacId: optionZac?.value,
      lotId: optionLot?.value,
      urgence: optionUrgence?.label,
      sousCategorie: optionSousCategorie?.label,
      utilisateur: optionUtilisateur?.value,
      statut: optionStatut?.label,
      dateButoir,
      date,
    };

    const queryString = new URLSearchParams(
      removeNullsProperties(payload)
    )?.toString();
    push(`${pathname}?${queryString}`).then((r) => r);
    onClose();
  };

  const form = useForm({
    onValidSubmit: handleSubmit,
  });

  const handleResetFilters = () => {
    form.reset({ only: ['values'] });
    push(pathname).then((r) => r);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Tous les filtres</DrawerHeader>

        <DrawerBody>
          <Formiz connect={form}>
            <Stack gap="sm">
              <SelectZac
                name="optionZac"
                defaultValue={queryParamsUrl?.get(
                  'zacId'
                )}
              />
              <SelectLotsNonLivres
                defaultValue={queryParamsUrl?.get(
                  'lotId'
                )}
              />

              <SelectInfractionLotUrgence
                defaultValue={queryParamsUrl?.get(
                  'urgence'
                )}
              />

              <SelectInfractionLotStatut
                defaultValue={queryParamsUrl?.get(
                  'statut'
                )}
              />

              <SelectInfraction
                label="Sous-catégorie"
                keyInfraction="sousCategorie"
                defaultValue={queryParamsUrl?.get(
                  'sousCategorie'
                )}
              />

              <SelectUtilisateurs
                label="Détécté par"
                defaultValue={queryParamsUrl?.get(
                  'utilisateur'
                )}
              />

              <InputDateButoir
                name="dateButoir"
                defaultValue={
                  queryParamsUrl?.get('dateButoir') ??
                  undefined
                }
              />

              <InputDateCreation
                label="Date initiale"
                defaultValue={
                  queryParamsUrl?.get('date') ?? undefined
                }
              />
            </Stack>
          </Formiz>
        </DrawerBody>

        <DrawerFooter gap="xs">
          <ButtonCancel
            onClick={onClose}
            width={{ base: '100%', sm: 'fit-content' }}
          />

          <Button
            width={{ base: '100%', sm: 'fit-content' }}
            type="button"
            colorScheme="gray"
            onClick={handleResetFilters}
          >
            Réinitialiser les filtres
          </Button>
          <Button
            width={{ base: '100%', sm: 'fit-content' }}
            type="button"
            colorScheme="primary"
            onClick={form.submit}
            // isLoading={isLoadingSearch}
          >
            Rechercher
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
