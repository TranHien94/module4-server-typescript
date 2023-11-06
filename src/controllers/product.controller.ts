import productModel from "../models/product.model";
import { Request, Response } from "express";
import { uploadFileToStorage } from '../firebase';
import fs from 'fs';
export default {
    create: async function (req: Request, res: Response) {
        let data = JSON.parse(req.body.product);
        data.price = Number(data.price)
        let newProduct = {
            ...data,
            avatar: "abc.jpg"
        }

        if (req.files) {
            let avatarUrl = await uploadFileToStorage((req.files as any)[0], "images", fs.readFileSync((req.files as any)[0].path))
            fs.unlink((req.files as any)[0].path, (err) => {

            })
            newProduct.avatar = avatarUrl
        }
        try {
            let modelRes = await productModel.create(newProduct);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Controller error"
            })
        }
    },
    /* phan trang */
    findAll: async function (req: Request, res: Response) {
        try {
            let maxItemPage = Number(req.query.maxItemPage);
            let skipItem = Number(req.query.skipItem);
            let modelRes = await productModel.findAll(maxItemPage, skipItem)

            return res.status(modelRes.status ? 200 : 221).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định findMany!"
            })
        }
    },
    findByCategory: async function (req: Request, res: Response) {
        try {
            let modelRes = await productModel.findByCategory(+req.params.categoryId);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Controller error"
            })
        }
    },
    findById: async function (req: Request, res: Response) {
        try {
            let modelRes = await productModel.findById(+req.params.id);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Controller error"
            })
        }
    },
    update: async (req: Request, res: Response) => {

        req.body = JSON.parse(req.body.product_infor);

        // xử lý avatar
        if (req.file != undefined) {
            let url = await uploadFileToStorage(req.file, "md4", fs.readFileSync(req.file.path));
            fs.unlink(req.file.path, (err) => { })
            req.body.avatar = url;
        }

        try {
            /* Gọi model xử lý database */
            let result = await productModel.update(Number(req.params.productId), req.body);
            return res.status(result.status ? 200 : 214).json(result)
            // console.log("result", result)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    },
    searchByName: async function (req: Request, res: Response) {
        try {
            /* Find by name or des */
            if (typeof req.query.search === 'string') {
                let modelRes = await productModel.searchByName(req.query.search)
                return res.status(modelRes.status ? 200 : 221).json(modelRes)
            }
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    }

}