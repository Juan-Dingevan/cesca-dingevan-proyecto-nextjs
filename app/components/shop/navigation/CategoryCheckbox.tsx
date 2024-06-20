'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CategoryCheckbox({
    text,
    category
}: {
    text: string
    category: string
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const startingValue = searchParams.get('categories')?.toString().includes(category)

    // We init checked as !startingValue because, for some weird 
    // probably js-related reason, the first time you
    // call setChecked(!checked) it actually sets the 
    // value to checked, NOT to !checked.
    const [checked, setChecked] = useState(!startingValue);

    function handleChange() {
        console.log("Checked (" + category + ") = " + checked)
        setChecked(!checked)

        const params = new URLSearchParams(searchParams);
        const categories = params.get("categories")
        const page = params.get("page")

        if(checked) {
            let final = ''

            if(categories) {
                //Theres at least one value in categories rn
                final = categories + "-" + category
            } else {
                final = category
            }

            params.set('categories', final)
        } else {
            if(categories) {
                const parts = categories.split("-")
                const filteredParts = parts.filter(part => part !== category);
                const newCategories = filteredParts.join('-');

                if(newCategories.length == 0) {
                    // We had exactly 1 category and we
                    // de-ticked it, so we delete the
                    // whole thing from the url
                    params.delete('categories')
                } else {
                    params.set('categories', newCategories)
                }

                //In addition, when we remove a category
                //We want to make sure that the pagination
                //doesn't leave us in an awkward spot. For
                //example: if with 2 categories ticked, we've
                //got 7 items, and we're on page 2 when we de-
                //tick one of them, and that leaves us with 2
                //items, page 2 will show 0 results, when in fact
                //there are results.
                if(page) {
                    params.set('page', '1')
                }
            }
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return(
        <label className="pt-1 flex justify-between">
            <p className="text-md text-slate-700 font-bold">{text}</p>
            <input 
                type="checkbox" 
                defaultChecked={startingValue}
                onChange={(e) => handleChange()}
            />
        </label>
    )
}