import { Stack, Text } from '@chakra-ui/react';
import {
  useFormContext,
  useFormFields,
} from '@formiz/core';
import { ReactElement, useState } from 'react';

import SelectInfractionLotUrgence from '@/app-components/form/SelectInfractionLotUrgence';
import Select from '@/components/form/Select';
import Section from '@/components/section/Section';
import LabelValueComponent from '@/components/text/LabelValue';
import CpgEnum from '@/enums/CpgEnum';
import capitalize from '@/functions/capitalize';
import uniqueOptions from '@/functions/uniqueOptions';
import useFindAllInfractionsByCpg from '@/hooks/infractions/useFindAllInfractionsByCpg';
import Infraction from '@/interfaces/Infraction';
import LabelValue from '@/interfaces/LabelValue';

type SectionInfractionProps = {
  cpg: CpgEnum | undefined;
};
/**
 * @description Section du formulaire "infraction" pour la création d'une infraction
 */
export default function SectionInfraction(
  props: SectionInfractionProps
): ReactElement {
  const { cpg } = props;

  const { setValues } = useFormContext();
  const [modeSelection, setModeSelection] = useState<
    'libelle' | 'categorie'
  >('libelle');

  const queryParams = new URLSearchParams({
    cpg: cpg ?? '',
  });

  /**
   * @description Change le mode de sélection de l'infraction
   */
  const handleChangeModeSelection = () => {
    setValues({
      'infraction.optionLibelle': null,
    });
    setModeSelection((prev) =>
      prev === 'libelle' ? 'categorie' : 'libelle'
    );
  };

  const {
    data: infractions,
    isLoading: isLoadingInfraction,
    isError: isErrorInfraction,
  } = useFindAllInfractionsByCpg({
    queryParams,
    key: ['infraction', cpg ?? ''],
    enabled: !!cpg,
  });

  const { infraction } = useFormFields({
    fields: [
      'infraction.optionCategorie',
      'infraction.optionSousCategorie',
      'infraction.optionLibelle',
    ],
    selector: (field) => field.value,
  }) as {
    infraction: {
      optionCategorie: LabelValue;
      optionSousCategorie: LabelValue;
      optionLibelle: LabelValue;
    };
  };

  // Options pour le select des libellés
  const optionsLibelle = infractions?.map(
    (infraction: Infraction) => {
      return {
        label: capitalize(infraction?.libelle),
        value: infraction.id,
      };
    }
  );

  const optionsCategorie = infractions?.map(
    (infraction: Infraction) => {
      return {
        label: capitalize(infraction?.categorie),
        value: infraction.id,
      };
    }
  );

  const optionsSousCategorie = infractions
    ?.filter(
      (infractionItem) =>
        infractionItem?.categorie?.toLowerCase() ===
        infraction?.optionCategorie?.label
          ?.toString()
          ?.toLowerCase()
    )
    ?.map((infraction: Infraction) => {
      return {
        label: capitalize(infraction?.sousCategorie),
        value: infraction.id,
      };
    });

  const optionsLibelleModeCategorie = infractions
    ?.filter(
      (infractionItem) =>
        infractionItem?.sousCategorie?.toLowerCase() ===
        infraction?.optionSousCategorie?.label
          ?.toString()
          ?.toLowerCase()
    )
    ?.map((infraction: Infraction) => {
      return {
        label: capitalize(infraction?.libelle),
        value: infraction.id,
      };
    });

  const infractionSelected = infractions?.find(
    (infractionItem: Infraction) => {
      return (
        infractionItem.id ===
        infraction?.optionLibelle?.value
      );
    }
  );
  /**
   * @description Reset les valeurs des sous-catégories et des libellés
   */
  const handleChangeCategorie = () =>
    setValues({
      'infraction.optionSousCategorie': null,
      'infraction.optionLibelle': null,
    });

  /**
   * @description Reset les valeurs des libellés
   */
  const handleChangeSousCategorie = () =>
    setValues({
      'infraction.libelle': null,
    });

  if (!cpg) return <></>;

  return (
    <Section title={`Infraction (${cpg})`}>
      <Stack
        width={{ base: '100%', md: '50%', lg: '25%' }}
      >
        {/* Sélection du cractère d'urgence */}
        <SelectInfractionLotUrgence />
      </Stack>

      <Stack gap="inherit">
        <Stack
          gap="inherit"
          display={{ lg: 'flex' }}
          flexDir={{ base: 'column' }}
        >
          {modeSelection === 'libelle' ? (
            <>
              {infractionSelected ? (
                <Stack>
                  <LabelValueComponent
                    label="categorie"
                    value={infractionSelected?.categorie}
                  />
                  <LabelValueComponent
                    label="sous categorie"
                    value={
                      infractionSelected?.sousCategorie
                    }
                  />
                </Stack>
              ) : (
                <></>
              )}
              <Select
                label="Libellé de l'infraction"
                name="infraction.optionLibelle"
                placeholder="Sélectionnez une infraction"
                isLoading={isLoadingInfraction}
                isError={isErrorInfraction}
                options={uniqueOptions(optionsLibelle)}
                required
              />
            </>
          ) : (
            <Stack>
              <Select
                label="Catégorie de l'infraction"
                name="infraction.optionCategorie"
                placeholder="Sélectionnez une catégorie"
                isLoading={isLoadingInfraction}
                isError={isErrorInfraction}
                options={uniqueOptions(optionsCategorie)}
                required
                onChange={handleChangeCategorie}
              />

              <Select
                label="Sous catégorie de l'infraction"
                name="infraction.optionSousCategorie"
                placeholder="Sélectionnez une sous-catégorie"
                isLoading={isLoadingInfraction}
                isError={isErrorInfraction}
                options={uniqueOptions(
                  optionsSousCategorie
                )}
                required
                isDisabled={
                  !infraction?.optionCategorie?.value
                }
                onChange={handleChangeSousCategorie}
              />

              <Select
                label="Libellé de l'infraction"
                name="infraction.optionLibelle"
                placeholder="Sélectionnez une infraction"
                isLoading={isLoadingInfraction}
                isError={isErrorInfraction}
                options={uniqueOptions(
                  optionsLibelleModeCategorie
                )}
                required
                isDisabled={
                  !infraction?.optionSousCategorie?.value
                }
              />
            </Stack>
          )}

          <Text
            as="i"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={handleChangeModeSelection}
          >
            {modeSelection === 'categorie'
              ? "Sélectionner l'infraction par le libellé"
              : "Sélectionner l'infraction par catégorie et sous catégorie"}
          </Text>
        </Stack>
      </Stack>
    </Section>
  );
}

function getInitialProps() {
  return {};
}

SectionInfraction.getInitialProps = getInitialProps;
