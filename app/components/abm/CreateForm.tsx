'use client';

import Link from 'next/link';

import { useFormState } from 'react-dom';
import { Button } from './CreateButton';

//FORMULARIO: id: string; name: string; description: string; price: number; category: string; vegan: boolean; gluten_free: boolean; date_added: Date; img_link: string;


export default function Form() {
  //const initialState = { message: null, errors: {} };
  //const [state, dispatch] = useFormState(createInvoice, initialState);
  return (
    //<form action={dispatch}>
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="input-data">
      <input type="text" placeholder="Product Name" className="input-text"/>
      <div className="underline"></div>
    </div>
      <div className="input-data textarea">
      <textarea rows={8} cols={80} placeholder="Product Description" className="input-textarea"></textarea>
      <div className="underline"></div>
    </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Product</Button>
      </div>
    </form>
  );
}
