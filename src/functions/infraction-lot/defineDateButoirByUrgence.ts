import dayjs from 'dayjs';

import InfractionLotUrgenceEnum from '@/enums/InfractionLotUrgenceEnum';

export default function defineDateButoirByUrgence({
  urgence,
}: {
  urgence: string | undefined;
}): string {
  const date = dayjs();

  if (urgence === InfractionLotUrgenceEnum.NON_CRITIQUE) {
    return date.add(2, 'day').format('YYYY-MM-DD');
  }

  if (urgence === InfractionLotUrgenceEnum.URGENT) {
    return date.add(5, 'day').format('YYYY-MM-DD');
  }

  return date.format('YYYY-MM-DD');
}
