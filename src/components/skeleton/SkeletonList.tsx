import { Skeleton, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

type SkeletonListProps = {
  length?: number;
  height?: number;
};

/**
 * @description Skeleton list
 * @param props
 * @constructor
 */
export default function SkeletonList(
  props: SkeletonListProps
): ReactElement {
  const { length = 5, height = 10 } = props;

  const rowSkeletons = Array.from(
    { length },
    (_val, index) => (
      <Skeleton
        height={height}
        borderRadius="md"
        key={index}
      />
    )
  );

  return <Stack>{rowSkeletons}</Stack>;
}
