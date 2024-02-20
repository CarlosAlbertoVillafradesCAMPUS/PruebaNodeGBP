import mysql from "mysql2"
import "dotenv/config"

export async function myConexion(){
    try {
        let conexion = undefined;
        const my_conexion = JSON.parse(process.env.MY_CONEXION)
        conexion = await mysql.createPool(my_conexion)
        return conexion
    } catch (error) {
        return {status:500, message:"Error al conectarse con la DB"}
    }
}