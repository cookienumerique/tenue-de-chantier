import axios from 'axios';

import downloadBlob from '@/functions/file/downloadBlob';

/**
 * @description Download template by name
 */
const downloadTemplate = async ({
  fileName,
}: {
  fileName: string;
}): Promise<void> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/files/template/${fileName}`,
      {
        responseType: 'blob',
      }
    );

    return downloadBlob({
      blob: response?.data as unknown as Blob,
      fileName,
    });
  } catch (e) {
    console.error(e);
  }
};

export default downloadTemplate;
