import { Stack } from '@chakra-ui/react';
import {
  Field,
  useFormContext,
  useFormFields,
} from '@formiz/core';
import { ReactElement } from 'react';

import CardLot from '@/app-components/card/CardLot';
import CardZac from '@/app-components/card/CardZac';
import SelectLotByZacId from '@/app-components/form/SelectLotByZacId';
import SelectZac from '@/app-components/form/SelectZac';
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
    zac,
    isLoadingZac = false,
    isLoadingLot = false,
    isErrorLot = false,
    isErrorZac,
    readOnly = false,
  } = props;
  const form = useFormContext();
  const { zacId } = useFormFields({
    fields: ['zacId'],
  }) as { zacId: Field<LabelValue> };

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
          <CardZac
            zac={zac}
            isLoading={isLoadingZac}
            isError={isErrorZac}
          />
        ) : (
          <Stack
            width={{ base: '100%', md: '50%', lg: '25%' }}
          >
            <SelectZac
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
    </Section>
  );
}

function getInitialProps() {
  return {};
}

SectionLocalisation.getInitialProps = getInitialProps;
