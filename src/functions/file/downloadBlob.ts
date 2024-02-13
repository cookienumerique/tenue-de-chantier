/**
 * @description Download blob
 */
const downloadBlob = async ({
  blob,
  fileName,
}: {
  blob: Blob;
  fileName: string;
}): Promise<void> => {
  try {
    const url = window.URL.createObjectURL(blob);
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

export default downloadBlob;
