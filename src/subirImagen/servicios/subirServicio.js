const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname, '../..', 'uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const pathDirect = () => {
  try {
    const directorioUploads = path.resolve(__dirname, '../..');

    return directorioUploads;
  } catch (error) {
    throw new Error(error);
  }
  // Supongamos que "uploads" está dentro de la carpeta "src"
};

const upload = multer({ storage: storage });
module.exports = { upload, pathDirect };
