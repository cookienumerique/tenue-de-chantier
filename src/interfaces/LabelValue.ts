interface LabelValue {
  label: string | number | undefined;
  value: string | number;
  meta?:
    | {
        contactNotDefined: boolean;
        zacId: number;
        lotId: string;
      }
    | undefined;
}

export default LabelValue;
