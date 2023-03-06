const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Empresa = require('../models/empresa');

const getEmpresas = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };
    const listaempresas = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
    ]);
    res.json({
        msg: 'get Api - Controlador Empresa',
        listaempresas
    });
}

const postEmpresa = async (req = request, res = response) => {

    //Desestructuración
    const { nombre, correo, password, tipo, sucursal } = req.body;
    const empresaGuardadoDB = new Empresa({ nombre, correo, password, tipo, sucursal});

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    empresaGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await empresaGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Empresa',
        empresaGuardadoDB
    });
}


const putEmpresa = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const id = req.empresa.id;
    const { _id, tipo,  estado, ...resto } = req.body;

    //Si la password existe o viene en el req.body, la encripta
    if ( resto.password ) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    //Editar al usuario por el id
    const empresaEditado = await Empresa.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar empresa',
        empresaEditado
    });
}

const deleteEmpresa = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const id = req.empresa.id;

    //Eliminar fisicamente de la DB
    //const empresaEliminado = await Empresa.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
     const empresaEliminado = await Empresa.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar empresa',
        empresaEliminado
    });
}

module.exports = {
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa
}

