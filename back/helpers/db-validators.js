
const Food = require("../models/foods");

const existeEmail = async (correo = '') => {

    const existeEmail = await Usuario.findOne( { correo } )
    console.log(correo, existeEmail);
    if( existeEmail ){
        throw new Error(`El correo ${ correo } ya esta registrado`)        
    }
}

const existeUsuarioId = async (id = '') => {

    const existeUsuario = await Usuario.findById( id )

    if( !existeUsuario ){
        throw new Error(`El Usuario con id ${ id } no existe`)        
    }
}

const existeInfoId = async (id = '') => {

    const dataFood = await Food.findById( id )

    if( !dataFood ){
        throw new Error(`La informacion con id ${ id } no existe`)        
    }
}

module.exports = {    
    existeEmail,
    existeUsuarioId,
    existeInfoId
}