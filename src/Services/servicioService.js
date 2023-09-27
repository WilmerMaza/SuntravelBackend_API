const servicio = require("../models/sevicios");
const servicios = require("../models/sevicios");
const { v1 } = require("uuid");

const deleteService = async ({ id }) => {

    try {
        const result = await servicios.destroy({ where: { ID: id } })
        return result

    } catch (error) {

    }
}

const createService = async (dataBody) => {

    const { estado, precio_adulto, precio_niño, hora_inicio, duracion, lugar, descripcion, galeria, salida_horarios } = dataBody;

    try {
        await servicios.create({
            ID: v1(),
            estado,
            precio_adulto,
            precio_niño,
            hora_inicio,
            duracion,
            lugar,
            descripcion,
            galeria,
            salida_horarios,
        });

    } catch (error) {
        throw new error("servicio no resgistrado" + error);
    }




};
const getServicice = async (dataBody) => {

    try {

        const mostrar = await servicios.findAll({

        });
        return mostrar;

    } catch (error) {
        throw new Error("busqueda no encontrada" + error)


    }

};


// const actualizarservicio= async(da)=>{

//     try {

//      const result=await servicios.update({
//           where: { ID: id },
//           data: {

//           }

//      })

//      return result

//     } catch (error) {

//     }
//   }

const updateService = async (dataBody) => {
    try {
        const rowsUpdated = await servicio.update(dataBody, {
            where: { ID: dataBody.id }
        });
        if (rowsUpdated[0] === 0) return 'No se actualizó ningún registro';
        else return " actualizado con éxito";

    } catch (error) {
        console.error("Error al actualizar ", error);
        throw error;
    }
}














module.exports = { createService, getServicice, updateService, deleteService };
