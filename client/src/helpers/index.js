export async function loadImagesAsFiles(imageUrls) {
  const files = [];

  for (const url of imageUrls) {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileName = getFileNameFromUrl(url);

    const file = new File([blob], fileName, { type: blob.type });
    files.push(file);
  }

  return files;
}

function getFileNameFromUrl(url) {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 1];
}
