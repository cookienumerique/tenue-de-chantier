import { Box, Text } from '@chakra-ui/react';
import { useFormContext } from '@formiz/core';
import { ReactElement } from 'react';

import Popover from '@/components/popover/Popover';

type PopoverCloseInfractionProps = {
  isLoading: boolean;
};

export default function PopoverCloseInfraction(
  props: PopoverCloseInfractionProps
): ReactElement {
  const { isLoading } = props;
  const form = useFormContext();
  return (
    <Popover
      triggerProps={{
        label: "Fermer l'infraction",
        colorScheme: 'red',
      }}
      propsConfirm={{
        onClick: form.submit,
        colorScheme: 'green',
        isLoading,
      }}
    >
      <Text
        fontSize="sm"
        color="gray.600"
      >
        Êtes-vous sûr de vouloir fermer cette infraction?{' '}
        <Box
          as="span"
          fontWeight="bold"
        >
          Cette action est irréversible.
        </Box>
      </Text>
    </Popover>
  );
}

function getInitialProps() {
  return {};
}

PopoverCloseInfraction.getInitialProps = getInitialProps;
