const { request, response } = require('express');
const Sucursal = require('../models/sucursal');

const getSucursales = async (req = request, res = response) => {
    //condiciones del get
    const query = { estado: true };

    const listaSucursal = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query).populate('empresa', 'nombre')
    ]);
    res.json({
        msg: 'get Api - Controlador Sucursal',
        listaSucursal
    });

}

const getSucursalPorID = async (req = request, res = response) => {
    const { id } = req.params;
    const sucursalById = await Sucursal.findById(id).populate('empresa', 'nombre');

    res.status(201).json(sucursalById);
}

const postSucursal = async (req = request, res = response) => {
    const { municipio, direccion } = req.body;
    const nombre = req.body.nombre.toUpperCase();
    const sucursalDB = await Sucursal.findOne({ nombre })

    //Verficar si exisye la categoria
    if (sucursalDB) {
        return res.status(400).json({
            msg: `La sucursal ${sucursalDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar

    const data = {
        nombre,
        municipio,
        direccion,
        empresa: req.empresa._id
    }

    const sucursal = new Sucursal(data);

    //Guardar en DB
    await sucursal.save();
    res.status(201).json(sucursal);
}

const putSucursal = async (req = request, res = response) => {
    const _id = req.empresa.sucursal;
    const { estado, empresa, ...resto } = req.body;
    resto.nombre = resto.nombre.toUpperCase();
    resto.empresa = req.empresa._id;

    //Editar o actualizar el curso
    const sucursal = await Sucursal.findByIdAndUpdate(_id, resto, { new: true });
    res.status(201).json(sucursal);
}

const deleteSucursal = async (req = request, res = response) => {

    const _id = req.empresa.sucursal;

    //Eliminar fisicamente de la DB
    //const sucursal = await Sucursal.findByIdAndDelete(_id);

    //Eliminar cambiando el estado a false
    const sucursal = await Sucursal.findByIdAndUpdate(_id, { estado: false }, { new: true });

    res.json({
        msg: 'DELETE',
        sucursal
    })
}

module.exports = {
    getSucursales,
    getSucursalPorID,
    postSucursal,
    putSucursal,
    deleteSucursal
} 