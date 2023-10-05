const servicios = require("../models/sevicios");
const { v1 } = require("uuid");

const deleteService = async ({ id }) => {
  try {
    const result = await servicios.destroy({ where: { ID: id } });
    return result;
  } catch (error) {
    throw new error("servicio no eliminado" + error);
  }
};

const createService = async (dataBody) => {
  const {
    name,
    codigo,
    tipoServicio,
    estado,
    categoria,
    destino,
    precio_adulto,
    precio_nino,
    hora_inicio,
    duracion,
    lugar,
    descripcion,
    galeria,
    salida_horarios,
    recomendaciones
  } = dataBody;

  try {
    await servicios.create({
      ID: v1(),
      name,
      codigo,
    //   tipoServicio:"",
      estado,
    //   categoria:"",
      destino,
      precio_adulto,
      precio_nino,
      hora_inicio,
      duracion,
      lugar,
      descripcion,
      galeria,
      salida_horarios,
      recomendaciones
    });
  } catch (error) {
    throw new error("servicio no resgistrado" + error);
  }
};
const getServicice = async (dataBody) => {
  try {
    const mostrar = await servicios.findAll();
    return mostrar;
  } catch (error) {
    throw new Error("busqueda no encontrada" + error);
  }
};

const updateService = async (dataBody) => {
  try {
    const rowsUpdated = await servicios.update(dataBody, {
      where: { ID: dataBody.id },
    });
    if (rowsUpdated[0] === 0) return "No se actualizó ningún registro";
    else return " actualizado con éxito";
  } catch (error) {
    console.error("Error al actualizar ", error);
    throw error;
  }
};

module.exports = { createService, getServicice, updateService, deleteService };
