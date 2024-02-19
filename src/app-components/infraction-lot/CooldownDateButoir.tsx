import { Icon, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ReactElement } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaCalendarXmark } from 'react-icons/fa6';

type CooldownDateButoirProps = {
  dateButoir: string;
  nbJoursDateButoir: number;
};
/**
 * @description Display text cooldown dateButoir
 * @param props
 * @constructor
 */
export default function CooldownDateButoir(
  props: CooldownDateButoirProps
): ReactElement {
  const { dateButoir, nbJoursDateButoir } = props;

  const dateButoirIsPassed =
    dayjs(dateButoir).isBefore(dayjs());

  const color = dateButoirIsPassed
    ? 'red.500'
    : 'green.500';
  return (
    <Stack
      direction="row"
      alignItems="center"
      color={color}
      fontWeight="bold"
    >
      <Icon
        as={
          dateButoirIsPassed
            ? FaCalendarXmark
            : FaCalendarCheck
        }
        boxSize={4}
        color="inherit"
      />
      <Text color="inherit">
        {dateButoirIsPassed
          ? `Date butoir dépassée depuis ${nbJoursDateButoir} jours`
          : `${nbJoursDateButoir} jours restants avant la date butoir`}
        {}
      </Text>
    </Stack>
  );
}
