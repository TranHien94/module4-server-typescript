import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export default {
    create: async function (newCategory: any) {
        try {
            let category = await prisma.categories.create({
                data: {
                    ...newCategory
                }
            })
            return {
                status: true,
                message: "add category successfuly",
                data: category
            }

        } catch(err) {
            return {
                status: false,
                message: "model error",
                data: null
            }
        }
    },
    findMany: async function () {
        try {
            let categories = await prisma.categories.findMany()
            return {
                status: true,
                message: "get categories successfully",
                data: categories
            }
        } catch (err) {
            return {
                status: false,
                message: "model error",
                data: null
            }
        }
    }
}