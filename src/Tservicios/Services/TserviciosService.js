const TipoServicio = require("../models/TipoServicio");

const getTservicios = async () => {
  try {
    const mostrar = await TipoServicio.findAll();
    return mostrar;
  } catch (error) {
    throw new Error("busqueda no encontrada" + error);
  }
};



module.exports = {  getTservicios};
