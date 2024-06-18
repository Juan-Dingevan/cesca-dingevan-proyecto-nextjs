"use client"

import { CartProduct, Product } from "@/app/lib/types";
import { useCartStore } from "@/app/lib/useCartStore";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const [showFeedback, setShowFeedback] = useState(false);

    const add = () => { setQuantity(quantity + 1); }
    const sub = () => { setQuantity(quantity - 1 <= 1 ? 1 : quantity - 1); }

    const addToCart = useCartStore(state => state.addToCart);

    const handleAddToCart = () => {
        const cartProduct: CartProduct = {
            quantity: quantity,
            ...product
        };

        addToCart(cartProduct);

        setShowFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
        }, 2000); // El mensaje desaparecerá después de 2 segundos
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center">
                <div className="flex flex-row mx-2">
                    <button
                        className={`
                            p-2
                            bg-slate-300
                            hover:bg-slate-400
                            rounded-lg
                            font-bold
                            hover:transition-colors ease-in-out duration-500
                        `}
                        onClick={sub}
                    >
                        -
                    </button>
                    <p className="mx-1 py-2 px-4 bg-slate-50 rounded-lg text-slate-500 text-center">
                        {quantity}
                    </p>
                    <button
                        className={`
                            p-2
                            bg-slate-300
                            hover:bg-slate-400
                            rounded-lg
                            font-bold
                            hover:transition-colors ease-in-out duration-500
                        `}
                        onClick={add}
                    >
                        +
                    </button>
                </div>
                <button
                    className="flex-auto text-white text-bold text-md bg-lime-600 hover:bg-lime-500 focus:ring-2 focus:outline-none focus:ring-lime-500 rounded-xl px-5 py-2 text-center hover:transition-colors ease-in-out duration-500 my-2 md:my-2"
                    onClick={handleAddToCart}
                >
                    Agregar
                </button>
            </div>
            <div className="flex flex-col items-center">
                <p className={`text-lime-600 text-xs font-bold mt-2 ease-in-out duration-500 opacity-${showFeedback ? "80" : "0"}`}>
                    ¡Producto agregado al carrito!
                </p>
            </div>
        </div>
    );
}