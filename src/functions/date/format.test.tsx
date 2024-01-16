import formatDate from '@/functions/date/formatDate';

describe('date/format', () => {
  it('should return undefined when undefined provided', () => {
    const str = undefined;
    const expected = undefined;

    const actual = formatDate(str);
    expect(actual).toStrictEqual(expected);
  });

  it('should return null when null provided', () => {
    const str = null;
    const expected = null;

    const actual = formatDate(str);
    expect(actual).toStrictEqual(expected);
  });

  it('should return value formatted', () => {
    const str = '2024-01-27';
    const expected = '27/01/2024';

    const actual = formatDate(str);
    expect(actual).toStrictEqual(expected);
  });
});
