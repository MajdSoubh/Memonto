import { unlink } from "node:fs";
import path from "path";

export const removeFile = (filePath) => {
  const appDirectory = path.resolve(); // Get the application's root directory
  const AbsolutefilePath = path.join(appDirectory, filePath);

  unlink(AbsolutefilePath, (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

export const extractFilename = (filePath) => {
  return filePath.slice(filePath.lastIndexOf("/") + 1);
};
