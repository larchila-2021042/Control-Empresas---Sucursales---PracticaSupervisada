//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/empresa');
const { emailExiste, existeEmpresaPorId, esTipoValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneTipo } = require('../middlewares/validar-rol');

const router = Router();

router.get('/mostrar', getEmpresas);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('tipo').custom(esTipoValido),
    validarCampos,
], postEmpresa);

router.put('/editar', [
    validarJWT,
    validarCampos
], putEmpresa);

router.delete('/eliminar', [
    validarJWT,
    validarCampos
], deleteEmpresa);


module.exports = router;