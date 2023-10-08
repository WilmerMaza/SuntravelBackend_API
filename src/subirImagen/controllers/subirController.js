const { Router } = require("express");
const router = Router();
const { upload } = require("../servicios/subirServicio");
const fs = require('fs');

router.post('/upload', upload.array('file'), (req, res) => {
function saveImagen(file){
  const newPath=`./uploads${file.orinalname}`
  fs.renameSync(file.path,newPath);
  return newPath;
}

  res.sendStatus(200);
});
module.exports = router;