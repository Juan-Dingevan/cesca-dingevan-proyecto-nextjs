"use client"

import { CartProduct } from "@/app/lib/types";
import { useCartStore } from "@/app/lib/useCartStore";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteItemButton({product} : {product: CartProduct}) {
    const removeFromCart = useCartStore(state => state.removeFromCart)

    function remove() {
        removeFromCart(product)
    }

    return(
        <button onClick={remove}>
            <TrashIcon className="w-5" />
        </button>
    )
}