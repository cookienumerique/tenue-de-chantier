import axios from 'axios';
import dayjs from 'dayjs';

import downloadBlob from '@/functions/file/downloadBlob';

/**
 * @description Download template email by infractionId
 */
const downloadTemplateEmail = async ({
  infractionLotId,
}: {
  infractionLotId: string | undefined;
}): Promise<void> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions-lots/${infractionLotId}/template-email`,
      {
        responseType: 'blob',
      }
    );

    // format y m d h i s with dayjs
    const date = dayjs().format('YYYYMMDD_HHmmss');
    return downloadBlob({
      blob: response?.data as unknown as Blob,
      fileName: `${date}_template-email.docx`,
    });
  } catch (e) {
    console.error(e);
  }
};

export default downloadTemplateEmail;
