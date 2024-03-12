import { Stack, Text } from '@chakra-ui/react';
import { MouseEvent, ReactElement } from 'react';
import { FaList } from 'react-icons/fa6';
import { PiSquaresFourFill } from 'react-icons/pi';

import IconFavoris from '@/app-components/icon/IconFavoris';
import IconButton from '@/components/button/IconButton';
import { theme } from '@/config/theme';
import ZacFavoris from '@/interfaces/ZacFavoris';

type ListZacFavoris = {
  zacFavoris: ZacFavoris;
  handleClick: (zacId: string) => void;
  handleClickList: ({
    zacId,
    event,
  }: {
    zacId: string;
    event: MouseEvent<HTMLButtonElement>;
  }) => void;
  handleDelete: ({
    zacId,
    event,
  }: {
    zacId: string;
    event: MouseEvent<HTMLButtonElement>;
  }) => void;
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
    handleClick,
    handleClickList,
    isLoadingDeleteZacFavoris = false,
  } = props;
  const { colors } = theme;

  return (
    <Stack
      direction="row"
      color="zac.500"
      justifyContent="space-between"
      backgroundColor="gray.50"
      borderRadius="md"
      _hover={{
        backgroundColor: 'gray.100',
      }}
      cursor="pointer"
      padding="2xs"
      alignItems="center"
    >
      <Stack
        direction="row"
        onClick={() =>
          handleClick(zacFavoris?.zac?.id?.toString())
        }
        alignItems="center"
      >
        <PiSquaresFourFill size={20} />
        <Text
          fontWeight="bold"
          fontSize="md"
        >
          {zacFavoris?.zac?.libZacMin}
        </Text>
      </Stack>

      <Stack
        direction="row"
        color="gray.800"
        alignItems="center"
        gap="2xs"
      >
        <IconButton
          backgroundColor={colors?.zac[500]}
          aria-label="liste-infraction-zac"
          icon={
            <FaList
              color="white"
              size={15}
            />
          }
          label="Consulter les infractions"
          onClick={(event) =>
            handleClickList({
              event,
              zacId: zacFavoris?.zac?.id?.toString(),
            })
          }
        />

        <IconFavoris
          variant="add"
          onClick={(event) =>
            handleDelete({ zacId: zacFavoris?.id, event })
          }
          isLoading={isLoadingDeleteZacFavoris}
        />
      </Stack>
    </Stack>
  );
}
