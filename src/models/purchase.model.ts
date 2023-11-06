import {PrismaClient, ReceiptPayMode, ReceiptState} from '@prisma/client';

const prisma = new PrismaClient();

/* Guest */

interface NewGuestReceiptDetail {
    productId: string;
    quantity: number;
}

interface GuestReceiptDetail extends NewGuestReceiptDetail {
    id: string;
    guestReceiptId: string;
}

interface NewGuestReceipt {
    email: string;
    phoneNumber: string;
    total: number;
    payMode: ReceiptPayMode;
    paid?: boolean;
}

interface GuestReceipt extends NewGuestReceipt {
    id: string;
    state?: ReceiptState;
    createAt: Date;
    acceptTime?: Date;
    shippingTime?: Date;
    doneTime?: Date;
    guestReceiptDetail: GuestReceiptDetail[];
}

/* User */
interface NewUserReceiptDetail {
    productId: string;
    quantity: number;
}

interface UserReceiptDetail extends NewUserReceiptDetail {
    id: string;
    userReceiptId: string;
}

interface NewUserReceipt {
    total: number;
    payMode: ReceiptPayMode;
    paid?: boolean;
}

interface UserReceipt extends NewUserReceipt {
    id: string;
    state?: ReceiptState;
    createAt: Date;
    acceptTime?: Date;
    shippingTime?: Date;
    doneTime?: Date;
    userReceiptDetail: UserReceiptDetail[];
}

export default {
    createGuestReceipt: async function (newGuestReceipt: NewGuestReceipt, guestReceiptDetailList: NewGuestReceiptDetail[]) {
        try {
            let receipt = await prisma.guestReceipts.create({
                data: {
                    ...newGuestReceipt,
                    guestReceiptDetail: {
                        /*createMany: {
                            data: guestReceiptDetailList
                        }*/
                    }
                },
                include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "orderSuccess",
                data: receipt
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "modelErr",
                data: null
            }
        }
    },
    createUserReceipt: async function (newUserReceipt: NewUserReceipt, userReceiptDetailList: NewUserReceiptDetail[], userId: number) {
        try {
            let receipt = await prisma.userReceipts.create({
                data: {
                    ...newUserReceipt,
                    user: {connect: {id: userId}},
                    userReceiptDetail: {
                        /*createMany: {
                            data: userReceiptDetailList
                        }*/
                    }
                },
                include: {
                    userReceiptDetail: true
                }
            });
            return {
                status: true,
                message: "orderSuccess",
                data: receipt
            }
        } catch (err) {
            console.log("err", err);
            return {
                status: false,
                message: "modelErr",
                data: null
            }
        }
    },
    findManyGuestReceipts: async function (maxItemPage: number, skipItem: number) {
        try {
            let orders = await prisma.guestReceipts.findMany({
                skip: skipItem,
                take: maxItemPage,
                include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }
                    }
                }
            });
            let countItem = (await prisma.guestReceipts.findMany()).length;
            let maxPage = Math.ceil(countItem / maxItemPage);
            return {
                status: true,
                message: "Lấy danh sách hoá đơn thành công",
                maxPage,
                data: orders,
            }
        } catch (err) {
            return {
                status: false,
                message: "modelErr",
            }
        }
    },
    findById: async function (orderId: number) {
        try {
            let order = await prisma.guestReceipts.findUnique({
                where: {
                    id: orderId
                },
                include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "get Guest Receipt by Id successfully",
                data: order
            }
        } catch (err) {
            return {
                status: false,
                message: "modelErr",
                data: null
            }
        }
    },
    findGuestReceipt: async function (guestEmail: string) {
        try {
            let receipts = await prisma.guestReceipts.findMany({
                where: {
                    email: guestEmail
                },
                include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "Lấy danh sách order thành công! ",
                data: receipts
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi model!",
                data: null
            }
        }
    },
    findUserReceipt: async function (userId: number) {
        try {
            let receipts = await prisma.userReceipts.findMany({
                where: {
                    userId: userId
                },
                include: {
                    userReceiptDetail: {
                        include: {
                            product: true
                        }
                    },
                    user: true
                },

            })
            return {
                status: true,
                message: "Lấy danh sách order của người dùng thành công! ",
                data: receipts
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "Lỗi model!",
                data: null
            }
        }
    },
    update: async function (receiptId: number, updateData: {
        acceptTime?: Date,
        shippingTime?: Date,
        doneTime?: Date,
        state: ReceiptState
    }, type: boolean) {
        if (type) {
            return {
                status: true,
                message: "Update ok!",
                data: null
            }
        } else {
            let updateDataTemp = {
                state: updateData.state,
                ...(
                    updateData.state == "ACCEPTED" ? {
                        acceptTime: new Date(Date.now())
                    } : updateData.state == "SHIPPING" ? {
                        shippingTime: new Date(Date.now()),
                    } : updateData.state == "DONE" ? {
                        doneTime: new Date(Date.now())
                    } : {}
                )
            }
            let receipt = await prisma.guestReceipts.update({
                where: {
                    id: receiptId
                },
                data: {
                    ...updateDataTemp
                }
            })

            return {
                status: true,
                message: "Update ok!",
                data: receipt
            }
        }
    },
    
}