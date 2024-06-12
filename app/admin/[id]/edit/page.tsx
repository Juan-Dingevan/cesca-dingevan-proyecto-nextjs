import React from 'react'

import EditProductForm from '@/app/components/abm/EditForm';
import Breadcrumbs from '@/app/components/abm/Breadcrumbs';
import { fetchProductById } from '@/app/lib/data';
import { notFound } from 'next/navigation';



export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [product] = await Promise.all([
        fetchProductById(id),
      ]);

      if (!product) {
        notFound();
      }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Productos', href: '/admin' },
          {
            label: 'Editar Producto',
            href: `/admin/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditProductForm product={product} />
    </main>
  );
}