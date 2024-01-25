import { Text } from '@chakra-ui/react';

import ButtonMenu from '@/components/button/ButtonMenu';
import ActionInfractionEnum from '@/enums/ActionInfractionEnum';
import buildMenuActionInfractionLot from '@/functions/infraction-lot/buildMenuActionInfractionLot';

type ButtonActionsInfractionLotProps = {
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
  const { actions, isLoading, isError } = props;

  if (isError) {
    return <Text>Une erreur est survenue</Text>;
  }

  // Check if action is in enum
  const actionsMenu = actions
    ?.filter((actionItem) =>
      Object.values(ActionInfractionEnum).includes(
        actionItem
      )
    )
    // Get callback and label by action
    ?.map((action) => {
      return buildMenuActionInfractionLot(action);
    });

  return (
    <ButtonMenu
      items={actionsMenu}
      isLoading={isLoading}
    />
  );
};

export default ButtonActionsInfractionLot;
