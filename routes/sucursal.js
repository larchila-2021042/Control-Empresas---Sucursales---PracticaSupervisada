const { Router } = require('express');
const { check } = require('express-validator');

//Controllers
const { getSucursalPorID, postSucursal, putSucursal, deleteSucursal, getSucursales } = require('../controllers/sucursal');
const { existeCursoPorId, esRoleValido, existeEmpresaPorId } = require('../helpers/db-validators');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//Manejo de rutas
router.get('/', getSucursales);


router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCursoPorId),
    validarCampos
], getSucursalPorID);

//Crear Curso
router.post('/agregar', [
    validarJWT,
    //esAdminRole,
    //tieneRole('ROLE_MAESTRO'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('municipio', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'El nombre es obligatorio').not().isEmpty(),
    check('empresa').custom(existeEmpresaPorId),
    validarCampos
], postSucursal);

// Acturalizar Curso - privado cualquier persona con un token valido
router.put('/editar', [
    validarJWT,
    //esAdminRole,
    //tieneRole('ROLE_MAESTRO'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], putSucursal);

// Borrar una categoria - privado - solo el admin ouede eliminar categorias
router.delete('/eliminar', [
    validarJWT,
    //esAdminRole,
    //borrarDatos,
    //tieneRole('ROLE_MAESTRO'),
    validarCampos
], deleteSucursal);


module.exports = router;