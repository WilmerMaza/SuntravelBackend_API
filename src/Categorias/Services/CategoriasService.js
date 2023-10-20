const { Tservicio } = require("../../models/Asociaciones");
const categorias = require("../models/Categoria");

const getCategorias = async () => {
  try {
    const mostrar = await categorias.findAll();
    return mostrar;
  } catch (error) {
    throw new Error("busqueda no encontrada" + error);
  }
};

const getCategoriasPK = async () => {
  try {
    const mostrar = await Tservicio.findAll({
      include: [
        {
          model: categorias,
        },
      ],
    });

    const categoriasAgrupadas = {};

    // Recorremos el arreglo original de datos
    mostrar.forEach((item) => {
      const { name, Categorium } = item;
      const categoriaServicio = Categorium.name; // Nombre de la categoría de servicio

      // Si la categoría aún no existe en el objeto, la creamos con un arreglo vacío
      if (!categoriasAgrupadas[name]) {
        categoriasAgrupadas[name] = [];
      }

      // Agregamos el elemento actual al arreglo de la categoría
      categoriasAgrupadas[name].push(categoriaServicio);
    });
    return categoriasAgrupadas;
  } catch (error) {
    throw new Error("busqueda no encontrada" + error);
  }
};

module.exports = { getCategorias, getCategoriasPK };
