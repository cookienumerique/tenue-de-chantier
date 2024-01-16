import {
  SkeletonText as SkeletonTextChakra,
  SkeletonTextProps,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

export default function SkeletonText(
  props: SkeletonTextProps
): ReactElement {
  const {
    width,
    skeletonHeight = '4',
    noOfLines = 1,
  } = props;
  return (
    <SkeletonTextChakra
      skeletonHeight={skeletonHeight}
      width={width}
      noOfLines={noOfLines}
    />
  );
}
