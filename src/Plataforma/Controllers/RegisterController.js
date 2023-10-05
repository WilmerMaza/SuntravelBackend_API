const { Router } = require("express");
const { register_function } = require("../Services/RegisterService.js");
const { verificationToken } = require("../../Utils/validateToken.js");

const router = Router();

router.post("/", async (req, res) => {
  const dataFull = { ...req.body };

  try {
    // Llama a la función de registro en la capa de servicio
    await register_function(dataFull);

    const response = {
      isRegister: true,
      msg: "Your activity was created successfully",
    };
    res.status(200).send(response);
  } catch (error) {
    // Captura y envía el error desde la capa de servicio
    const response = {
      isRegister: false,
      msg: "We have detected an error when registering",
      error: error.message, // Puedes acceder al mensaje de error
    };
    res.status(400).send(response);
  }
});

module.exports = router;
