// Helper to crop image using react-easy-crop
// https://codesandbox.io/s/react-easy-crop-with-cropped-output-lkh1c?file=/src/cropImage.js
import Cropper from "react-easy-crop";

export default async function getCroppedImg(imageSrc, crop) {
  // Detect original image format from data URL, but only allow jpeg or png for output
  let outputFormat = "image/jpeg";
  if (typeof imageSrc === "string" && imageSrc.startsWith("data:")) {
    const match = imageSrc.match(/^data:(image\/(jpeg|png));/);
    if (match) {
      outputFormat = match[1];
    }
  }
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new window.Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  // canvas.toDataURL does not take a callback, it returns the data URL directly
  return canvas.toDataURL(outputFormat);
}
