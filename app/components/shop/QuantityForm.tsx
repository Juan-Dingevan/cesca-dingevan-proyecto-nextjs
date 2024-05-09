export default function ProductCard() {
    return (
        <form className="flex items-center">
            <input
                type="number"
                placeholder="0"
                min={0}
                className="flex-auto border border-gray-300 rounded-xl p-2 mr-2 text-center w-1/3"
            />
            <button 
                type="submit"
                className="flex-auto text-white text-bold text-md bg-lime-600 hover:bg-lime-500 focus:ring-2 focus:outline-none focus:ring-lime-500 rounded-xl px-5 py-2 text-center hover:transition-colors ease-in-out duration-500"
            >
                Agregar
            </button>
        </form>
    );
}