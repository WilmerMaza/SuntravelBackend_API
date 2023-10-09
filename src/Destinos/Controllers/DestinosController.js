const { Router } = require("express");
const { getDestinos } = require("../Services/DestinosService.js");
const router = Router();

router.get("/getDestinos", async (req, res) => {
  try {
    const Destinos = await getDestinos();
    res.status(200).send(Destinos);
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
