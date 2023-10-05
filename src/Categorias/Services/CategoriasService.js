const categorias = require("../models/Categoria");

const getCategorias = async () => {
  try {
    const mostrar = await categorias.findAll();
    return mostrar;
  } catch (error) {
    throw new Error("busqueda no encontrada" + error);
  }
};



module.exports = {  getCategorias};
