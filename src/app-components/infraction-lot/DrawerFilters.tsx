import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
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
    optionStatut: Array<LabelValue> | undefined;
    minDateButoir: string | undefined;
    maxDateButoir: string | undefined;
    date: string | undefined;
  }) => {
    const {
      optionLot,
      optionZac,
      optionUrgence,
      optionSousCategorie,
      optionUtilisateur,
      optionStatut,
      minDateButoir,
      maxDateButoir,
      date,
    } = values;
    const payload = {
      zacId: optionZac?.value,
      lotId: optionLot?.value,
      urgence: optionUrgence?.label,
      sousCategorie: optionSousCategorie?.label,
      utilisateur: optionUtilisateur?.value,
      minDateButoir,
      maxDateButoir,
      date,
    };
    // Remove nulls values
    const noNullsValues = removeNullsProperties(payload);

    const queryParams = new URLSearchParams(
      noNullsValues
    );

    // For each optionStatut, add it to the query parameters
    if (optionStatut) {
      optionStatut.forEach((statut) => {
        if (statut?.label) {
          queryParams.append(
            `statut`,
            statut.label?.toString()
          );
        }
      });
    }
    const queryString = queryParams?.toString();

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
                defaultValue={queryParamsUrl
                  ?.get('statut')
                  ?.split(',')
                  ?.map((statut) => ({
                    value: statut,
                    label: statut,
                  }))}
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
              <Stack
                gap="xs"
                border="1px solid"
                borderColor="gray.300"
                padding="sm"
                borderRadius="md"
              >
                <FormLabel>Date butoir</FormLabel>
                <Stack direction="row">
                  <InputDateButoir
                    label="De"
                    name="minDateButoir"
                    defaultValue={
                      queryParamsUrl?.get(
                        'minDateButoir'
                      ) ?? undefined
                    }
                  />

                  <InputDateButoir
                    label="À"
                    name="maxDateButoir"
                    defaultValue={
                      queryParamsUrl?.get(
                        'maxDateButoir'
                      ) ?? undefined
                    }
                  />
                </Stack>
              </Stack>

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
