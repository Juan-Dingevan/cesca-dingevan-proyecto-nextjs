import Image from "next/image";

export default async function ShoppingCart() {
    return(
        <div className="bg-lime-600 h-full p-8 flex flex-col">
            <a href=""> {/*TEMPORAL!*/}
                <Image 
                    src="/shopping-cart.svg"
                    alt={"Carrito de compras"}
                    width={50}
                    height={50}
                />
            </a>
        </div>
    )
}