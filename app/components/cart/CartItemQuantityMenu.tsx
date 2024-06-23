"use client"

import { CartProduct } from "@/app/lib/types";
import { useCartStore } from "@/app/lib/useCartStore";

export default function CartItemQuantityMenu({product} : {product: CartProduct}) {
    const updateProduct = useCartStore(state => state.updateProduct)
    
    function sub() {
        const newQuantity = product.quantity - 1 < 1 ? 1 : product.quantity - 1
        product.quantity = newQuantity
        updateProduct(product) 
    }

    function add() {
        const newQuantity = product.quantity + 1
        product.quantity = newQuantity
        updateProduct(product)
    }
    
    return(
        <div className="flex flex-row">
            <button 
                className={`
                    p-2
                    bg-slate-300
                    hover:bg-slate-400
                    rounded-lg
                    font-bold
                    hover:transition-colors ease-in-out duration-500
                    flex-auto
                `}
                onClick={sub}
            >
                <p>-</p>
            </button>
            <p className="mx-1 flex-auto py-2 px-4 bg-slate-50 rounded-lg text-slate-500 text-center">
                {product.quantity}
            </p>
            <button 
                className={`
                    p-2
                    flex-auto
                    bg-slate-300
                    hover:bg-slate-400
                    rounded-lg
                    font-bold
                    hover:transition-colors ease-in-out duration-500
                `}
                onClick={add}
            >
                <p>+</p>
            </button>
        </div>
    )
}