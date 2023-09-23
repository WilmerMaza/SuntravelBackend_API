const { Router } = require("express");
const { crearServicio, mostrarServicio,} = require("../Services/servicioService.js");
const router = Router();

router.post("/create", async (req, res) => {
  const dataFull = { ...req.body };
  try {

    await crearServicio(dataFull);
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
router.get("/MostrarServicio", async (req, res) => {
  const dataFull = { ...req.body };
  try {

  const mostrarServicios =  await mostrarServicio(dataFull);
  res.status(200).send(mostrarServicios);

  
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
