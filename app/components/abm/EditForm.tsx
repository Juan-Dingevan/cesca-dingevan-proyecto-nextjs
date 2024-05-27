'use client';

import { ProductForm } from '@/app/lib/types';
import Link from 'next/link';
import { updateProduct } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from './CreateButton';


export default function EditProductForm({
  product,
}: {
  product: ProductForm;
}) {
  const initialState = { message: "", errors: {} };
  const updateInvoiceWithId = updateProduct.bind(null, product.id);
  const [state, dispatch] = useFormState(updateInvoiceWithId, initialState);
 
  return (<form action={dispatch}>
        <input type="hidden" name="id" value={product.id} />
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="input-data">
        <label>Nombre   </label>
        <input 
        id="name"
        name="name"
        type="text" 
        defaultValue={product.name}
        className="input-text"/>
        <div className="underline"></div>
      </div>
      <div className="input-data textarea">
        <label>Descripción   </label>
        <textarea 
         id="description"
         name="description"
         rows={8} 
         cols={80} 
         defaultValue={product.description}
         className="input-textarea"></textarea>
        <div className="underline"></div>
      </div>
      <div className="input-data number">
        <label>Precio   </label>
        <input 
        id="price"
        name="price"
        type="number" 
        step="0.1"
        min={0} 
        defaultValue={product.price}
        className="input-number"/>
        <div className="underline"></div>
      </div>
      <div className="input-data">
        <label>Categoria   </label>
        <input 
        id="category"
        name="category"
        type="text" 
        defaultValue={product.category}
        className="input-text"/>
        <div className="underline"></div>
      </div>
      <div className="input-data boolean flex items-center">
        <input 
        id="vegan"
        name="vegan"
        type="checkbox" 
        defaultChecked={product.vegan}
        className="input-boolean mr-2" />
        <span>Vegan</span>
        <div className="underline"></div>
      </div>
      <div className="input-data boolean flex items-center">
        <input 
        id="gluten_free" 
        name="gluten_free" 
        type="checkbox" 
        defaultChecked={product.gluten_free}
        className="input-boolean mr-2" />
        <span>Gluten Free</span>
        <div className="underline"></div>
      </div>
      <div className="input-data">
        <label>Link de Imagen   </label>
        <input 
        id="img_link"
        name="img_link"
        type="url" 
        defaultValue={product.img_link}
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
      <Button type="submit">Editar Producto</Button>
      </div>
  </form>);
}


