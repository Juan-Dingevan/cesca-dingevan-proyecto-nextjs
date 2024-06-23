import Image from "next/image";
import TooltipParagraph from "./TooltipParagraph";
import QuantityForm from "./QuantityForm";
import { Product } from "@/app/lib/types";

export default function ProductCard({product} : {product: Product}) {
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

    let desc = product.description
    const lengthLimit = 100
    if(desc.length > lengthLimit) {
        desc = desc.slice(0, lengthLimit-3) + "..."
    }
    
    return (
        <div className={`
            rounded-3xl
            bg-slate-200
            p-8
            grid
            grid-rows-[auto, auto, 1fr, auto, auto]
            gap-2
            justify-items-center
            shadow-xl
        `}>
            <div className="row-span-1 w-32 h-32 relative">
                <Image 
                    src={url}
                    alt={alt}
                    layout="fill" // This ensures the image fills the container
                    objectFit="cover" // This makes sure the image covers the container, maintaining aspect ratio
                    draggable="false"
                    className={`
                        border-slate-700
                        border-2
                        border-solid
                        rounded-3xl
                    `}
                />
            </div>

            <p className="text-2xl font-bold text-black row-span-1">
                {name}
            </p>

            <div className="row-span-1 flex flex-row">
                <p className="font-bold text-sm text-gray-600 align-top overflow-hidden text-ellipsis h-20">
                    {desc}
                </p>
                <div className="flex flex-col">
                    {product.vegan && <TooltipParagraph 
                        text={"V"}
                        tooltip={"Producto vegano."}
                        style={"font-bold italic text-green-500"}
                    />}
                    {product.gluten_free && <TooltipParagraph 
                        text={"C"}
                        tooltip={"Producto sin TACC."}
                        style={"font-bold italic text-amber-500"}
                    />}
                </div>
            </div>

            <div>
                <p className="font-bold text-black row-span-1">
                    Precio: ${(product.price / 100).toFixed(2)}
                </p>    
            </div>

            <div className="row-span-1">
                <QuantityForm product={product}/>
            </div>
        </div>
    );
}