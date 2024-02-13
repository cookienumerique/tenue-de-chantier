import axios from 'axios';

import downloadBlob from '@/functions/file/downloadBlob';

/**
 * @description Download file
 */
const downloadFileById = async ({
  id,
  fileName,
}: {
  id: string;
  fileName: string;
}): Promise<void> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/files/${id}`,
      {
        responseType: 'blob',
      }
    );

    return downloadBlob({
      blob: response as unknown as Blob,
      fileName,
    });
  } catch (e) {
    console.error(e);
  }
};

export default downloadFileById;
