import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Stack,
} from '@chakra-ui/react';
import {
  Field,
  useFormContext,
  useFormFields,
} from '@formiz/core';
import { ReactElement } from 'react';

import CardLot from '@/app-components/card/CardLot';
import SelectLotByZacId from '@/app-components/form/SelectLotByZacId';
import SelectZacWithLotsEnChantiers from '@/app-components/form/SelectZacWithLotsEnChantiers';
import Section from '@/components/section/Section';
import LabelValue from '@/interfaces/LabelValue';
import Lot from '@/interfaces/Lot';
import Zac from '@/interfaces/Zac';

type LocalisationProps = {
  lot: Lot | undefined;
  zac: Zac | undefined;
  readOnly: boolean;
  isLoadingZac: boolean;
  isLoadingLot: boolean;
  isErrorLot: boolean;
  isErrorZac: boolean;
};

/**
 * @description Section du formulaire "localisation" pour la création d'une infraction
 */
export default function SectionLocalisation(
  props: LocalisationProps
): ReactElement {
  const {
    lot,
    isLoadingLot = false,
    isErrorLot = false,
    readOnly = false,
  } = props;
  const form = useFormContext();
  const { zacId } = useFormFields({
    fields: ['zacId'],
  }) as { zacId: Field<LabelValue> };

  const lotHasNoCpg = !lot?.cpg?.value && lot;
  const handleChangeZac = () => {
    form.setValues({ optionLot: null });
  };
  return (
    <Section title="Localisation">
      <Stack
        flexDir={{ base: 'column', md: 'row' }}
        spacing="md"
      >
        {readOnly ? (
          <></>
        ) : (
          <Stack
            width={{ base: '100%', md: '50%', lg: '25%' }}
          >
            <SelectZacWithLotsEnChantiers
              callbackOnChange={handleChangeZac}
              required
            />
          </Stack>
        )}

        {readOnly ? (
          <CardLot
            lot={lot}
            isLoading={isLoadingLot}
            isError={isErrorLot}
          />
        ) : (
          <Stack
            width={{ base: '100%', md: '50%', lg: '25%' }}
          >
            <SelectLotByZacId
              defaultValue={lot?.id as string}
              zacId={zacId?.value?.value?.toString()}
              isDisabled={!zacId?.value?.value}
            />
          </Stack>
        )}
      </Stack>
      {lotHasNoCpg ? (
        <Alert
          status="error"
          flexDirection="column"
        >
          <AlertIcon
            boxSize="40px"
            mr={0}
          />
          <AlertTitle>
            Ce lot n&apos;a pas de CPG
          </AlertTitle>
          <AlertDescription>
            Vous ne pouvez pas sélectionner une infraction
            sans CPG
          </AlertDescription>
        </Alert>
      ) : (
        <></>
      )}
    </Section>
  );
}

function getInitialProps() {
  return {};
}

SectionLocalisation.getInitialProps = getInitialProps;
