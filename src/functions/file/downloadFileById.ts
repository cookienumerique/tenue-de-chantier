import axios from 'axios';

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
    const url = window.URL.createObjectURL(
      response as unknown as Blob
    );

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Specify the file name
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
  }
};

export default downloadFileById;
