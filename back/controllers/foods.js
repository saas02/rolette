const { response, request } = require('express');

const Food = require("../models/foods");
const { _clearElements } = require('../helpers/handlebars-functions');

const foodsGet = async (req = request, res = response)  => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };
    
    const [ total, foods ] = await Promise.all([
        /** Se coloca el await para esperar la salida de las dos query */
        Food.countDocuments(query),
        Food.find(query)
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ]);    

    res.json({
        msg:" get API Controller",
        total,
        foods        
    })
}

const foodsPost = async (req, res = response)  => {    
    
    const { ...data } = req.body;
    
    const food = new Food( data );        

    await food.save();

    res.json({
        food
    })
}

const foodsPut = async (req, res = response)  => {
    
    const { id } = req.params;
    let { _id, ...data } = req.body;

    const dataFood = await Food.findById( id )
    
    data.items = _clearElements(data, dataFood);
    
    const food = await Food.findByIdAndUpdate( id, data )

    res.json({
        msg: " put API Controller....",
        data
    })
}

const foodsDelete = async (req, res = response)  => {

    const { id } = req.params;    

    /** para eliminar */
    //const usuario = await Usuario.findByIdAndDelete( id );

    /** para actualizar el estado */
    const usuario = await Usuario.findByIdAndUpdate( id, { status: false } );

    const usuarioAutenticado = req.usuario;


    res.json({
        msg:" delete API Controller",
        usuario,
        usuarioAutenticado
    })
}


module.exports = {
    foodsGet,
    foodsPost,
    foodsPut,
    foodsDelete
}