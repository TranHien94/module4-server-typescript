import purchaseModel from "../models/purchase.model";
import {Request, Response} from "express";


export default {
    createGuestReceipt: async function (req: Request, res: Response) {
        try {
            let newGuestReceipt = req.body.newGuestReceipt;
            let guestReceiptDetailList = req.body.guestReceiptDetailList;
            let modelRes = await purchaseModel.createGuestReceipt(newGuestReceipt, guestReceiptDetailList);

            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            console.log("err", err)
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    createUserReceipt: async function (req: Request, res: Response) {
        console.log("da vao controller")
        try {
            console.log("req.body", req.body)
            let newUserReceipt = req.body.newUserReceipt;
            let userReceiptDetailList = req.body.userReceiptDetailList;
            let userId = req.body.userId
            let modelRes = await purchaseModel.createUserReceipt(newUserReceipt, userReceiptDetailList, userId);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            console.log("err", err)
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findManyGuestReceipts: async function (req: Request, res: Response) {
        try {
            let maxItemPage = Number(req.query.maxItemPage);
            let skipItem = Number(req.query.skipItem);
            let modelRes = await purchaseModel.findManyGuestReceipts(maxItemPage, skipItem);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Cotroller error"
            })
        }
    },
    findById: async function (req: Request, res: Response) {
        try {
            let modelRes = await purchaseModel.findById(Number(req.params.orderId));
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Cotroller error"
            })
        }
    },
    findGuestReceipt: async function (req: Request, res: Response) {
        console.log("req", req.body)
        try {
            let modelRes = await purchaseModel.findGuestReceipt(String(req.body.guestEmail));
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    }
    ,
    findUserReceipt: async function (req: Request, res: Response) {
        console.log("req.body", req.body);

        try {
            let userId = req.body.userId
            let modelRes = await purchaseModel.findUserReceipt(userId);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    }
    ,
    update: async function (req: Request, res: Response) {
        try {
            let modelRes = await purchaseModel.update(Number(req.params.orderId), {
                state: req.body.state,

            }, true);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    }
    ,
    
}