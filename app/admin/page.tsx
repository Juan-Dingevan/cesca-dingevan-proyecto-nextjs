import React from 'react'

import {CreateProduct} from '../components/abm/Buttons'
import Search from '@/app/components/abm/SearchProduct'
import { Suspense } from 'react';
import { ProductsTableSkeleton } from '@/app/components/skeletons';
import ProductsTable from '@/app/components/abm/Table';



 
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
  //const totalPages = await fetchInvoicesPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
         <Search placeholder="Search products..." />
        <CreateProduct/>
        </div>
        {<Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}> 
        <ProductsTable query={query} currentPage={currentPage} />
  </Suspense> }
 

    </div>
  
  
  );
}