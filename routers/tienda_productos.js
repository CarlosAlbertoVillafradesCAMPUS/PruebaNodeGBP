import { Router } from "express";
import { tiendaProductosController } from "../controller/tienda_productos.js";
import { validatePostTiendaProductos } from "../dto/tiendaProductosDTO.js";

const appTiendaProductos = Router();

appTiendaProductos.post("/", validatePostTiendaProductos, tiendaProductosController.postTiendaProductos)

export default appTiendaProductos;