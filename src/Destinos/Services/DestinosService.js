const Destinos = require("../models/Destinos");

const getDestinos = async () => {
  try {
    const mostrar = await Destinos.findAll();
    return mostrar;
  } catch (error) {
    throw new Error("busqueda no encontrada" + error);
  }
};



module.exports = {  getDestinos};
