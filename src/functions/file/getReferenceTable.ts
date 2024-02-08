type ReferenceTableReturn = {
  infraction_lot: string;
};

/**
 * @description Returns the reference table for the file
 */
export default function getReferenceTable(): ReferenceTableReturn {
  return {
    infraction_lot: 'infraction_lot',
  };
}
