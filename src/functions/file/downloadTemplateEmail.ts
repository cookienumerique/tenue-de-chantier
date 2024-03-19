import axios from 'axios';

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

    return downloadBlob({
      blob: response as unknown as Blob,
      fileName: 'template-email.docx',
    });
  } catch (e) {
    console.error(e);
  }
};

export default downloadTemplateEmail;
