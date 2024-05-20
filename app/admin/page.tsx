import React from 'react'

import Link from 'next/link'

 
export default async function AdminPage() {
  return (
    <main>
    <div className='flex justify-start items-center w-screen h-screen bg-slate-100'>
      <div className="flex items-center">
        <Link
          href="/admin/create"
          className="text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 rounded-lg px-2 py-1"
        >
          Create Product
        </Link>
      </div>
    </div>
  </main>
  
  );
}