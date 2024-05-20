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
        <input type="text" placeholder="Nombre del producto" className="input-text"/>
        <div className="underline"></div>
      </div>
      <div className="input-data textarea">
        <textarea rows={8} cols={80} placeholder="Descripción del producto" className="input-textarea"></textarea>
        <div className="underline"></div>
      </div>
      <div className="input-data number">
        <input type="number" min={0} placeholder="Precio del producto" className="input-number"/>
        <div className="underline"></div>
      </div>
      <div className="input-data">
        <input type="text" placeholder="Categoria del producto" className="input-text"/>
        <div className="underline"></div>
      </div>
      <div className="input-data boolean flex items-center">
        <input type="checkbox" className="input-boolean mr-2" />
        <span>Vegan</span>
        <div className="underline"></div>
      </div>
      <div className="input-data boolean flex items-center">
        <input type="checkbox" className="input-boolean mr-2" />
        <span>Gluten Free</span>
        <div className="underline"></div>
      </div>
      <div className="input-data">
        <input type="url" placeholder="Link de la imagen" className="input-text w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2" />
        <div className="underline"></div>
      </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Producto</Button>
      </div>
    </form>
  );
}
