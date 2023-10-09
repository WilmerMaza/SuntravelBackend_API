const { Destino, categoria, Tservicio } = require("../../models/Asociaciones");
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
    recomendaciones,
  } = dataBody;

  try {
    await servicios.create({
      ID: v1(),
      name,
      codigo,
      estado,
      precio_adulto,
      precio_nino,
      hora_inicio,
      duracion,
      lugar,
      descripcion,
      galeria,
      salida_horarios,
      recomendaciones,
      destinoId: destino,
      tservicioId: tipoServicio,
      categoriaId: categoria,
    });
  } catch (error) {
    throw new error("servicio no resgistrado" + error);
  }
};
const getServicice = async () => {
  try {
    const mostrar = await servicios.findAll({
      include: [
        { model: Destino, attributes: ["ID", "codigo", "name"] },
        { model: Tservicio, attributes: ["ID", "codigo", "name"] },
        { model: categoria, attributes: ["ID", "codigo", "name"] },
      ],
    });
    return mostrar;
  } catch (error) {
    throw new Error("busqueda no encontrada" + error);
  }
};

const getFindServicice = async (dataFull) => {
  const { servicioID } = dataFull;
  try {
    const mostrar = await servicios.findByPk(servicioID);
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

module.exports = {
  createService,
  getServicice,
  updateService,
  deleteService,
  getFindServicice,
};
