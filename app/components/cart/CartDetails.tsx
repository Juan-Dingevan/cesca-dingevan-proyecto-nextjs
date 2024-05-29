"use client"

import { useCartStore } from "@/app/lib/useCartStore";
import useFromStore from "@/app/lib/useFromStore";
import { useRouter } from 'next/navigation'

interface ButtonProps {
    text: string,
    hoverText?: string,
    action: () => void
} 

function VentanitaButton(Props: ButtonProps) {
    const {text, hoverText, action} = Props;

    const hoverMain = hoverText ? "md:group-hover:hidden transition-all duration-250" : ""
    const hoverAlt  = hoverText ? "hidden md:group-hover:block" : ""

    return(
        <button 
            className={`
                group
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
            onClick={action}
        >
            <p className={hoverMain}>{text}</p>
            <p className={hoverAlt}>{hoverText}</p>
        </button>
    )
}

export default function CartDetails() {
    const router = useRouter()
    const items = useFromStore(useCartStore, state => state.totalItems)
    const price = useFromStore(useCartStore, state => state.totalPrice)
    
    return(
        <div 
			className={`
				bg-slate-100 
				h-full 
				p-8 
				flex 
				flex-col
                justify-between
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
            <div className="mb-4">
                <p className="text-2xl font-bold mt-2">Detalles:</p>
                
                <div className="text-xl text-grey-800 flex flex-row justify-between">
                    <p>Total de Productos:</p>
                    <p>{items}</p>
                </div>
                
                <div className="text-xl text-grey-800 flex flex-row justify-between">
                    <p>Total General:</p>
                    <p>${price ? (price / 100).toFixed(2) : "?"}</p>
                </div>
            </div>

            <form className="my-4">
                <label htmlFor="name">
                    Pedido a nombre de:
                </label>
                <input 
                    type="text" 
                    id="name" 
                    onChange={() => {}}
                    placeholder={""} 
                    className="font-bold text-black w-full px-3 py-2 rounded-xl border-solid border border-lime-500"
                />
            </form>

            <div className="flex flex-col mt-4">
                <div className="mb-2 flex flex-col">
                    <VentanitaButton text={"Finalizar"} hoverText={"Estas a momentos de disfrutar tu café"} action={() => {}}/>
                </div>
                <VentanitaButton 
                    text={"Volver a la tienda"} 
                    hoverText={"¿Te quedaste con ganas de algo?"} 
                    action={() => router.back()}/>
            </div>
        </div>
    );
}