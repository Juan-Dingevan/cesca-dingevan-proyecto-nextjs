"use client"

import CartDetails from '@/app/components/cart/CartDetails'
import ShoppingCartDisplay from '@/app/components/cart/ShoppingCartDisplay'
import React from 'react'

const CarritoPage = () => {
  return (
    <div className="p-10 flex flex-col md:flex-row min-h-screen max-h-screen">
      <ShoppingCartDisplay />
      <CartDetails />
    </div>
  )
}

export default CarritoPage