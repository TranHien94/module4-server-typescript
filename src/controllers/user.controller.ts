import { Request, Response } from "express";
import userModel, { NewUser } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from '../services/jwt';

export default {
    register: async function (req: Request, res: Response) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const newUser: NewUser = {
                ...req.body,
                createAt: new Date(Date.now()),
                updateAt: new Date(Date.now())
            };
            const modelRes = await userModel.register(newUser);
            if (modelRes && modelRes.status) {
                return res.status(200).json(modelRes);
            } else {
                return res.status(400).json(modelRes);
            }
        } catch (err) {
            return res.status(500).json({
                message: "Cannot register from server"
            });
        }
    },

    login: async function (req: Request, res: Response) {
        try {
            const modelRes = await userModel.inforByUserName(req.body.userName);
            if (modelRes && modelRes.status) {
                const passwordMatch = await bcrypt.compare(req.body.password, modelRes.data?.password || '');
                if (passwordMatch) {
                    const token = jwt.createToken(modelRes.data, "1d");
                    return res.status(200).json({
                        message: "Login successfully",
                        token
                    });
                } else {
                    return res.status(401).json({
                        message: "Incorrect password"
                    });
                }
            } else {
                return res.status(404).json({
                    message: "User does not exist"
                });
            }
        } catch (err) {
            return res.status(500).json({
                message: "Controller error"
            });
        }
    },

    findAllUsers: async function (req: Request, res: Response) {
        try {
            const modelRes = await userModel.findAllUsers();
            if (modelRes && modelRes.status) {
                return res.status(200).json(modelRes);
            } else {
                return res.status(404).json(modelRes);
            }
        } catch (err) {
            return res.status(500).json({
                message: "Cannot get all users!"
            });
        }
    },

    findById: async function (req: Request, res: Response) {
        try {
            console.log("req.body", req.body);
            const userById = await userModel.findById(1);
            if (userById && userById.status) {
                return res.status(200).json(userById);
            } else {
                return res.status(404).json(userById);
            }
        } catch (err) {
            return res.status(500).json({
                message: "Cannot get user!"
            });
        }
    }
};
