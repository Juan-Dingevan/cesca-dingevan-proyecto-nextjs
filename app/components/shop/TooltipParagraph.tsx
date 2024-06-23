export default function ProductCard({text, tooltip, style}: {text: string, tooltip: string, style: string}) {
    return (
        <div className="flex relative">
            <p className={"peer " + style}>{text}</p>
            <span className={`
                hidden
                peer-hover:block
                peer-hover:opacity-100
                transition-all
                duration-500
                bg-slate-700
                px-1
                text-sm
                text-gray-100
                rounded-md
                absolute
                left-4
                -top-3 
                opacity-0
                m-4 
                mx-auto
                whitespace-nowrap
                `
                }>
                    {tooltip}
                </span>
        </div>
    );
}