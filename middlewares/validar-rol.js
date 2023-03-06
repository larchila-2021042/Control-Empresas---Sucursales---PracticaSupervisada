const { request, response } = require('express');

// Verificar si es admin
const esEmpresaTipo = (req = request, res = response, next) => {
    if (!req.empresa) {
        return res.status(500).json({
            msg: 'Se requiere verificar el tipo sin validar el token proiemrp'
        });
    }

    // Verificar que el rol sea ADMIN_ROLE
    const { rol, nombre } = req.usuario;

    if (rol !== 'ROLE_MAESTRO') {
        return res.status(500).json({
            msg: `${nombre} no es maestro - No tiene acceso a esta funcion`
        });
    }
    next();
}


//Operador rest u operador spread 
const tieneTipo = (...tipos) => {
    return (req = request, res = response, next) => {
        
        const { ...body } = req.body;
        if (!tipos.includes(req.empresa.tipo)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos tipos: ${tipos}`
            })
        }
        next();
    }
}


module.exports = {
    tieneTipo,
    esEmpresaTipo
}