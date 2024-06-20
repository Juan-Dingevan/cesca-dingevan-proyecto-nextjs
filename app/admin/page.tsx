import React from 'react'

import {CreateProduct} from '../components/abm/Buttons'
import Search from '@/app/components/abm/SearchProduct'
import { Suspense } from 'react';
import { ProductsTableSkeleton } from '@/app/components/skeletons';
import ProductsTable from '@/app/components/abm/Table';
import Pagination from '@/app/components/abm/Pagination';
import { fetchProductsPages } from '@/app/lib/data';
import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Admin | La Ventanita',
};


 
export default async function AdminPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}){
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
         <Search placeholder="Buscar productos..." />
        <CreateProduct/>
        </div>
        {<Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}> 
        <ProductsTable query={query} currentPage={currentPage} />
        </Suspense> }
        <div className="mt-5 flex w-full justify-center">
         <Pagination totalPages={totalPages} /> *
      </div>

      <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>

    </div>
  
  );
}