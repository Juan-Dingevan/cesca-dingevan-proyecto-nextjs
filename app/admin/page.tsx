import React from 'react'

import Link from 'next/link'
import {CreateProduct} from '../components/abm/Buttons'

 
export default async function AdminPage() {
  return (
    <main>
    <div className='flex justify-start items-center w-screen h-screen bg-slate-100'>
      <div className="flex items-center">
      <CreateProduct/>
      </div>
    </div>
  </main>
  
  );
}