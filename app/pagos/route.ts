import type {NextRequest} from "next/server";
import {MercadoPagoConfig, Payment} from "mercadopago";
import { sql } from '@vercel/postgres';

interface PaymentDatabaseEntry {
    id: number,
    created_as_string: string, //it is a date, but preformated, according to mercadopago's api
    amount: number, //We store it as cents.
    message: string,
    status: string
}

const mercadopago = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!
});

async function uploadToDB(entry: PaymentDatabaseEntry) {
    try {
        await sql`
            INSERT INTO ventanita.payments (id, created, amount, message, status)
            VALUES (${entry.id}, ${entry.created_as_string}, ${entry.amount}, ${entry.message}, ${entry.status})
          `;
      } catch (error) {
        // If a database error occurs, return a more specific error.
        console.log(error)
        return {
          message: 'Database Error: Failed to Create Payment.',
        };
      }
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const id = body.data.id

    const payment = await new Payment(mercadopago).get({id: id});

    const dbEntryPayment = {
        id: payment.id!,
        created_as_string: payment.date_created!,
        amount: payment.transaction_amount! * 100, //We store it as cents.
        message: payment.description!,
        status: payment.status!
    };

    console.log("paymentDB =" + dbEntryPayment)
    await uploadToDB(dbEntryPayment)

    return Response.json({success: true});
}