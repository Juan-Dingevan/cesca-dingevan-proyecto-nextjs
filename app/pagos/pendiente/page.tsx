import React from 'react'
import Link from "next/link";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Pendiente... | La Ventanita',
};


export default function PagoError() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center p-2">
                <p className="text-3xl font-bold text-lime-700 pb-2">
                    Ya casi...
                </p>
                <p className="text-xl text-slate-700 text-center pb-2">
                    Tu pago está pendiente.
                </p>
                <p className="text-lg text-center pb-2">
                    Cuando finalice, te esperamos en el local. Por si a caso, ¡no limpiamos tu carrito!
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