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
  useBreakpointValue,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import ButtonCancel from '@/app-components/button/ButtonCancel';
import SelectInfractionLotStatut from '@/app-components/form/SelectInfractionLotStatut';
import SelectInfractionLotUrgence from '@/app-components/form/SelectInfractionLotUrgence';
import SelectInfraction from '@/app-components/form/SelectInfractions';
import SelectLotsNonLivres from '@/app-components/form/SelectLotsNonLivres';
import SelectZac from '@/app-components/form/SelectZac';
import SelectUtilisateurs from '@/app-components/utilisateur/SelectUtilisateur';
import InputDateBetween from '@/components/form/InputDateBetween';
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

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const handleSubmit = (values: {
    optionLot: LabelValue | undefined;
    optionZac: Array<LabelValue> | undefined;
    optionUrgence: LabelValue | undefined;
    optionSousCategorie: LabelValue | undefined;
    optionUtilisateur: LabelValue | undefined;
    optionStatut: Array<LabelValue> | undefined;
    minDateButoir: string | undefined;
    maxDateButoir: string | undefined;
    minDateCreation: string | undefined;
    maxDateCreation: string | undefined;
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
      minDateCreation,
      maxDateCreation,
      date,
    } = values;
    const payload = {
      lotId: optionLot?.value,
      urgence: optionUrgence?.label,
      sousCategorie: optionSousCategorie?.label,
      utilisateur: optionUtilisateur?.value,
      minDateButoir,
      maxDateButoir,
      minDateCreation,
      maxDateCreation,
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
    // For each optionZac, add it to the query parameters
    if (optionZac) {
      optionZac.forEach((zac) => {
        if (zac?.value) {
          queryParams.append(
            `zacId`,
            zac.value?.toString()
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
              <Stack
                gap="inherit"
                width={isMobile ? '100%' : '50%'}
              >
                <SelectZac
                  isMulti
                  name="optionZac"
                  defaultValue={queryParamsUrl
                    ?.get('zacId')
                    ?.split(',')
                    ?.map((zac) => ({
                      value: zac,
                      label: zac,
                    }))}
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
              </Stack>

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

              <Stack
                gap="inherit"
                width={isMobile ? '100%' : '50%'}
              >
                <SelectUtilisateurs
                  label="Détécté par"
                  defaultValue={queryParamsUrl?.get(
                    'utilisateur'
                  )}
                />
              </Stack>

              <InputDateBetween
                label="Date butoir"
                nameFrom="minDateButoir"
                nameTo="maxDateButoir"
                defaultValueFrom={queryParamsUrl?.get(
                  'minDateButoir'
                )}
                defaultValueTo={queryParamsUrl?.get(
                  'maxDateButoir'
                )}
              />

              <InputDateBetween
                label="Date initiale"
                nameFrom="minDateCreation"
                nameTo="maxDateCreation"
                defaultValueFrom={queryParamsUrl?.get(
                  'minDateCreation'
                )}
                defaultValueTo={queryParamsUrl?.get(
                  'maxDateCreation'
                )}
              />
            </Stack>
          </Formiz>
        </DrawerBody>

        <DrawerFooter
          gap="xs"
          flexDirection={isMobile ? 'column' : 'row'}
        >
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
