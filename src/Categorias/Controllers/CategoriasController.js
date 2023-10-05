const { Router } = require("express");
const { getCategorias } = require("../Services/CategoriasService.js");
const router = Router();

router.get("/getCategorias", async (req, res) => {
  try {
    const categoria = await getCategorias();
    res.status(200).send(categoria);
  } catch (error) {
    const response = {
      isRegister: false,
      msg: "We have detected an error when categorias",
      error: error.message, // Utiliza error.message para obtener el mensaje de error
    };
    res.status(400).send(response);
  }
});

module.exports = router;
