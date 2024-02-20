import { productosModel } from "../model/productos.js";
import { validationResult } from "express-validator";

export class productosController{
    static async postProductos(req,res){
        //validar si hubieron errores en el dto
        const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).send({status:400, message:errors.errors[0].msg})

        //Validar que el barcode sea unico
        const validateBardcode = await productosModel.validateBarcode(req.body.barcode)
        if(validateBardcode.message.length > 0) return res.status(validateBardcode.status).send({status:validateBardcode.status, message:"Error, La propiedad 'barcode' ya a sido registrada"})

        //Agregar productos
        const values = Object.values(req.body)
        const addProductos = await productosModel.postProductos(values)
        res.status(addProductos.status).send(addProductos)
    }
}