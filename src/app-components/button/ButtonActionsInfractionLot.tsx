import { Text } from '@chakra-ui/react';

import ModalCommentaireInfraction from '@/app-components/infraction-lot/ModalCommentaireInfraction';
import ModalDateButoir from '@/app-components/infraction-lot/ModalDateButoir';
import ModalFiles from '@/app-components/infraction-lot/ModalFiles';
import ModalStatutInfraction from '@/app-components/infraction-lot/ModalStatutInfraction';
import ButtonMenu from '@/components/button/ButtonMenu';
import { useAuthentification } from '@/context/AuthentificationProvider';
import useFindEvenementsByInfractionLotId from '@/hooks/evenement/useFindEvenementsByInfractionLotId';
import useFindFilesInfractionLotById from '@/hooks/file/useFindFilesInfractionLotById';
import useBuildMenuActionInfractionLot from '@/hooks/infractionLots/useBuildMenuActionInfractionLot';
import useFindActionsByInfractionLotId from '@/hooks/infractionLots/useFindActionsByInfractionLotId';
import useFindInfractionLotById from '@/hooks/infractionLots/useFindInfractionLotById';
import useFindLotById from '@/hooks/lots/useFindLotById';
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
    invalidate: invalidateInfractionLot,
    data: infractionLot,
  } = useFindInfractionLotById({
    id: infractionLotId,
  });

  const { data: lot } = useFindLotById({
    id: infractionLot?.lotId,
  });
  const { zac } = lot ?? {};
  const { libAmgr } = zac ?? {};

  const {
    actions: optionsActions,
    isOpenModalFiles,
    onCloseModalFiles,
    isOpenModalStatutInfraction,
    onCloseModalStatutInfraction,
    isOpenModalDateButoir,
    onCloseModalDateButoir,
    isOpenModalCommentaireInfraction,
    onCloseModalCommentaireInfraction,
  } = useBuildMenuActionInfractionLot({
    actions: actions,
    patrimoineZac: libAmgr,
  });

  const { invalidate: invalidateFilesInfractionLot } =
    useFindFilesInfractionLotById({
      infractionLotId,
    });

  const { invalidate: invalidateEvenements } =
    useFindEvenementsByInfractionLotId({
      id: infractionLot?.id,
      enabled: !!infractionLot?.id,
    });

  const { invalidate: invalidateActions } =
    useFindActionsByInfractionLotId({
      id: infractionLotId,
    });

  const { invalidateUser } = useAuthentification();

  /**
   * @description Callback on success update statut
   */
  const callbackOnSuccesssUpdateStatut = () => {
    invalidateUser();
    invalidateActions();
    invalidateInfractionLot();
    invalidateEvenements();
  };

  /**
   * @description Callback on success update dateButoir
   */
  const callbackOnSuccesssUpdateDateButoir = () => {
    invalidateUser();
    invalidateInfractionLot();
    invalidateEvenements();
  };
  /**
   * @description Callback on success upload files
   */
  const callbackOnSuccesssUploadFiles = () => {
    invalidateUser();
    invalidateFilesInfractionLot();
    invalidateEvenements();
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
          callbackOnSuccesssUploadFiles
        }
      />
      <ModalStatutInfraction
        optionsStatut={optionsStatut}
        isOpen={isOpenModalStatutInfraction}
        onClose={onCloseModalStatutInfraction}
        infractionLotId={infractionLotId}
        callbackOnUpdate={callbackOnSuccesssUpdateStatut}
        dateButoir={infractionLot?.dateButoir}
      />
      <ModalCommentaireInfraction
        isOpen={isOpenModalCommentaireInfraction}
        onClose={onCloseModalCommentaireInfraction}
        infractionLotId={infractionLotId}
        callbackOnUpdate={callbackOnSuccesssUpdateStatut}
      />
      <ModalDateButoir
        isOpen={isOpenModalDateButoir}
        onClose={onCloseModalDateButoir}
        infractionLotId={infractionLotId}
        callbackOnUpdate={
          callbackOnSuccesssUpdateDateButoir
        }
        dateButoir={infractionLot?.dateButoir}
      />

      <ButtonMenu
        size="md"
        items={optionsActions}
        isLoading={isLoading}
      />
    </>
  );
};

export default ButtonActionsInfractionLot;
