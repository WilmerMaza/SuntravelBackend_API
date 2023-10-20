const { Destino, categoria, Tservicio } = require("../../models/Asociaciones");
const servicios = require("../models/sevicios");
const { v1 } = require("uuid");
const fs = require("fs");
const path = require("path");
const atributosDescribe = require("../../Atributos/models/AtributosDescribe");
const atributos = require("../../Atributos/models/Atributos");

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
    salida_horario,
    recomendaciones,
    informacion_Adicional,
    terminos_condiciones,
    incluye,
    no_incluye,
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
      salida_horario,
      recomendaciones,
      informacion_Adicional,
      terminos_condiciones,
      incluye,
      no_incluye,
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

const getFindService = async (dataFull) => {
  const { tservicios } = dataFull;

  const servicio = await getFindTservice(tservicios);
  const categorianame = await getFindCategoria(dataFull.categoria);
  try {
    const mostrar = await servicios.findAll({
      include: [
        { model: Destino, attributes: ["name"] },
        { model: Tservicio, attributes: ["name"] },
        { model: categoria, attributes: ["name"] },
      ],
      where: { tservicioId: servicio.ID, categoriaId: categorianame.ID },
    });
    return mostrar;
  } catch (error) {
    throw new Error("busqueda no encontrada" + error);
  }
};

const getFindServicesID = async (dataFull) => {
  const { servicioID } = dataFull;

  try {
    const mostrar = await servicios.findAll({
      include: [
        { model: Destino, attributes: ["name"] },
        {
          model: Tservicio,
          attributes: ["name"],
          include: [
            {
              model: atributosDescribe,
              attributes: ["estado"],
              include: [{ model: atributos, attributes: ["name"] }],
            },
          ],
        },
        { model: categoria, attributes: ["name"] },
      ],
      where: { id: servicioID },
    });

    const groupedData = mostrar.reduce((result, current) => {
      // Busca si ya existe un elemento con el mismo "ID" en el resultado
      const existingItem = result.find((item) => item.ID === current.ID);

      if (existingItem) {
        // Si ya existe, agrega los datos relacionados a "AtributosDescribe"
        existingItem.Tservicio.AtributosDescribe.push(
          current.Tservicio.AtributosDescribe
        );
      } else {
        // Si no existe, crea un nuevo objeto con "ID" y "AtributosDescribe" como un arreglo
        result.push({
          ID: current.ID,
          codigo: current.codigo,
          name: current.name,
          describe: current.describe,
          estado: current.estado,
          precio_adulto: current.precio_adulto,
          precio_nino: current.precio_nino,
          hora_inicio: current.hora_inicio,
          duracion: current.duracion,
          lugar: current.lugar,
          descripcion: current.descripcion,
          galeria: current.galeria,
          salida_horario: current.salida_horario,
          recomendaciones: current.recomendaciones,
          informacion_Adicional: current.informacion_Adicional,
          terminos_condiciones: current.terminos_condiciones,
          incluye: current.incluye,
          no_incluye: current.no_incluye,
          destinoId: current.destinoId,
          tservicioId: current.tservicioId,
          categoriaId: current.categoriaId,
          Destino: current.Destino,
          Tservicio: {
            name: current.Tservicio.name,
            AtributosDescribe: [current.Tservicio.AtributosDescribe],
          },
          Categorium: current.Categorium,
        });
      }

      return result;
    }, []);

    return groupedData[0];
  } catch (error) {
    throw new Error("busqueda no encontrada" + error);
  }
};

const getFindTservice = async (tservices) => {
  const tservicios = Tservicio.findOne({ where: { name: tservices } });
  return tservicios;
};

const getFindCategoria = async (categoriaName) => {
  const category = categoria.findOne({ where: { name: categoriaName } });
  return category;
};

const updateService = async (dataBody) => {
  try {
    const rowsUpdated = await servicios.update(
      {
        ...dataBody,
        destinoId: dataBody.destino,
        tservicioId: dataBody.tipoServicio,
        categoriaId: dataBody.categoria,
      },
      {
        where: { ID: dataBody.id },
      }
    );
    if (rowsUpdated[0] === 0) return "No se actualizó ningún registro";
    else {
      const { galeriaDelete } = dataBody;
      if (galeriaDelete) {
        const imgDelete = galeriaDelete.split(",");
        imgDelete.forEach((element) => {
          const imagePath = path.join("src/uploads", element);
          fs.unlinkSync(imagePath);
        });
      }

      return " actualizado con éxito";
    }
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
  getFindService,
  getFindServicesID,
};
