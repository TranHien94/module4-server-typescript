
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()


export interface NewUser {
    email: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: string;
    createAt: Date,
    updateAt?: Date,
}

export default {
    register: async function (newUser: NewUser) {
        try {
            let user = await prisma.users.create({
                data: newUser
            })
            return {
                status: true,
                data: user,
                message: "register successfully"
            }

        } catch (err) {
            console.log("error", err)
        }
    },
    inforByUserName: async  function (userName: string) {
        try {
            let user = await  prisma.users.findUnique({
                where: {
                    userName
                }
            })
            if(!user) {
                return {
                    status: false,
                    message: "Ten dang nhap khong ton tai"
                }
            } 
            return {
                status: true,
                data: user,
                message: "Lay thong tin thanh cong"
            }
        } catch(err){
            let message: string = 'modelErr'
            return {
                status: false,
                data: null,
                message
            }
        }
    },
    findAllUsers: async function () {
        try {
            let users = await prisma.users.findMany({
                where: {
                    role: "USER"
                }
            })
            return {
                message: "get all user thanh cong",
                data: users
            }
        } catch(err) {
            return {
                status: false,
                message: "get all user that bai"
            }
        }
    },
    findById: async function(idUser: number) {
        try {
            let userById = await prisma.users.findUnique({
                where: {
                    id: idUser
                }
            })
            console.log("userById: ", userById)
            return {
                message: "get user thanh cong",
                data: userById,
            }
        } catch(err) {
            return {
                status: false,
                message: "get user that bai"
            }
        }
    }
}