import { Badge, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import CpgEnum from '@/enums/CpgEnum';

type BadgeCpgProps = {
  cpg: CpgEnum | undefined;
  fontSize?: string;
};

/**
 * @description Badge qui affichage le CPG d'un lot
 */
export default function BadgeCpg(
  props: BadgeCpgProps
): ReactElement {
  const { cpg = 'Non renseigné', fontSize = 'xs' } =
    props;

  let colorScheme = 'gray';

  if (cpg === CpgEnum.CPG_EPAFRANCE_2014) {
    colorScheme = 'purple';
  } else if (cpg === CpgEnum.CPG_EPAMARNE_2014) {
    colorScheme = 'pink';
  } else if (cpg === CpgEnum.CPG_2023) {
    colorScheme = 'blue';
  }

  return (
    <Stack>
      <Badge
        colorScheme={colorScheme}
        fontSize={fontSize}
      >
        {cpg}
      </Badge>
    </Stack>
  );
}
