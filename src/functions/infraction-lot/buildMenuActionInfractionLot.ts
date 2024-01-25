import ActionInfractionEnum from '@/enums/ActionInfractionEnum';

/**
 * @description Build menu action infraction lot
 */
const buildMenuActionInfractionLot = (
  action: ActionInfractionEnum
): { label: string; onClick: () => void } => {
  const data = {
    [ActionInfractionEnum.ECRIRE_EMAIL]: {
      label: 'Ecrire un email',
      onClick: () => alert('Ecrire un email'),
    },
    [ActionInfractionEnum.ECRIRE_COURRIER_MISE_EN_DEMEURE]:
      {
        label: 'Ecrire un courrier de mise en demeure',
        onClick: () =>
          alert('Ecrire un courrier de mise en demeure'),
      },
    [ActionInfractionEnum.INDIQUER_PROBABLEMENT_RESOLU]: {
      label: 'Indiquer probablement résolu',
      onClick: () =>
        alert('Indiquer probablement résolu'),
    },
    [ActionInfractionEnum.FERMER_INFRACTION]: {
      label: 'Fermer l’infraction',
      onClick: () => alert('Fermer l’infraction'),
    },
    [ActionInfractionEnum.ECRIRE_COURRIER_CONSTAT_CARENCE]:
      {
        label: 'Ecrire un courrier de constat de carence',
        onClick: () =>
          alert(
            'Ecrire un courrier de constat de carence'
          ),
      },
    [ActionInfractionEnum.ECRIRE_COURRIER_COMPLEMENTAIRE]:
      {
        label: 'Ecrire un courrier complémentaire',
        onClick: () =>
          alert('Ecrire un courrier complémentaire'),
      },
    [ActionInfractionEnum.REOUVRIR_INFRACTION]: {
      label: 'Réouvrir l’infraction',
      onClick: () => alert('Réouvrir l’infraction'),
    },
  };
  return data[action] && data[action];
};

export default buildMenuActionInfractionLot;
