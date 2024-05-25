import React from 'react';
import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteProduct } from '@/app/lib/actions';


export function CreateProduct() {
    return (
      <Link
        href="/admin/create"
        className="flex h-10 items-center rounded-lg bg-lime-600 px-4 text-sm font-medium text-white transition-colors ease-in-out duration-500 hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"      >
        <span className="hidden md:block">Create Product</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }
  export function UpdateProduct({ id }: { id: string }) {
    return (
      <Link
        href={`/admin/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100" >
        <span className="hidden md:block">Editar Producto</span>{' '}
        <PencilIcon className="w-5" />
      </Link>
    );
  }
  
  export function DeleteProduct({ id }: { id: string }) {
    const deleteInvoiceWithId = deleteProduct.bind(null, id);
    return (
      <form action={deleteInvoiceWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
        </form>
    );
  }
  