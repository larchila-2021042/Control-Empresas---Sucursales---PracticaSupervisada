const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']

    },
    tipo: {
        type: String,
        required: true,
        default: ['anonima']
    },
    estado: {
        type: Boolean,
        default: true
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Sucursal'
    }
});


module.exports = model('Empresa', EmpresaSchema);