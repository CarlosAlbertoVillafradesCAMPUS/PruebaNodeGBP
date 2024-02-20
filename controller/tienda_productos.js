import { tiendaProductosModel } from "../model/tienda_productos.js";
import { validationResult } from "express-validator";

export class tiendaProductosController{
    static async postTiendaProductos(req,res){
        //validar si hubieron errores en el dto
        const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).send({status:400, message:errors.errors[0].msg})

            const {id_producto, id_tienda} = req.body

        //Validar que el producto ya este regsitrado
        const validateProducto = await tiendaProductosModel.validateProducto(id_producto)
        if(validateProducto.status != 200) return res.status(validateProducto.status).send(validateProducto)
        if(validateProducto.message.length == 0) return res.status(validateProducto.status).send({status:validateProducto.status, message:"Error, no existe ningun producto registrado con ese id"})

        //validar que la tienda ya este registrada
        const validateTiendaProducto = await tiendaProductosModel.validateTienda(id_tienda)
        if(validateTiendaProducto.status != 200) return res.status(validateTiendaProducto.status).send(validateTiendaProducto)
        if(validateTiendaProducto.message.length == 0) return res.status(validateTiendaProducto.status).send({status:validateTiendaProducto.status, message:"Error, no existe ninguna tienda registrada con ese id"})

        //validar que no exita una relacion de esos mismo productos
        const validateRelacion = await tiendaProductosModel.validateRelacion({id_tienda:id_tienda, id_producto:id_producto})
        if(validateRelacion.status != 200) return res.status(validateRelacion.status).send(validateRelacion)
        if(validateRelacion.message.length > 0) return res.status(validateRelacion.status).send({status:validateRelacion.status, message:"Error, ya existe una relacion entre la tienda y el producto"})

        //asociar producto con tienda
        const values = Object.values(req.body)
        const addProductos = await tiendaProductosModel.postTiendaProductos(values)
        res.status(addProductos.status).send(addProductos)
    }
}