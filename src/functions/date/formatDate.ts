import dayjs from 'dayjs';

type FormatDateProps = (
  str: string | undefined | null,
  format?: string
) => string | undefined | null;

/**
 * @description Formatter une date au format DD/MM/YYYY
 */
const formatDate: FormatDateProps = (
  dateStr,
  format = 'DD/MM/YYYY'
) => {
  if (!dateStr) return dateStr;
  const date = dayjs(dateStr);

  return date.format(format);
};

export default formatDate;
