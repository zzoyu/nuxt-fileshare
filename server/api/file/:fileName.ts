import fs from "fs";

export default defineEventHandler(async (event) => {
  console.log(event.context);
  const encodedFileName = event.context.params?.fileName;
  if (!encodedFileName) return { error: "file name is missing" };
  const decodedFileName = decodeURIComponent(encodedFileName);

  const path = process.env.SHARE_PATH;
  const filterRaw = process.env.EXTENSION_FILTER;
  const filterList = filterRaw ? filterRaw.split(",") : [];

  if (!path) return { error: "the path is unvalid." };

  if (!fs.existsSync(path + "/" + decodedFileName)) {
    return { error: "file not found" };
  }

  console.log(decodedFileName);
  return sendStream(event, fs.createReadStream(path + "/" + decodedFileName));
});
