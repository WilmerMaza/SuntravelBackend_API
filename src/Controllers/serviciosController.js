const { Router } = require("express");
const { crearServicio, mostrarServicio, actualizarservicio, deleteService } = require("../Services/servicioService.js");
const router = Router();

router.post("/createService", async (req, res) => {
  const dataFull = { ...req.body };
  try {

    await createService(dataFull);
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
router.get("/getServicice", async (req, res) => {
  const dataFull = { ...req.body };
  try {

    const getServicice = await getServicice(dataFull);
    res.status(200).send(getServicice);


  } catch (error) {
    const response = {
      isRegister: false,
      msg: "We have detected an error when registering",
      error: error.message, // Utiliza error.message para obtener el mensaje de error
    };
    res.status(400).send(response);
  }

});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteService({ id });
    res.status(200).send()

  } catch (error) {
    const response = {
      isRegister: false,
      msg: "We have detected an error when registering",
      error: error.message, // Utiliza error.message para obtener el mensaje de error
    };
    res.status(400).send(response);
  }

})
router.put("/actualizar/:id", async (req, res) => {
  const id = req.params;
  const dataFull = { ...req.body };
  const dataComplete = { ...id, ...dataFull }
  try {
    await updateService(dataComplete);
    res.status(200).send("actualizacion exitosa")

  } catch (error) {
    const response = {
      isRegister: false,
      msg: "No se actualizo",
      error: error.message, // Utiliza error.message para obtener el mensaje de error
    };
    res.status(400).send(response);
  }

})



module.exports = router;
