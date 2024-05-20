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
    // We init checked as false because, for some weird 
    // probably js-related reason, the first time you
    // call setChecked(!checked) it actually sets the 
    // value to checked, NOT to !checked.
    const [checked, setChecked] = useState(true);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleChange() {
        console.log("Checked (" + category + ") = " + checked)
        setChecked(!checked)

        const params = new URLSearchParams(searchParams);
        const categories = params.get("categories")

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
            }
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return(
        <label className="pt-1 flex justify-between">
            <p className="text-md text-slate-700 font-bold">{text}</p>
            <input 
                type="checkbox" 
                defaultChecked={false}
                onChange={(e) => handleChange()}
            />
        </label>
    )
}