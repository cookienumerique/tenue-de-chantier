import LabelValue from '@/interfaces/LabelValue';

const uniqueOptions = (
  options: LabelValue[] | undefined
): LabelValue[] | undefined =>
  options?.filter(
    (option, index, self) =>
      index ===
      self.findIndex((t) => t.label === option.label)
  );
export default uniqueOptions;
