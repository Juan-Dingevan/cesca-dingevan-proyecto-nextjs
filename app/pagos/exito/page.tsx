'use client'

import { useCartStore } from "@/app/lib/useCartStore";
import React, { useEffect } from 'react'
import Link from "next/link";

export default function PagoExitoso() {
    const limpiarCarrito = useCartStore(state => state.reset)
    
    const clearCart = () => {
        limpiarCarrito()
        //console.log('El carrito ha sido limpiado');
    };

    // Usamos useEffect para ejecutar clearCart cuando el componente se monta
    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center p-2">
                <p className="text-3xl font-bold text-lime-700 pb-2">
                    Compra exitosa
                </p>
                <p className="text-xl text-slate-700 text-center pb-2">
                    Te esperamos en nuestro local para que retires el pedido, o lo disfrutes con nosotros.
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