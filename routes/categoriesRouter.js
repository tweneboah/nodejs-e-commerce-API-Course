import exppress from "express";
import catetgoryFileUpload from "../config/categoryUpload.js";
import {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} from "../controllers/categoriesCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoriesRouter = exppress.Router();

categoriesRouter.post(
  "/",
  isLoggedIn,
  catetgoryFileUpload.single("file"),
  createCategoryCtrl
);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.delete("/:id", deleteCategoryCtrl);
categoriesRouter.put("/:id", updateCategoryCtrl);
export default categoriesRouter;
