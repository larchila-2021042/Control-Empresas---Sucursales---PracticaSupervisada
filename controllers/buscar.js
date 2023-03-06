const { request, response } = require('express');
const Sucursal = require('../models/sucursal');
const { ObjectId } = require('mongoose').Types;

const Empresa = require('../models/empresa');

const coleccionesPermitidas = [
    'empresas',
    'sucursales'
];


const buscarEmpresas = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );  //TRUE

    if ( esMongoID ) {
        const empresa = await Empresa.findById(termino);
        return res.json({
            //results: [ usuario ]
            results: ( empresa ) ? [ empresa ] : [] 
            //Preugntar si el usuario existe, si no existe regresa un array vacio
        });
    } 

    //Expresiones regulares, buscar sin impotar mayusculas y minusculas (DIFIERE DE EL)
    const regex = new RegExp( termino, 'i');

    const usuarios = await Usuario.find({
        $or: [ { nombre: regex }, { correo: regex } ],
        $and: [ { estado: true } ]
    });

    res.json({
        results: empresas
    })

}

const buscarSucursales = async( termino = '', res = response) => {
    const esMongoID = ObjectId.isValid( termino );  //TRUE
    if ( esMongoID ) {
        const sucursal = await Sucursal.findById(termino);
        return res.json({
            results: ( sucursal ) ? [ sucursal ] : [] 
            //Preguntar si el producto existe, si no existe regresa un array vacio
        });
    } 
    //Expresiones regulares, buscar sin impotar mayusculas y minusculas (DIFIERE DE EL)
    const regex = new RegExp( termino, 'i');
    const sucursales = await Sucursal.find({
        $or: [ { nombre: regex }],
        $and: [ { estado: true } ]
    });
    res.json({
        results: sucursales
    })
}


const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `La colección: ${ coleccion } no existe en la DB
                  Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }


    switch (coleccion) {
        case 'empresas':
            buscarEmpresas(termino, res);
        break;
        case 'sucursales':
            buscarSucursales(termino,res);
        break;
        default:
            res.status(500).json({
                msg: 'Ups, Ocurrio un error en la busqueda...'
            });
        break;
    }

}


module.exports = {
    buscar
}