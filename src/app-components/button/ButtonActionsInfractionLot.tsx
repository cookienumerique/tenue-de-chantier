import { Text } from '@chakra-ui/react';

import ModalFiles from '@/app-components/infraction-lot/ModalFiles';
import ButtonMenu from '@/components/button/ButtonMenu';
import ActionInfractionEnum from '@/enums/ActionInfractionEnum';
import useBuildMenuActionInfractionLot from '@/hooks/infractionLots/useBuildMenuActionInfractionLot';

type ButtonActionsInfractionLotProps = {
  infractionLotId: string | undefined;
  actions: ActionInfractionEnum[] | undefined;
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

  // Check if action is in enum
  const actionsMenu = actions?.filter((actionItem) =>
    Object.values(ActionInfractionEnum).includes(
      actionItem
    )
  );

  const {
    actions: optionsActions,
    isOpenModalFiles,
    onCloseModalFiles,
  } = useBuildMenuActionInfractionLot({
    actions: actionsMenu,
  });
  if (isError) {
    return <Text>Une erreur est survenue</Text>;
  }

  return (
    <>
      <ModalFiles
        isOpen={isOpenModalFiles}
        onClose={onCloseModalFiles}
        infractionLotId={infractionLotId}
      />
      <ButtonMenu
        items={optionsActions}
        isLoading={isLoading}
      />
    </>
  );
};

export default ButtonActionsInfractionLot;
