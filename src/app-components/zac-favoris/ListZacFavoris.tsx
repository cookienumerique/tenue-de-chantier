import { Stack, Text } from '@chakra-ui/react';
import { ReactElement, useState } from 'react';

import ListZacFavorisItem from '@/app-components/zac-favoris/ListZacFavorisItem';
import AlertErrorFetchData from '@/components/alert/AlertErrorFetchData';
import SkeletonList from '@/components/skeleton/SkeletonList';
import useDeleteZacFavoris from '@/hooks/zac-favoris/useDeleteZacFavoris';
import ZacFavoris from '@/interfaces/ZacFavoris';

type ListZacFavoris = {
  isLoading: boolean;
  isError: boolean;
  zacFavoris: ZacFavoris[] | undefined;
  callbackOnSuccessDelete: () => void;
};

/**
 * @description List zac-favoris
 * @param props
 * @constructor
 */
export default function ListZacFavoris(
  props: ListZacFavoris
): ReactElement {
  const {
    isLoading: isLoadingZacFavoris,
    zacFavoris,
    callbackOnSuccessDelete,
  } = props;
  const {
    mutate: deleteZacFavoris,
    isLoading: isLoadingDelete,
    isError,
  } = useDeleteZacFavoris({
    callbackOnSuccess: () => {
      callbackOnSuccessDelete();
      setZacFavorisId(null);
    },
  });
  const [zacFavorisId, setZacFavorisId] = useState<
    string | null
  >(null);
  /**
   * @description Delete zac-favoris
   * @param id
   */
  const handleDelete = (id: string) => {
    setZacFavorisId(id);
    deleteZacFavoris(id);
  };
  return (
    <Stack>
      {isLoadingZacFavoris ? (
        <SkeletonList height={20} />
      ) : (
        <></>
      )}

      {isError ? <AlertErrorFetchData /> : <></>}

      {zacFavoris?.length === 0 ? (
        <Text
          as="i"
          textAlign="center"
        >
          Aucune ZAC en favoris
        </Text>
      ) : (
        <>
          {zacFavoris?.map((zacFavoris) => (
            <ListZacFavorisItem
              key={zacFavoris?.id}
              zacFavoris={zacFavoris}
              handleDelete={handleDelete}
              isLoadingDeleteZacFavoris={
                isLoadingDelete &&
                zacFavorisId === zacFavoris?.id
              }
            />
          ))}
        </>
      )}
    </Stack>
  );
}
