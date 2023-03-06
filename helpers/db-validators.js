const Sucursal = require('../models/sucursal');
const Empresa = require('../models/empresa');
const Tipo = require('../models/tipo');

//Este archivo maneja validaciones personalizadas

const esTipoValido = async (tipo = '') => {

    const existeTipo = await Tipo.findOne({ tipo });

    if (!existeTipo) {
        throw new Error(`El tipo ${tipo} no está registrado en la DB`);
    }

}


const emailExiste = async (correo = '') => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Empresa.findOne({ correo });

    //Si existe (es true) lanzamos excepción
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya existe y esta registrado en la DB`);
    }

}


const existeEmpresaPorId = async (id) => {

    //Verificar si el ID existe
    const existeEmpresa = await Empresa.findById(id);

    if (!existeEmpresa) {
        throw new Error(`El id ${id} no existe en la DB`);
    }

}

const existeSucursalPorId = async (id) => {

    //Verificar si el ID existe
    const existeSucursal = await Sucursal.findById(id);

    if (!existeSucursal) {
        throw new Error(`El id ${id} no existe en la DB`);
    }

}

const existeAsignacionPorId = async (id) => {

    //Verificar si el ID existe
    const existeAsignacion = await Asignacion.findById(id);

    if (!existeAsignacion) {
        throw new Error(`El id ${id} no existe en la DB`);
    }

}


module.exports = {
    esTipoValido,
    emailExiste,
    existeEmpresaPorId,
    existeSucursalPorId,
    existeAsignacionPorId
}