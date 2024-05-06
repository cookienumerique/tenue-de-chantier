import { Stack } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import TextPrimary from '@/components/text/TextPrimary';
import TextSecondary from '@/components/text/TextSecondary';
import capitalizeStr from '@/functions/capitalize';

type LabelValueProps = {
  label: string;
  value?: string | undefined | number;
  children?: ReactElement;
  capitalize?: boolean;
  amount?: boolean;
};
/**
 * @description Afficher une valeur avec un label
 */
export default function LabelValue(
  props: LabelValueProps
): ReactElement {
  const {
    children,
    value,
    label,
    capitalize = true,
    amount = false,
    ...rest
  } = props;

  const val = amount ? `${value} €` : value;
  return (
    <Stack
      direction="row"
      spacing="md"
      {...rest}
    >
      <TextSecondary minWidth="8em">
        {label}
      </TextSecondary>
      {value ? (
        <TextPrimary>
          {capitalize ? capitalizeStr(val) : val}
        </TextPrimary>
      ) : (
        children
      )}
    </Stack>
  );
}
