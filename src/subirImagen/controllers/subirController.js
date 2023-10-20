const { Router } = require("express");
const router = Router();
const {
  upload,
  pathDirect,
  findImgArray,
} = require("../servicios/subirServicio");
const fs = require("fs");
const path = require("path");


router.post("/upload", upload.array("file"), (req, res) => {
  function saveImagen(file) {
    const newPath = `./uploads${file.orinalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
  }

  const response = {
    isUpload: true,
    msg: "Your activity was created successfully",
  };
  res.status(200).json(response);
});

router.get("/lower/:filename", (req, res) => {
  const filename = req.params.filename;
  const fileExtension = path.extname(filename).toLowerCase();
  const carpeta = pathDirect();

  const contentTypeMap = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp", // Agrega la extensión .webp y su tipo de contenido
    // Agrega aquí otros formatos si los necesitas
  };

  // Verifica si el formato es válido en el mapeo
  if (contentTypeMap[fileExtension]) {
    res.setHeader("Content-Type", contentTypeMap[fileExtension]);
    res.sendFile(path.join(carpeta, "uploads", filename));
  } else {
    res.status(400).json({ error: "Formato de imagen no admitido" });
  }
});

router.post("/lowerArray", async (req, res) => {
  try {
    const img = await findImgArray(req);
    return img
      ? res.json({ img })
      : res
          .status(400)
          .json({ error: "Ninguna imagen válida encontrada en la lista" });
  } catch (error) {
    res.json({ error: error });
  }
});
module.exports = router;
