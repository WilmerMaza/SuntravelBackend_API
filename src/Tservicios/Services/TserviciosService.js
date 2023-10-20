const atributos = require("../../Atributos/models/Atributos");
const atributosDescribe = require("../../Atributos/models/AtributosDescribe");
const TipoServicio = require("../models/TipoServicio");

const getTservicios = async () => {
  try {
    const mostrar = await TipoServicio.findAll({
      include: [
        {
          model: atributosDescribe,
          attributes: ["estado"],
          include: [{ model: atributos, attributes: ["name"] }],
        },
      ],
    });

    const groupedData = mostrar.reduce((result, current) => {
      // Busca si ya existe un elemento con el mismo "ID" en el resultado
      const existingItem = result.find((item) => item.ID === current.ID);

      if (existingItem) {
        // Si ya existe, agrega los datos relacionados a "AtributosDescribe"
        existingItem.AtributosDescribe.push(current.AtributosDescribe);
      } else {
        // Si no existe, crea un nuevo objeto con "ID" y "AtributosDescribe" como un arreglo
        result.push({
          ID: current.ID,
          codigo: current.codigo,
          name: current.name,
          describe: current.describe,
          createdAt: current.createdAt,
          updatedAt: current.updatedAt,
          AtributosDescribe: [current.AtributosDescribe],
        });
      }

      return result;
    }, []);

    return groupedData;
  } catch (error) {
    throw new Error("busqueda no encontrada" + error);
  }
};

module.exports = { getTservicios };
