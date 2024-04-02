import { ReactElement } from 'react';

import Select from '@/components/form/Select';
import uniqueOptions from '@/functions/uniqueOptions';
import useFindAllUtilisateursActive from '@/hooks/utilisateur/useFindAllUtilisateursActive';

type SelectUtilisateursProps = {
  label: string;
  defaultValue?: string | null;
  required?: boolean;
};

export default function SelectUtilisateurs(
  props: SelectUtilisateursProps
): ReactElement {
  const { label, defaultValue, required = false } = props;
  const {
    data: utilisateurs,
    isLoading: isLoadingUtilisteur,
    isError: isErrorUtilisteur,
  } = useFindAllUtilisateursActive({
    key: ['utilisateurs'],
  });

  const optionsUtilisateur = utilisateurs
    ?.map((utilisateur) => ({
      label: `${utilisateur?.prenom} ${utilisateur?.nom}`,
      value: `${utilisateur?.prenom} ${utilisateur?.nom}`,
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
      name="optionUtilisateur"
      placeholder={optionsUtilisateur?.[0]?.label}
      isLoading={isLoadingUtilisteur}
      isError={isErrorUtilisteur}
      options={uniqueOptions(optionsUtilisateur)}
      required={required}
      defaultValue={optionsUtilisateur?.find(
        (option) => option.value === defaultValue
      )}
      key={defaultValue}
    />
  );
}
