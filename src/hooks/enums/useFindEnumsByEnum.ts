import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import FindListProps from '@/types/query/FindListProps';
import FindListReturn from '@/types/query/FindListReturn';

type FindEnumsByEnumNameProps = {
  enumName: string;
} & FindListProps;

/**
 * @description Récupère toutes les infractions d'un CPG
 */
const useFindEnumsByEnumName = (
  props: FindEnumsByEnumNameProps
): FindListReturn<string[]> => {
  const { enumName, key } = props;
  const queryKey = key ?? ['enums', enumName];
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    queryKey,
    () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/enums/${enumName}`
      );
    }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { enums } =
    (data as unknown as {
      enums: string[];
    }) ?? {};

  return {
    data: enums,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindEnumsByEnumName;
