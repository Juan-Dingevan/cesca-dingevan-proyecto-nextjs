"use client"

import { useCartStore } from "@/app/lib/useCartStore";
import useFromStore from "@/app/lib/useFromStore";
import CartCard from "./CartCard";

export default function ShoppingCartDisplay() {
    const cart = useFromStore(useCartStore, state => state.cart)

	let total = 0
	if (cart) {
		total = cart.reduce((acc, product) => acc + product.price * (product.quantity as number), 0)
	}

    return(
        <div 
			className={`
				bg-slate-100 
				h-full 
				p-8 
				flex 
				flex-col
				border-lime-600
            	border-solid
				border
				rounded-3xl
				my-2
                md:mx-2
                md:my-0
				shadow-xl
			`}
		>
            
			{cart?.map(product => (
				<CartCard key={product.id} product={product}/>
			))}
			
        </div>
    )
}