'use client';

import { ProductForm } from '@/app/lib/types';
import Link from 'next/link';
import { updateProduct } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from './CreateButton';
import { useState } from 'react';

export default function EditProductForm({
  product,
}: {
  product: ProductForm;
}) {
  const initialState = { message: "", errors: {} };
  const updateInvoiceWithId = updateProduct.bind(null, product.id);
  const [state, dispatch] = useFormState(updateInvoiceWithId, initialState);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState(product.img_link);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <form
      action={dispatch}
      className={`
        rounded-xl 
        bg-slate-50 
        p-4 
        border 
        border-lime-500 
        border-solid
        flex
        flex-col
      `}
    >
      <input type="hidden" name="id" value={product.id} />

      <div className="input-data">
        <label htmlFor='name' className="flex flex-col p-2">
          <p className='text-lg'>Nombre:</p>
          <input 
            id="name"
            name="name"
            type="text" 
            defaultValue={product.name}
            className="input-text"
          />
        </label>
      </div>

      <div className="input-data textarea">
        <label htmlFor='description' className="flex flex-col p-2">
          <p className='text-lg'>Descripción:</p>
          <textarea 
            id="description"
            name="description"
            rows={8} 
            cols={80} 
            defaultValue={product.description}
            className="input-textarea"
          />
        </label>
      </div>

      <div className="input-data number">
        <label htmlFor='price' className="flex flex-col p-2">
          <p className='text-lg'>Precio:</p>
          <input 
            id="price"
            name="price"
            type="number" 
            step="0.1"
            min={0} 
            defaultValue={product.price}
            className="input-number"
          />
        </label>
      </div>

      <div className="input-data">
        <label htmlFor='category' className="flex flex-col p-2">
          <p className='text-lg'>Categoría:</p>
          <select 
            id="category"
            name="category"
            defaultValue={product.category}
            className="input-select"
          >
            <option value="espresso_drink">Espresso Drink</option>
            <option value="filter_drink">Filter Drink</option>
            <option value="iced_drink">Iced Drink</option>
            <option value="milk_drink">Milk Drink</option>
            <option value="tea">Tea</option>
            <option value="cake">Cake</option>
            <option value="pastry">Pastry</option>
            <option value="sandwich">Sandwich</option>
            <option value="cookie">Cookie</option>
          </select>
        </label>
      </div>

      <div className="input-data boolean flex flex-row gap-2 p-2">
        <span className='text-lg'>Plant Based</span>
        <input 
          id="vegan"
          name="vegan"
          type="checkbox" 
          defaultChecked={product.vegan}
          className="input-boolean" 
        />
      </div>

      <div className="input-data boolean flex flex-row gap-2 p-2">
        <span className='text-lg'>Gluten Free</span>
        <input 
          id="gluten_free" 
          name="gluten_free" 
          type="checkbox" 
          defaultChecked={product.gluten_free}
          className="input-boolean" 
        />
      </div>

      <div className="input-data">
        <label htmlFor='img_link' className="flex flex-col p-2">
          <p className={'text-lg' + (imageFile != null && "text-gray-500")}>Link a la imagen:</p>
          <input 
            id="img_link"
            name="img_link"
            type="url"
            defaultValue={product.img_link}
            onChange={(e) => { setImageLink(e.target.value) }}
            disabled={imageFile != null}
            placeholder="https://i.imgur.com/3IdJ0JR.jpeg" 
            className="input-text w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2"
          />
          <small className="text-gray-500 mt-1">Solo se permiten enlaces de imgur y cloudinary.</small>
        </label>
      </div>

      <div className="flex flex-col p-2">
        <label htmlFor='picture' className='flex flex-col'>
          <p className='text-lg'>Subir imagen:</p>
          <input 
            disabled={imageLink != ""}
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            name="picture" 
            className="pt-2"
          />
        </label>

        {imageFile && (
          <div className="mt-2">
            <p className="text-gray-500">Imagen seleccionada: {imageFile.name}</p>
          </div>
        )}

        {imageFile && (
          <div>
            <button 
              className="mt-1 rounded-lg bg-gray-200 transition-colors hover:bg-gray-300 p-2"  
              onClick={() => { setImageFile(null) }}
            >
              Descartar
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2 md:flex-row md:justify-end md:gap-4">
        <Link
          href="/admin"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Producto</Button>
      </div>
    </form>
  );
}
