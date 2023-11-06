import express from "express";
const router = express.Router();


import purchaseController from "../../controllers/purchase.controller";
router.post('/customer-order', purchaseController.findUserReceipt);
router.patch('/:orderId', purchaseController.update);
router.post('/order-history', purchaseController.findGuestReceipt);
router.post('/', purchaseController.createGuestReceipt);
router.post('/customer', purchaseController.createUserReceipt);
router.get('/', purchaseController.findManyGuestReceipts);
router.get('/:orderId', purchaseController.findById);

export default router;