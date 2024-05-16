

export default function ShopNavBar() {
    return (
        <div className={`
            bg-lime-600
            p-8
        `}>
            <form className="flex flex-col">
                <div className="flex">
                    <input type="text" id="search" placeholder={"Nombre, ingredientes, etc..."} className="bg-lime-400 font-bold text-black w-full px-3 py-2 rounded-xl"/>
                    <button type="submit" id="submit" className="ml-4 text-white text-lg bg-lime-400 hover:bg-lime-300 focus:ring-2 focus:outline-none focus:ring-lime-300 rounded-xl px-5 py-2.5 text-center hover:transition-colors ease-in-out duration-500">Buscar</button>
                </div>
                <label className="pt-2 flex justify-between">
                    <p className="text-lg font-bold">Café</p>
                    <input type="checkbox" placeholder="checked"/>
                </label>
                <label className="pt-2 flex justify-between">
                    <p className="text-lg font-bold">Té</p>
                    <input type="checkbox" placeholder="checked"/>
                </label>
                <label className="pt-2 flex justify-between">
                    <p className="text-lg font-bold">Para comer...</p>
                    <input type="checkbox" placeholder="checked"/>
                </label>
            </form>    
        </div>
    );
}