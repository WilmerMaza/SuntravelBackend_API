const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../..", "uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const pathDirect = () => {
  try {
    const directorioUploads = path.resolve(__dirname, "../..");

    return directorioUploads;
  } catch (error) {
    throw new Error(error);
  }
  // Supongamos que "uploads" está dentro de la carpeta "src"
};

const findImgArray = async (request) => {
  const carpeta = pathDirect();
  const images = [];

  request.forEach((imageName) => {
    const imagePath = path.join(carpeta, "uploads", imageName);
    if (fs.existsSync(imagePath)) {
      images.push({ name: imageName, path: imagePath });
    }
  });

  if (images.length === 0) {
    return null;
  }

  return images;
};

const upload = multer({ storage: storage });
module.exports = { upload, pathDirect, findImgArray };
