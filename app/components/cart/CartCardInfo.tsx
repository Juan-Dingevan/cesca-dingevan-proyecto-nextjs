import Image from 'next/image'
import CartItemQuantityMenu from "./CartItemQuantityMenu";
import VerticalLine from "./VerticalLine";
import PriceDisplay from "./PriceDisplay";
import { CartProduct } from '@/app/lib/types';

export default function CartCardInfo({product} : {product: CartProduct}) {
    let url = ""
    let alt = ""

    const words = product.name.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let name = words.join(" ")
    
    if(product.img_link == "") {
        url = "/image_not_found.jpg"
        alt = "No se encontró la imagen buscada"
    } else {
        url = product.img_link
        alt = "Foto de " + product.name
    }
    
    return(
        <div 
            className={`
                grid 
                gap-2
                grid-cols-2
                md:grid-cols-4
                divide-y  
                md:divide-x 
                md:divide-y-0
                divide-slate-500 
                divide-solid
            `}
        >
            <div className="order-1 col-span-1 flex justify-center">
                <Image 
                    src={url}
                    alt={alt}
                    width={100}
                    height={100}
                    draggable="false"
                    className={`
                        border-slate-700
                        border-2
                        border-solid
                        rounded-3xl 
                    `} 
                />
            </div>

            <div className="order-3 md:order-2 col-span-1 flex flex-col items-center">
                <p className="text-xl font-bold text-black">{name}</p>
                <CartItemQuantityMenu product={product} />
            </div>

            <div className="order-2 md:order-3 col-span-1 flex justify-center text-center">
                <PriceDisplay text={"Por Unidad"} price={product.price} />
            </div>

            <div className="order-4 col-span-1 flex md:justify-start justify-center">
                <PriceDisplay text={"Total"} price={product.price * product.quantity} />
            </div>
        </div>
    );
}