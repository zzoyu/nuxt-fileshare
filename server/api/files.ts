import fs from "node:fs";
import { sendStream } from "h3";

export default defineEventHandler((event) => {
  const limit = Number(getQuery(event)?.limit) || 20;
  const page = Number(getQuery(event)?.page) || 1;

  console.log(page, limit);

  const path = process.env.SHARE_PATH;
  const filterRaw = process.env.EXTENSION_FILTER;
  const filterList = filterRaw ? filterRaw.split(",") : [];

  if (!path) throw new Error("SHARE_PATH is not defined");

  const files = fs.readdirSync(path);
  const filteredFiles = files.filter((file) => {
    if (filterList.length === 0) return true;
    for (const filter of filterList) {
      if (file.endsWith(filter)) return true;
    }
    return false;
  });

  return {
    files: filteredFiles.slice((page - 1) * limit, page * limit),
    total: filteredFiles.length,
    page,
    limit,
  };
});
