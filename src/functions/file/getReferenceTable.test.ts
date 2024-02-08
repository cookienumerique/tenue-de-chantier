import getReferenceTable from '@/functions/file/getReferenceTable';

describe('getReferenceTable', () => {
  it('should return reference table', () => {
    const actual = getReferenceTable();
    const expected = {
      infraction_lot: 'infraction_lot',
    };

    expect(actual).toStrictEqual(expected);
  });
});
