import multer from "multer";
import config from "config";

const generateFileName = (req, file, cb) => {
  const filename = "IMG_" + Date.now() + "_" + Math.round(Math.random() * 1e3);
  const extension = "." + file.mimetype.split("/")[1];
  cb(null, filename + extension);
};

const storage = {
  post: multer.diskStorage({
    destination: config.get("storage.image.post"),
    filename: generateFileName,
  }),
  profile: multer.diskStorage({
    destination: config.get("storage.image.profile"),
    filename: generateFileName,
  }),
};

export default storage;
