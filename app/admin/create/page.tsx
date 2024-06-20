import React from 'react'
import Form from '../../components/abm/CreateForm'
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Crear Producto | Admin | La Ventanita',
};


 
export default async function CreatePage() {
 
  return (
    <main className="p-4 md:px-20 md:py-10">
      <Form/>
    </main>
  )
}