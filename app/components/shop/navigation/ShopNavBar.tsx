import Link from 'next/link';
import Image from "next/image";
import SearchBar from './SearchBar';
import DesktopForm from './DesktopForm';
import MobileForm from './MobileForm';

export default function ShopNavBar() {
    return (
        <div className={`
            bg-slate-100
            p-8
            border-lime-600
            border-solid
            md:border-r-2
            md:border-b-0
            border-b-2
            md:h-screen
            flex
            flex-col
            justify-between
        `}>
            <SearchBar />
            <div className="hidden md:block">
                <DesktopForm />
            </div>
            <div className="md:hidden">
                <MobileForm />
            </div>
            <Link 
                href={"/tests/carrito"}
                className={`
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
                <Image 
                    src="/shopping-cart.svg"
                    alt={"Carrito de compras"}
                    width={15}
                    height={15}
                />
                <p className={"ml-2"}>Ir al carrito</p>
            </Link>    
        </div>
    );
}