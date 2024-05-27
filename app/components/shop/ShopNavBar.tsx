'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import CategoryCheckbox from './CategoryCheckbox';
import Link from 'next/link';
import Image from "next/image";

export default function ShopNavBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return (
        <div className={`
            bg-slate-100
            p-8
            border-lime-600
            border-solid
            md:border-r-2
            md:border-b-0
            border-b-2
            md:h-full
            flex
            flex-col
            justify-between
        `}>
            <form className="flex flex-col">
                <div className="flex">
                    <input 
                        type="text" 
                        id="search" 
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get('query')?.toString()} 
                        placeholder={"Nombre, ingredientes, etc..."} 
                        className="font-bold text-black w-full px-3 py-2 rounded-xl border-solid border border-lime-500"
                    />
                </div>
                <div className='pt-2'>
                    <p className='text-lg font-bold'>Café</p>
                    <div className="grid grid-cols-5 ">
                        <div className='col-span-1'></div>
                        <div className='col-span-4'>
                            <CategoryCheckbox text={'Espresso'} category={'espresso_drink'}/>
                        </div>
                        <div className='col-span-1'></div>
                        <div className='col-span-4'>
                            <CategoryCheckbox text={'Filtrados'} category={'filter_drink'}/>
                        </div>
                        <div className='col-span-1'></div>
                        <div className='col-span-4'>
                            <CategoryCheckbox text={'Con leche'} category={'milk_drink'}/>
                        </div>
                        <div className='col-span-1'></div>
                        <div className='col-span-4'>
                            <CategoryCheckbox text={'Fríos'} category={'iced_drink'}/>
                        </div>
                    </div>
                </div>
                <div className='pt-2'>
                    <p className='text-lg font-bold'>Té</p>
                    <div className="grid grid-cols-5 ">
                        <div className='col-span-1'></div>
                        <div className='col-span-4'>
                            <CategoryCheckbox text={'Tés'} category={'tea'}/>
                        </div>
                    </div>
                </div>
                <div className='pt-2'>
                    <p className='text-lg font-bold'>Para comer...</p>
                    <div className="grid grid-cols-5 ">
                        <div className='col-span-1'></div>
                        <div className='col-span-4'>
                            <CategoryCheckbox text={'Tortas'} category={'cake'}/>
                        </div>
                        <div className='col-span-1'></div>
                        <div className='col-span-4'>
                            <CategoryCheckbox text={'Sandwiches'} category={'sandwich'}/>
                        </div>
                        <div className='col-span-1'></div>
                        <div className='col-span-4'>
                            <CategoryCheckbox text={'Laminados'} category={'pastry'}/>
                        </div>
                        <div className='col-span-1'></div>
                        <div className='col-span-4'>
                            <CategoryCheckbox text={'Cookies'} category={'cookie'}/>
                        </div>
                    </div>
                </div>
            </form>
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