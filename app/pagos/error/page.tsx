import React from 'react'
import Link from "next/link";

export default function PagoError() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center p-2">
                <p className="text-3xl font-bold text-lime-700 pb-2">
                    ¡Oh no!
                </p>
                <p className="text-xl text-slate-700 text-center pb-2">
                    Se produjo un error durante el pago.
                </p>
                <p className="text-lg text-center pb-2">
                    Te invitamos a intentarlo nuevamente en unos momentos. Por si a caso, ¡no limpiamos tu carrito!
                </p>
                <Link
                    href={'/'}
                    className="text-white text-lg bg-lime-600 hover:bg-lime-500 focus:ring-2 focus:outline-none focus:ring-lime-300 rounded-lg px-5 py-2.5 text-center hover:transition-colors ease-in-out duration-500"
                >
                    Volver
                </Link>
            </div>
        </div>
    )
}