import { asyncHandler } from "../middleware/error";
import { BaseError } from "../utils/BaseError";
import { getRandomCode } from "../utils/tools";

import { randomUUID } from "crypto";
import { checkQpayInvoice, createQpayInvoice } from "../services/qpayService";

import { UserRole } from "../types/auth";
import { baseURL } from "../config/env";
import { getUserInfo } from "../utils/user";
import logger from "../utils/log";

export const createInvoice = asyncHandler(async (req, res) => {

    const { userId, userRole } = req.body;
    if (!userId || !userRole)
        throw new BaseError("UserId болон Role дамжуулна уу!", 400);

    const { amount, description } = req.body;
    if (!amount || !description)
        throw new BaseError("amount болон description дамжуулна уу!");

    const id = randomUUID();
    const code = getRandomCode(6);

    //   const callback_url = `${baseURL}/api/v1/invoice/approve/${userRole}/${id}/${code}`;
    const callback_url = `${baseURL}/payment/approve/${id}`
    const qpayInvoice = await createQpayInvoice({
        amount,
        invoice_description: description,
        callback_url,
        sender_invoice_no: getRandomCode(6),
    });
    logger.info(qpayInvoice);
    res.status(200).json({
        success: true,
        data: qpayInvoice,
    });
});

export const checkInvoice = asyncHandler(async (req, res) => {
    const { id, invoice_id } = req.params;

    // if (!invoice_id) throw new BaseError(id + " ID-тай invoice байхгүй", 404);
    if (!id) throw new BaseError(id + " ID-тай invoice байхгүй!", 404);
    const qpayResponse = await checkQpayInvoice(id);

    res.status(200).json({
        success: true,
        data: {
            qpayResponse,
            invoice: {},
        },
    });
});

export const approveInvoice = asyncHandler(async (req, res) => {
    const { id, code, role } = req.params;

    if (!id || !code || !role) throw new BaseError("Алдаа гарлаа!", 500);
    const userRole = role as UserRole;

    res.status(200).json({
        success: true,
        data: { status: "ok" },
    });
});
