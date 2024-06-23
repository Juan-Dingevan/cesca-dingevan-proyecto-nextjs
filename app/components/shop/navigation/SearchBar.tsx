'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
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
        <form className="flex">
            <input
                type="text"
                id="search"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
                placeholder={"Nombre, ingredientes, etc..."}
                className="font-bold text-black w-full px-3 py-2 rounded-xl border-solid border border-lime-500"
            />
        </form>
    )
}