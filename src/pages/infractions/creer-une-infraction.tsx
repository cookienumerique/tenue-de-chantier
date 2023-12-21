import { Stack, Text } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

import Button from '@/components/button/Button';
import Layout from '@/components/layout/Layout';
import useCreateInfractionLot, {
  CreateInfractionLotPayload,
} from '@/hooks/infractionLots/useCreateInfractionLot';
import useFindLotById from '@/hooks/lots/useFindLotById';
import LabelValue from '@/interfaces/LabelValue';
import SectionDocuments from '@/pages/infractions/_partials/SectionDocuments';
import SectionInfraction from '@/pages/infractions/_partials/SectionInfraction';
import SectionLocalisation from '@/pages/infractions/_partials/SectionLocalisation';

import { NextPageWithLayout } from '../_app';

const CreationInfractionPage: NextPageWithLayout =
  (): ReactElement => {
    const router = useRouter();

    const callbackOnSuccess = () => router.push('/');
    const { lotId } = router?.query;

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
        id_lot: optionLot?.value,
        id_infraction: infraction?.optionLibelle?.value,
        urgence: urgenceOption?.value,
      };

      // Creation de la ressource
      createInfractionLot(payload);
    };
    const form = useForm({
      onValidSubmit: handleSubmit,
    });

    // Récupération du lot
    const {
      data: lot,
      isLoading: isLoadingLot,
      isError: isErrorLot,
    } = useFindLotById({
      id: lotId,
      enabled: !!lotId,
    });

    return (
      <Stack gap="sm">
        <Text>Creation d&apos;une infraction</Text>

        <Formiz connect={form}>
          {/* Section localisation */}
          <SectionLocalisation
            lot={lot}
            isLoading={isLoadingLot}
            isError={isErrorLot}
          />

          {/* Section infraction */}
          <SectionInfraction cpg={lot?.cpg} />

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
