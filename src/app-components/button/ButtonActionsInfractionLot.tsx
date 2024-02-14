import { Text } from '@chakra-ui/react';

import ModalDateButoire from '@/app-components/infraction-lot/ModalDateButoire';
import ModalFiles from '@/app-components/infraction-lot/ModalFiles';
import ModalStatutInfraction from '@/app-components/infraction-lot/ModalStatutInfraction';
import ButtonMenu from '@/components/button/ButtonMenu';
import useFindFilesInfractionLotById from '@/hooks/file/useFindFilesInfractionLotById';
import useBuildMenuActionInfractionLot from '@/hooks/infractionLots/useBuildMenuActionInfractionLot';
import useFindActionsByInfractionLotId from '@/hooks/infractionLots/useFindActionsByInfractionLotId';
import useFindInfractionLotById from '@/hooks/infractionLots/useFindInfractionLotById';
import ActionInfractionType from '@/types/action/ActionInfractionType';

type ButtonActionsInfractionLotProps = {
  infractionLotId: string | undefined;
  actions: ActionInfractionType | undefined;
  isLoading: boolean;
  isError: boolean;
};
/**
 * @description ButtonMenu for actions possibles in infractionLot
 * @param props
 * @constructor
 */
const ButtonActionsInfractionLot = (
  props: ButtonActionsInfractionLotProps
) => {
  const { infractionLotId, actions, isLoading, isError } =
    props;

  const {
    actions: optionsActions,
    isOpenModalFiles,
    onCloseModalFiles,
    isOpenModalStatutInfraction,
    onCloseModalStatutInfraction,
    isOpenModalDateButoire,
    onCloseModalDateButoire,
  } = useBuildMenuActionInfractionLot({
    actions: actions,
  });

  const { invalidate: invalidateFilesInfractionLot } =
    useFindFilesInfractionLotById({
      infractionLotId,
    });

  const {
    invalidate: invalidateInfractionLot,
    data: infractionLot,
  } = useFindInfractionLotById({
    id: infractionLotId,
  });

  const { invalidate: invalidateActions } =
    useFindActionsByInfractionLotId({
      id: infractionLotId,
    });

  const callbackOnSuccesssUpdateStatut = () => {
    invalidateActions();
    invalidateInfractionLot();
  };
  if (isError) {
    return <Text>Une erreur est survenue</Text>;
  }

  /**
   * @description Build options status availables
   */
  const optionsStatut = actions?.['CHANGER_STATUT']?.map(
    (statutEnum) => ({
      label: statutEnum?.value,
      value: statutEnum?.name,
    })
  );

  return (
    <>
      <ModalFiles
        isOpen={isOpenModalFiles}
        onClose={onCloseModalFiles}
        infractionLotId={infractionLotId}
        callbackOnUploadFile={
          invalidateFilesInfractionLot
        }
      />
      <ModalStatutInfraction
        optionsStatut={optionsStatut}
        isOpen={isOpenModalStatutInfraction}
        onClose={onCloseModalStatutInfraction}
        infractionLotId={infractionLotId}
        callbackOnUpdate={callbackOnSuccesssUpdateStatut}
      />
      <ModalDateButoire
        isOpen={isOpenModalDateButoire}
        onClose={onCloseModalDateButoire}
        infractionLotId={infractionLotId}
        callbackOnUpdate={callbackOnSuccesssUpdateStatut}
        dateButoire={infractionLot?.dateButoire}
      />

      <ButtonMenu
        items={optionsActions}
        isLoading={isLoading}
      />
    </>
  );
};

export default ButtonActionsInfractionLot;
