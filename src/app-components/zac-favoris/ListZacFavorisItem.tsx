import { Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { PiSquaresFourFill } from 'react-icons/pi';

import IconFavoris from '@/app-components/icon/IconFavoris';
import ZacFavoris from '@/interfaces/ZacFavoris';

type ListZacFavoris = {
  zacFavoris: ZacFavoris;
  handleDelete: (id: string) => void;
  isLoadingDeleteZacFavoris: boolean;
};
/**
 * @description List zac-favoris item
 * @param props
 * @constructor
 */
export default function ListZacFavorisItem(
  props: ListZacFavoris
): ReactElement {
  const {
    zacFavoris,
    handleDelete,
    isLoadingDeleteZacFavoris = false,
  } = props;

  return (
    <Stack
      direction="row"
      color="zac.500"
      justifyContent="space-between"
    >
      <Stack direction="row">
        <PiSquaresFourFill size={20} />
        <Text
          fontWeight="bold"
          fontSize="md"
        >
          {zacFavoris?.zac?.libZacMin}
        </Text>
      </Stack>

      <Stack color="gray.800">
        <IconFavoris
          variant="add"
          onClick={() => handleDelete(zacFavoris?.id)}
          isLoading={isLoadingDeleteZacFavoris}
        />
      </Stack>
    </Stack>
  );
}
