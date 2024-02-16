import dayjs from 'dayjs';

import InfractionLotUrgenceEnum from '@/enums/InfractionLotUrgenceEnum';
import defineDateButoirByUrgence from '@/functions/infraction-lot/defineDateButoirByUrgence';

describe('defineDateButoirByUrgence', () => {
  it('when urgence is not defined', () => {
    const actual = defineDateButoirByUrgence({
      urgence: undefined,
    });

    const expected = dayjs().format('YYYY-MM-DD');

    expect(actual).toBe(expected);
  });

  it('when urgence is "NON_CRITIQUE', () => {
    const actual = defineDateButoirByUrgence({
      urgence: InfractionLotUrgenceEnum.NON_CRITIQUE,
    });

    const expected = dayjs()
      .add(2, 'day')
      .format('YYYY-MM-DD');

    expect(actual).toBe(expected);
  });

  it('when urgence is "URGENT', () => {
    const actual = defineDateButoirByUrgence({
      urgence: InfractionLotUrgenceEnum.URGENT,
    });

    const expected = dayjs()
      .add(5, 'day')
      .format('YYYY-MM-DD');

    expect(actual).toBe(expected);
  });
});
