import express from "express"
import appProductos from "./routers/productos.js";
import appCatalogo from "./routers/catalogo.js";
import appTiendaProductos from "./routers/tienda_productos.js";
import { validateConexion } from "./middleware/validateConexion.js";
import { limitRequest } from "./middleware/limit_request.js";
import "dotenv/config"

const appExpress = express();
appExpress.use(express.json())
appExpress.use(limitRequest())
appExpress.use(validateConexion)

appExpress.use("/api/productos", appProductos)
appExpress.use("/api/tienda_productos", appTiendaProductos)
appExpress.use("/api/catalogo", appCatalogo)


const my_server = JSON.parse(process.env.MY_SERVER)
appExpress.listen(my_server, ()=>console.log(`servdior iniciado:http://${my_server.host}:${my_server.port}`))