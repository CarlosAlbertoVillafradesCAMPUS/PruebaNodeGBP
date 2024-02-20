import { myConexion } from "../db/connect.js";

const database = await myConexion();
export const validateConexion = (req,res,next) =>{
    if(database.status && database.status == 500) return res.status(database.status).send(database)
    next()
}