import { myConexion } from "../db/connect.js";

const database = await myConexion()

export class catalogoModel{
    static getCatalogo(id){
        return new Promise((resolve,reject)=>{
            const query = `SELECT tp.id_producto, tp.id_tienda, p.nombre, p.presentacion, p.barcode, tp.valor, CASE WHEN tpro.fin < NOW() THEN JSON_OBJECT("id_promocion", pro.id, "nombre", pro.nombre, "porcentaje", pro.porcentaje, "valor_promocion", (tp.valor - (tp.valor * pro.porcentaje / 100))) ELSE null END AS promocion FROM tiendas_productos tp INNER JOIN productos p ON tp.id_producto = p.id INNER JOIN tiendas t ON tp.id_tienda = t.id INNER JOIN tiendas_promociones tpro ON t.id = tpro.id_tienda INNER JOIN promociones pro ON tpro.id_promocion = pro.id WHERE tp.id_tienda = ?`
            database.query(
                query,
                [id],
                (err,data)=>{
                    if(err) return resolve({status:400, message:err.message})

                    return resolve({status:200, message:data})
                }
            )
        })
    }

}