'use client';

import Link from 'next/link';

import { useFormState } from 'react-dom';
import { Button } from './CreateButton';
import { createProduct } from '@/app/lib/actions';

//FORMULARIO: id: string; name: string; description: string; price: number; category: string; vegan: boolean; gluten_free: boolean; date_added: Date; img_link: string;


export default function Form() {
  const initialState = {   message:"", errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="input-data">
        <input 
        id="name"
        name="name"
        type="text" 
        placeholder="Nombre del producto" 
        className="input-text"/>
        <div className="underline"></div>
      </div>
      <div className="input-data textarea">
        <textarea 
         id="description"
         name="description"
         rows={8} 
         cols={80} 
         placeholder="Descripción del producto" 
         className="input-textarea"></textarea>
        <div className="underline"></div>
      </div>
      <div className="input-data number">
        <input 
        id="price"
        name="price"
        type="number" 
        step="0.1"
        min={0} 
        placeholder="Precio del producto" 
        className="input-number"/>
        <div className="underline"></div>
      </div>
      <div className="input-data">
        <input 
        id="category"
        name="category"
        type="text" 
        placeholder="Categoria del producto" 
        className="input-text"/>
        <div className="underline"></div>
      </div>
      <div className="input-data boolean flex items-center">
        <input 
        id="vegan"
        name="vegan"
        type="checkbox" 
        className="input-boolean mr-2" />
        <span>Vegan</span>
        <div className="underline"></div>
      </div>
      <div className="input-data boolean flex items-center">
        <input 
        id="gluten_free" 
        name="gluten_free" 
        type="checkbox" 
        className="input-boolean mr-2" />
        <span>Gluten Free</span>
        <div className="underline"></div>
      </div>
      <div className="input-data">
        <input 
        id="img_link"
        name="img_link"
        type="url" 
        placeholder="Link de la imagen" 
        className="input-text w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2" />
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
