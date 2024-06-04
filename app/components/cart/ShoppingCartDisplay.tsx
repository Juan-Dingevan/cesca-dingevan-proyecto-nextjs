"use client"

import { useCartStore } from "@/app/lib/useCartStore";
import useFromStore from "@/app/lib/useFromStore";
import CartCard from "./CartCard";

export default function ShoppingCartDisplay() {
    const cart = useFromStore(useCartStore, state => state.cart)

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
            
			{cart && cart.length > 0 && cart?.map(product => (
				<CartCard key={product.id} product={product}/>
			))}

			{cart && cart.length == 0 && 
				<p className="text-xl font-bold text-lime-700 px-20 py-40">
					El carrito está vacio
				</p>
			}
			
        </div>
    )
}