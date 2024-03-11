import { Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import Button from '@/components/button/Button';

type ToggleSelectInfractionProps = {
  selection: 'libelle' | 'categorie';
  onClick: () => void;
};

/**
 * @description Display infraction by label or category
 * @param props
 * @constructor
 */
export default function ToggleSelectInfraction(
  props: ToggleSelectInfractionProps
): ReactElement {
  const { selection, onClick } = props;

  const commonProps = {
    colorScheme: 'primary',
    onClick,
    size: 'sm',
  };

  return (
    <Stack direction={{ base: 'column', md: 'row' }}>
      <Button
        variant={
          selection === 'categorie' ? 'outline' : 'solid'
        }
        {...commonProps}
      >
        Recherche par libellé
      </Button>
      ) : (
      <Button
        variant={
          selection === 'categorie' ? 'solid' : 'outline'
        }
        {...commonProps}
      >
        Recherche par catégorie et sous catégorie
      </Button>
    </Stack>
  );
}
