import { ReactElement } from 'react';

import Select from '@/components/form/Select';
import uniqueOptions from '@/functions/uniqueOptions';
import useFindAllInfractions from '@/hooks/infractions/useFindAllInfractions';

type SelectInfractionsProps = {
  required?: boolean;
  label?: string;
  defaultValue: string | null;
  keyInfraction?:
    | 'categorie'
    | 'sousCategorie'
    | 'libelle';
};
export default function SelectInfraction(
  props: SelectInfractionsProps
): ReactElement {
  const {
    defaultValue,
    label = 'Catégorie',
    keyInfraction = 'categorie',
    required = false,
  } = props;
  const {
    data: infractions,
    isLoading: isLoadingInfraction,
    isError: isErrorInfraction,
  } = useFindAllInfractions();

  const optionsSousCategorie = infractions
    ?.map((infraction) => ({
      label: infraction?.[keyInfraction],
      value: infraction?.[keyInfraction],
    }))
    .sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });
  return (
    <Select
      label={label}
      name="optionSousCategorie"
      placeholder="Sélectionnez une infraction"
      isLoading={isLoadingInfraction}
      isError={isErrorInfraction}
      options={uniqueOptions(optionsSousCategorie)}
      required={required}
      defaultValue={optionsSousCategorie?.find(
        (option) => option?.value === defaultValue
      )}
      key={defaultValue}
    />
  );
}
