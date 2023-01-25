import exppress from "express";
import upload from "../config/fileUpload.js";
import {
  createProductCtrl,
  getProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} from "../controllers/productsCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productsRouter = exppress.Router();

productsRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.array("files"),
  createProductCtrl
);

productsRouter.get("/", getProductsCtrl);
productsRouter.get("/:id", getProductCtrl);
productsRouter.put("/:id", isLoggedIn, isAdmin, updateProductCtrl);
productsRouter.delete("/:id/delete", isLoggedIn, isAdmin, deleteProductCtrl);
export default productsRouter;
