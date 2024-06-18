'use client'
import { useCartStore } from "@/app/lib/useCartStore";
import useFromStore from "@/app/lib/useFromStore";
import Link from 'next/link';
import Image from "next/image";

export default function GoToCart() {
    let items = useFromStore(useCartStore, state => state.totalItems)
    
    if(!items)
        items = 0

    return (
        <Link 
            href={"/tests/carrito"}
            className={`
                relative
                flex 
                flex-row
                items-center
                justify-center
                rounded-3xl
                text-white
                text-bold 
                text-lg 
                bg-lime-600 
                hover:bg-lime-500 
                px-5 py-2 
                text-center 
                hover:transition-colors ease-in-out duration-500
            `}
        >
            <div className="relative">
                <Image 
                    src="/shopping-cart.svg"
                    alt={"Carrito de compras"}
                    width={24}
                    height={24}
                />
                {items > 0 && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-lime-600 bg-white rounded-full">
                        {items}
                    </span>
                )}
            </div>
            <p className={"ml-2"}>Ir al carrito</p>
        </Link>
    )
}