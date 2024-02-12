import ActionInfractionEnum from '@/enums/ActionInfractionEnum';

type ActionInfractionType = {
  CHANGER_STATUT: { name: string; value: string }[];
} & {
  [key: string]: ActionInfractionEnum;
};
export default ActionInfractionType;
