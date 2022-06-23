const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJwt } = require('../middlewares');
const { existeInfoId } = require("../helpers/db-validators");

const { 
    foodsGet, 
    foodsPost, 
    foodsPut, 
    foodsDelete
} = require("../controllers/foods");

const router = Router();

const foodsPath = "/";

router.get(foodsPath,  foodsGet );

/** El segundo parametro es un middleware que va a validar lo que necesitemos */
router.post(foodsPath, [ 
    check('items', 'El nombre es obligatorio').not().isEmpty(),
    check('items.*.item', 'El nombre es obligatorio').not().isEmpty(),
    check('items.*.type', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,foodsPost );

router.put(foodsPath+":id",  [
    /*validarJwt,*/
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom( existeInfoId ),    
    validarCampos    
],foodsPut );

router.delete(foodsPath+":id",  [
    /*validarJwt,*/
    check('id', 'No es un Id valido').isMongoId(),    
    validarCampos
], foodsDelete );


module.exports = router;