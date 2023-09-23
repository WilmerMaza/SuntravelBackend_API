const { Router } = require("express");
const { Nuevoservicio, mostrarservicio,actualizarservicio} = require("../Services/servicioService.js");
const router = Router();

router.post("/create", async (req, res) => {
  const dataFull = { ...req.body };
  try {

    await Nuevoservicio(dataFull);
    const response = {
      isRegister: true,
      msg: "Your activity was created successfully"

    };

    res.status(200).send(response);
  } catch (error) {
    const response = {
      isRegister: false,
      msg: "We have detected an error when registering",
      error: error.message, // Utiliza error.message para obtener el mensaje de error
    };
    res.status(400).send(response);
  }
  
});
router.get("/mostrar", async (req, res) => {
  const dataFull = { ...req.body };
  try {

  const hola =  await mostrarservicio(dataFull);
  res.status(200).send(hola);

  
  } catch (error) {
    const response = {
      isRegister: false,
      msg: "We have detected an error when registering",
      error: error.message, // Utiliza error.message para obtener el mensaje de error
    };
    res.status(400).send(response);
  }

});





module.exports = router;
