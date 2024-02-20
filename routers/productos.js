import { Router } from "express";
import { productosController } from "../controller/productos.js";
import { validatePostProductos } from "../dto/productosDTO.js";

const appProductos = Router();

appProductos.post("/", validatePostProductos, productosController.postProductos)

export default appProductos;