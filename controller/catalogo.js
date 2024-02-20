import { catalogoModel } from "../model/catalogo.js";
import { validationResult } from "express-validator";

export class catalogoController{
    static async getCatalogo(req,res){
        const {id_tienda} = req.body
        //Validar que el barcode sea unico
        const obtenerCatalogo = await catalogoModel.getCatalogo(id_tienda)

        res.status(obtenerCatalogo.status).send(obtenerCatalogo)
    }
}