import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    create: async function (newProduct: any) {
        try {
            let product = await prisma.products.create({
                data: {
                    ...newProduct,
                },
            });

            return {
                status: true,
                message: "addProductSuccess",
                data: product
            }
        } catch (err) {
            return {
                status: false,
                message: "modelErr",
                data: null
            }
        }
    },
    findAll: async function (maxItemPage: number, skipItem: number) {
        try {
            let products = await prisma.products.findMany({
                skip: skipItem,
                take: maxItemPage,
                include: {
                    category: true
                }
            });
            products = products.map(product => ({
                ...product,
                categoryName: product.category.title
            }));
            let countItem = (await prisma.products.findMany()).length;
            let maxPage = Math.ceil(countItem / maxItemPage);
            return {
                status: true,
                message: "san pham duoc tim thay!",
                maxPage,
                data: products,
            }
        } catch (err) {
            return {
                status: false,
                message: "modelErr",
            }
        }
    },
    findByCategory: async function (categoryId: number) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    categoryId: categoryId
                }
            });
            return {
                status: true,
                message: "get products successfully",
                data: products
            }
        } catch (err) {
            return {
                status: false,
                message: "modelErr",
                data: null
            }
        }
    },
    findById: async function (productId: number) {
        try {
            let product = await prisma.products.findUnique({
                where: {
                    id: productId
                }
            })
            return {
                status: true,
                message: "get product successfully",
                data: product
            }
        } catch (err) {
            return {
                status: false,
                message: "modelErr",
                data: null
            }
        }
    },
    update: async (productId: number, data: any) => {
        try {
            let product = await prisma.products.update({
                where: {
                    id: productId
                },
                data: {
                    ...data
                }
            })

            return {
                status: true,
                message: "Update thành công!",
                data: product
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "modelErr",
            }
        }
    },
    searchByName: async function (searchString: string) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: searchString,
                            }
                        },
                        {
                            des: {
                                contains: searchString,
                            },
                        }
                    ]
                }
            });
            return {
                status: true,
                message: "Ket qua search",
                data: products
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "lỗi!",
                data: null
            }
        }
    },
}