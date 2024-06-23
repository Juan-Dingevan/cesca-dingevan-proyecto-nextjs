
export default function PriceDisplay({text, price} : {text: string, price: number}) {
    return(
        <div className="flex flex-col items-center px-2">
            <p className="text-xl font-bold text-black mb-1">
                {text}
            </p>
            <p className="text-slate-800">
                ${(price / 100).toFixed(2)}
            </p>
        </div>
    );
}