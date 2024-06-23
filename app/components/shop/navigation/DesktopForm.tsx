import CategoryCheckbox from "./CategoryCheckbox";

export default function DesktopForm() {
    return <form className="flex flex-col">
        <div className='pt-2'>
            <p className='text-lg font-bold'>Café</p>
            <div className="grid grid-cols-5 ">
                <div className='col-span-1'></div>
                <div className='col-span-4'>
                    <CategoryCheckbox text={'Espresso'} category={'espresso_drink'} />
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-4'>
                    <CategoryCheckbox text={'Filtrados'} category={'filter_drink'} />
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-4'>
                    <CategoryCheckbox text={'Con leche'} category={'milk_drink'} />
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-4'>
                    <CategoryCheckbox text={'Fríos'} category={'iced_drink'} />
                </div>
            </div>
        </div>
        <div className='pt-2'>
            <p className='text-lg font-bold'>Té</p>
            <div className="grid grid-cols-5 ">
                <div className='col-span-1'></div>
                <div className='col-span-4'>
                    <CategoryCheckbox text={'Tés'} category={'tea'} />
                </div>
            </div>
        </div>
        <div className='pt-2'>
            <p className='text-lg font-bold'>Para comer...</p>
            <div className="grid grid-cols-5 ">
                <div className='col-span-1'></div>
                <div className='col-span-4'>
                    <CategoryCheckbox text={'Tortas'} category={'cake'} />
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-4'>
                    <CategoryCheckbox text={'Sandwiches'} category={'sandwich'} />
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-4'>
                    <CategoryCheckbox text={'Laminados'} category={'pastry'} />
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-4'>
                    <CategoryCheckbox text={'Cookies'} category={'cookie'} />
                </div>
            </div>
        </div>
    </form>;
}