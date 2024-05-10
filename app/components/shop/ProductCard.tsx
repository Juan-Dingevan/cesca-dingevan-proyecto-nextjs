import Image from "next/image";
import TooltipParagraph from "./TooltipParagraph";
import QuantityForm from "./QuantityForm";

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
    
    return (
        <div className={`
            m-8
            rounded-3xl
            bg-slate-200
            p-8
            grid
            justify-items-center
            items-center
            shadow-xl
        `}>
            <Image 
                src={url}
                alt={alt}
                width={150}
                height={150}
                draggable="false"
                className={`
                    border-slate-700
                    border-2
                    border-solid
                    rounded-3xl 
                    pt-1
                `}
            />
            <div>
                <p className="text-2xl font-bold text-black py-1">
                    {name}
                </p>
                <div className="flex py-1 flex-row">
                    <p className="font-bold text-gray-600 ">
                        {product.description}
                    </p>
                    <div>
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
                    <p className="font-bold text-black py-1">
                        Precio: ${(product.price / 100).toFixed(2)}
                    </p>    
                </div>
                <div className="py-1">
                    <QuantityForm/>
                </div>
            </div>
        </div>
    );
}