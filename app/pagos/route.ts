import type {NextRequest} from "next/server";

import {MercadoPagoConfig, Payment} from "mercadopago";

const mercadopago = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!
});

export async function POST(request: NextRequest) {
    const body = await request.json()
    const id = body.data.id

    const payment = await new Payment(mercadopago).get({id: id});

    const dbEntryPayment = {
        id: payment.id,
        amount: payment.transaction_amount,
        message: payment.description,
    };

    console.log("paymentDB =" + dbEntryPayment)

    return Response.json({success: true});
}