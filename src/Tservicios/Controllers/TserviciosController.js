const { Router } = require("express");
const { getTservicios } = require("../Services/TserviciosService.js");
const router = Router();

router.get("/getTservicios", async (req, res) => {
  try {
    const TipoServicio = await getTservicios();
    res.status(200).send(TipoServicio);
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
