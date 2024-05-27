"use client"

import { useCartStore } from "@/app/lib/useCartStore";
import useFromStore from "@/app/lib/useFromStore";

export default function ShoppingCart() {
    const cart = useFromStore(useCartStore, state => state.cart)

	let total = 0
	if (cart) {
		total = cart.reduce((acc, product) => acc + product.price * (product.quantity as number), 0)
	}

    return(
        <div className="bg-lime-600 h-full p-8 flex flex-col">
            <p className="text-3xl font-bold">Productos:</p>
            <ul>
				{cart?.map(product => (
					<p key={product.id}> {product.name} </p>
				))}
			</ul>
        </div>
    )
}