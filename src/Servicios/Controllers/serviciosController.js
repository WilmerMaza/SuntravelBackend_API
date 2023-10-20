const { Router } = require("express");
const {
  createService,
  getServicice,
  updateService,
  deleteService,
  getFindServicice,
  getFindService,
  getFindServicesID
} = require("../Services/servicioService.js");
const router = Router();

router.post("/createService", async (req, res) => {
  const dataFull = { ...req.body };
  try {
    await createService(dataFull);
    const response = {
      isRegister: true,
      msg: "Your activity was created successfully",
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
    const servicio = await getServicice();
    res.status(200).send(servicio);
  } catch (error) {
    const response = {
      isRegister: false,
      msg: "We have detected an error when registering",
      error: error.message, // Utiliza error.message para obtener el mensaje de error
    };
    res.status(400).send(response);
  }
});

router.post("/getfindServicice", async (req, res) => {
  const dataFull = { ...req.body };
  try {
    const servicio = await getFindServicesID(dataFull);
    res.status(200).send(servicio);
  } catch (error) {
    const response = {
      isRegister: false,
      msg: "We have detected an error when registering",
      error: error.message, // Utiliza error.message para obtener el mensaje de error
    };
    res.status(400).send(response);
  }
});

router.post("/getServiciceWeb", async (req, res) => {
  const dataFull = req.body ;
  try {
    const servicio = await getFindService(dataFull);
    res.status(200).send(servicio);
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

    const response = {
      isDelete: true,
      msg: "Your activity was created successfully",
    };
    res.status(200).json(response);
  } catch (error) {
    const response = {
      isRegister: false,
      msg: "We have detected an error when registering",
      error: error.message, // Utiliza error.message para obtener el mensaje de error
    };
    res.status(400).send(response);
  }
});

router.put("/actualizar", async (req, res) => {
  const dataFull = { ...req.body };
  try {
    await updateService(dataFull);
    const response = {
      isUpdate: true,
      msg: "actualizacion exitosa"
    };
    res.status(200).json(response);
  } catch (error) {
    const response = {
      isRegister: false,
      msg: "No se actualizo",
      error: error.message, // Utiliza error.message para obtener el mensaje de error
    };
    res.status(400).send(response);
  }
});

module.exports = router;
