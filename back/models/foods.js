const { Schema, model } = require("mongoose");


const Foodschema = Schema({       
    items:[
        {
            item: {
                type: String,
                required: [true, 'El item es obligatorio..']
            },
            type: {
                type: String,
                required: [true, 'El type es obligatorio..']
            },
        }
    ]
});

Foodschema.methods.toJSON = function(){
    /** Sirve para eliminar los campos del objeto */
    const { __v, _id, ...food } = this.toObject();
    food.uid = _id;
    
    return food;
}


module.exports = model( 'Foods', Foodschema)