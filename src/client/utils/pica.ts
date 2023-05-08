import Pica from "pica";

export function resizeImageBlob(
  blob: Blob,
  mimeType: string,
  size: number
): Promise<Blob> {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const image = new Image();
  setTimeout(() => (image.src = URL.createObjectURL(blob)));
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const aspect = image.width / image.height;
      const width = image.width > image.height ? size : size * aspect;
      const height = image.width > image.height ? size / aspect : size;
      canvas.width = width;
      canvas.height = height;
      const pica = Pica();
      pica
        .resize(image, canvas, {})
        .then((result) => pica.toBlob(result, mimeType, 0.9))
        .then((resizedBlob) => resolve(resizedBlob))
        .catch((error) => reject(error));
    };
  });
}
