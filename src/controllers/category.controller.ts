import { Request, Response} from "express";
import categoryModel from '../models/category.model'

export default {
    create: async function(req: Request, res: Response){
        let newCategory = {
            ...req.body
        }
        try {
            let modelRes = await categoryModel.create(newCategory)
            return res.status(modelRes.status ? 200 : 213).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "Controller error"
            })
        }
    },
    findMany: async function(req: Request, res: Response) {
        try {
            let modelRes = await categoryModel.findMany()
            return res.status(modelRes.status ? 200: 213).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "Controller error"
            })
        }
    }
}