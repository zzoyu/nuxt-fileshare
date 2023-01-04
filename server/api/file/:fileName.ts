import fs from "fs";

export default defineEventHandler(async (event) => {
  console.log(event.context);
  const encodedFileName = event.context.params?.fileName;
  if (!encodedFileName) throw new Error("fileName is not defined");
  const decodedFileName = decodeURIComponent(encodedFileName);

  const path = process.env.SHARE_PATH;
  const filterRaw = process.env.EXTENSION_FILTER;
  const filterList = filterRaw ? filterRaw.split(",") : [];

  if (!path) throw new Error("SHARE_PATH is not defined");

  console.log(decodedFileName);
  return sendStream(event, fs.createReadStream(path + "/" + decodedFileName));
});
