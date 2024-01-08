import { Stack, Text } from '@chakra-ui/react';
import {
  Field,
  Formiz,
  useForm,
  useFormFields,
} from '@formiz/core';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

import Button from '@/components/button/Button';
import Layout from '@/components/layout/Layout';
import useCreateInfractionLot, {
  CreateInfractionLotPayload,
} from '@/hooks/infractionLots/useCreateInfractionLot';
import useFindLotById from '@/hooks/lots/useFindLotById';
import LabelValue from '@/interfaces/LabelValue';
import Lot from '@/interfaces/Lot';
import SectionDocuments from '@/pages/infractions-lots/_partials/SectionDocuments';
import SectionInfraction from '@/pages/infractions-lots/_partials/SectionInfraction';
import SectionLocalisation from '@/pages/infractions-lots/_partials/SectionLocalisation';

import { NextPageWithLayout } from '../_app';

const CreationInfractionPage: NextPageWithLayout =
  (): ReactElement => {
    const router = useRouter();

    const callbackOnSuccess = (data: {
      infractions_lots: Lot;
    }) => {
      const { id: infractionLotId } =
        data?.infractions_lots as Lot;
      router
        .push(`/infractions-lots/${infractionLotId}`)
        .then((r) => r);
    };
    const { lotId: lotIdInQueryParam } = router?.query;

    const {
      mutate: createInfractionLot,
      isLoading: isLoadingCreation,
    } = useCreateInfractionLot({
      callbackOnSuccess,
    });

    /**
     * @description Soumission du formulaire
     * @param {Object} values - Valeurs du formulaire
     */
    const handleSubmit = (values: {
      optionLot: LabelValue;
      infraction: { optionLibelle: LabelValue };
      urgenceOption: LabelValue;
    }) => {
      // Récupération des valeurs
      const { optionLot, infraction, urgenceOption } =
        values ?? {};

      // Construction de la payload
      const payload: CreateInfractionLotPayload = {
        lotId: optionLot?.value ?? lotIdInQueryParam,
        infractionId: infraction?.optionLibelle?.value,
        urgence: urgenceOption?.value,
      };

      // Creation de la ressource
      createInfractionLot(payload);
    };
    const form = useForm({
      onValidSubmit: handleSubmit,
    });
    const { optionLot } = useFormFields({
      connect: form,
      fields: ['optionLot'],
    }) as { optionLot: Field<LabelValue> };

    // Lot sélectionné par l'utilisateur
    const loIdSelected = optionLot?.value?.value;

    // Récupération du lot
    const {
      data: lot,
      isLoading: isLoadingLot,
      isError: isErrorLot,
    } = useFindLotById({
      id: lotIdInQueryParam || loIdSelected,
      enabled: !!loIdSelected || !!lotIdInQueryParam,
    });

    return (
      <Stack gap="sm">
        <Text>Creation d&apos;une infraction</Text>

        <Formiz connect={form}>
          {/* Section localisation */}
          <SectionLocalisation
            lot={lot}
            zac={lot?.zac}
            readOnly={!!lotIdInQueryParam}
            isLoadingZac={isLoadingLot}
            isLoadingLot={isLoadingLot}
            isErrorLot={isErrorLot}
            isErrorZac={isErrorLot}
          />

          {/* Section infraction */}
          <SectionInfraction cpg={lot?.cpg?.value} />

          {/* Section documents */}
          <SectionDocuments />

          {/* Soumission du formulaire */}
          <Button
            isLoading={isLoadingCreation}
            type="submit"
            onClick={form.submit}
          >
            Créer l&apos;infraction
          </Button>
        </Formiz>
      </Stack>
    );
  };

CreationInfractionPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <Layout>{page}</Layout>;
};

export default CreationInfractionPage;
