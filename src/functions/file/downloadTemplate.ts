import axios from 'axios';

import downloadBlob from '@/functions/file/downloadBlob';

/**
 * @description Download template by name
 */
const downloadTemplate = async ({
  infractionLotId,
  name,
}: {
  infractionLotId: string | undefined;
  name: string;
}): Promise<void> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions-lots/template/${infractionLotId}/${name}`,
      {
        responseType: 'blob',
      }
    );

    return downloadBlob({
      blob: response?.data as unknown as Blob,
      fileName: name,
    });
  } catch (e) {
    console.error(e);
  }
};

export default downloadTemplate;
