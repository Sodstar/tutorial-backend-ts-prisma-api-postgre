import { Router } from "express";
import {
    approveInvoice,
    checkInvoice,
    createInvoice,
} from "../controllers/payment.controller";

const router = Router();

router.route("/").post(createInvoice);
router.route("/check/:id").get(checkInvoice);
router.route("/approve/:role/:id/:code").get(approveInvoice);

export default router;
