import getReferenceTable from '@/functions/file/getReferenceTable';
import useFindAllFile from '@/hooks/file/useFindAllFile';

type FindFilesInfractionLotByIdProps = {
  infractionLotId: string | undefined;
};
/**
 * @description Returns the files of a infraction lot by id
 * @param infractionLot
 */
export default function useFindFilesInfractionLotById({
  infractionLotId,
}: FindFilesInfractionLotByIdProps) {
  const queryParametersFiles = new URLSearchParams();
  const { infraction_lot } = getReferenceTable();
  queryParametersFiles.set(
    'reference_id',
    infractionLotId as string
  );
  queryParametersFiles.set(
    'reference_table',
    infraction_lot
  );

  const { data, isLoading, isError, invalidate } =
    useFindAllFile({
      enabled: !!infractionLotId,
      queryParameters: queryParametersFiles,
    });

  return { data, isLoading, isError, invalidate };
}
