import { Router } from "express";
import { catalogoController } from "../controller/catalogo.js";

const appCatalogo = Router();

appCatalogo.get("/:id_tienda", catalogoController.getCatalogo)

export default appCatalogo;