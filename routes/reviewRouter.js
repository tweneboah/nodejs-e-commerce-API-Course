import exppress from "express";
import { createReviewCtrl } from "../controllers/reviewsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const reviewRouter = exppress.Router();

reviewRouter.post("/:productID", isLoggedIn, createReviewCtrl);

export default reviewRouter;
