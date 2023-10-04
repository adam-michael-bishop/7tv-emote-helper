export async function encodeImageToBase64(url) {
  const imageUrlData = await fetch(url);
  const buffer = await imageUrlData.arrayBuffer();
  const stringifiedBuffer = Buffer.from(buffer).toString("base64");
  const contentType = imageUrlData.headers.get("content-type");

  const output = `data:${contentType};base64,${stringifiedBuffer}`;

  return output;
}
