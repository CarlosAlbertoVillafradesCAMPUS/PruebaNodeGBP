import { myConexion } from "../db/connect.js";

const database = await myConexion()

export class tiendaProductosModel{
    static postTiendaProductos(values){
        return new Promise((resolve,reject)=>{
            const query = "INSERT INTO tiendas_productos(id_producto, id_tienda, valor, compra_maxima) VALUES (?,?,?,?)"
            database.query(
                query,
                [...values],
                (err,data)=>{
                    if(err) return resolve({status:400, message:err.message})

                    return resolve({status:200, message:"Agregado con exito"})
                }
            )
        })
    }

    static validateProducto(id){
        return new Promise((resolve,reject)=>{
            const query = "SELECT * FROM productos WHERE id = ?"
            database.query(
                query,
                [id],
                (err,data)=>{
                    if(err) return resolve({status:400, message:"Erro al validar productos"})
                    return resolve({status:200, message:data})
                }
            )
        })
    }

    static validateTienda(id){
        return new Promise((resolve,reject)=>{
            const query = "SELECT * FROM tiendas WHERE id = ?"
            database.query(
                query,
                [id],
                (err,data)=>{
                    if(err) return resolve({status:400, message:"Erro al validar tienda_productos"})
                    return resolve({status:200, message:data})
                }
            )
        })
    }

    static validateRelacion(info){
        return new Promise((resolve,reject)=>{
            const query = "SELECT * FROM tiendas_productos WHERE id_producto = ? AND id_tienda = ?"
            database.query(
                query,
                [info.id_producto, info.id_tienda],
                (err,data)=>{
                    if(err) return resolve({status:400, message:"Erro al validar tienda_productos"})
                    return resolve({status:200, message:data})
                }
            )
        })
    }
}