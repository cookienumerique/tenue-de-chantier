import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import File from '@/interfaces/File';
import FindListProps from '@/types/query/FindListProps';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description Query for retrieving all files
 */
const useFindAllFile = ({
  enabled = true,
  queryParameters,
}: FindListProps = {}): FindListReturn<File[]> => {
  const queryKey = ['files', queryParameters?.toString()];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    () =>
      axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/files`,
        {
          params: queryParameters,
        }
      ),
    { enabled }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { files } =
    (response?.data as unknown as {
      files: File[] | undefined;
    }) ?? {};

  return {
    data: files,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindAllFile;
