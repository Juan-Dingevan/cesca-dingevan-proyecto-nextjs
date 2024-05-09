import Image from "next/image";
import TooltipParagraph from "./TooltipParagraph";
import QuantityForm from "./QuantityForm";

export default function ProductCard() {
    return (
        <div className={`
            m-8
            w-1/4
            rounded-3xl
            bg-slate-200
            p-8
            grid
            justify-items-center
            items-center
            shadow-xl
        `}>
            <Image 
                src="/image_not_found.jpg"
                alt={"No se encontró la imagen buscada"}
                width={200}
                height={200}
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
                    Nombre
                </p>
                <div className="flex py-1">
                    <p className="font-bold text-gray-600 ">
                        Descripción del producto, por ejemplo, sus ingredientes.
                    </p>
                    <div>
                        <TooltipParagraph 
                            text={"V"}
                            tooltip={"Producto vegano."}
                            style={"font-bold italic text-green-500"}
                        />
                        <TooltipParagraph 
                            text={"C"}
                            tooltip={"Producto sin TACC."}
                            style={"font-bold italic text-amber-500"}
                        />
                    </div>
                </div>
                <div>
                    <p className="font-bold text-black py-1">
                        Precio: $DD.CC
                    </p>    
                </div>
                <div className="py-1">
                    <QuantityForm/>
                </div>
            </div>
        </div>
    );
}