const  servicios  = require("../models/sevicios");
const { v1 } = require("uuid");

const CrearServicio = async (dataBody) => {
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
        throw new error("servicio no resgistrado"+error);
    }
 
    
 

};
const MostrarServicio = async (dataBody)=>{
    const { estado, precio_adulto, precio_niño, hora_inicio, duracion, lugar, descripcion, galeria, salida_horarios } = dataBody;
    try {
   
        const Mostrar= await servicios.findAll({
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
        return Mostrar;

     } catch (error) {
        throw new Error ("busqueda no encontrada"+error)
       
     
     }

};

















module.exports = { CrearServicio,MostrarServicio};
