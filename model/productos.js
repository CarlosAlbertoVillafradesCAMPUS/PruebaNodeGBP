import { myConexion } from "../db/connect.js";

const database = await myConexion()

export class productosModel{
    static postProductos(values){
        return new Promise((resolve,reject)=>{
            const query = "INSERT INTO productos(nombre, barcode, presentacion) VALUES (?,?,?)"
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

    static validateBarcode(barcode){
        return new Promise((resolve,reject)=>{
            const query = "SELECT * FROM productos WHERE barcode = ?"
            database.query(
                query,
                [barcode],
                (err,data)=>{
                    if(err) return resolve({status:400, message:"Erro al validar productos"})
                    return resolve({status:200, message:data})
                }
            )
        })
    }
}