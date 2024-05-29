import { CartProduct } from "@/app/lib/types";
import DeleteItemButton from "./DeleteItemButton";
import CartCardInfo from "./CartCardInfo";

export default function CartCard({product} : {product: CartProduct}) {
    return(
        <div className={`
            flex 
            flex-row
            items-center
            justify-between 
            bg-slate-200 
            rounded-3xl 
            p-4 
            m-2
            mb-4
            shadow-xl`
        }>
            <div className="mr-8 md:mr-0">
                <CartCardInfo product={product} />
            </div>
            <div className="md:pr-8">
                <DeleteItemButton product={product}/>
            </div>
        </div>
    )
}
