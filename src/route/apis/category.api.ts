import express from "express";
import categoryController from "../../controllers/category.controller";

const router = express.Router()

router.post('/', categoryController.create)
router.get('/', categoryController.findMany)

export default router