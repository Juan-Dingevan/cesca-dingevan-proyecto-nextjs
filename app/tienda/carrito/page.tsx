import CartDetails from '@/app/components/cart/CartDetails'
import ShoppingCartDisplay from '@/app/components/cart/ShoppingCartDisplay'
import React from 'react'
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Carrito | La Ventanita',
};


const CarritoPage = () => {
  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-1 min-h-screen">
      <div className="flex justify-center items-center">
        <ShoppingCartDisplay />
      </div>
      <div className="">
        <CartDetails />
      </div>
    </div>
  )
}

export default CarritoPage