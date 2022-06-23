const { Schema, model } = require("mongoose");


const Usuarioschema = Schema({            
    email: {
        type: String,
        required: [true, 'El item es obligatorio..']
    },
    password: {
        type: String,
        required: [true, 'El type es obligatorio..']
    }
});

Usuarioschema.methods.toJSON = function(){
    /** Sirve para eliminar los campos del objeto */
    const { __v, _id, ...food } = this.toObject();
    food.uid = _id;
    
    return food;
}


module.exports = model( 'Usuario', Usuarioschema)