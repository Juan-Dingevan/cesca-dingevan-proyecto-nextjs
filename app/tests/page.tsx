import React from 'react'
import ShopNavBar from '../components/shop/ShopNavBar';
import ProductDisplay from '../components/shop/ProductDisplay';
import ShoppingCart from '../components/shop/ShoppingCart';

export default async function TestPage({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      categories?: string;
      page?: string;
    };
  })
{
    const query = searchParams?.query || '';
    const categories = searchParams?.categories || '';
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div className="flex flex-col md:grid md:grid-cols-12 h-screen">
            <div className='order-1 md:col-span-2 md:order-1'>
                <ShopNavBar />
            </div>
            <div className='order-3 md:col-span-9 md:order-2'>
                <ProductDisplay query={query} categories={categories} currentPage={currentPage}/>
            </div>
            <div className='order-2 md:col-span-1 md:order-3'>
                <ShoppingCart />
            </div>
        </div>
    )
}

/*
    noStore();

    const data = await sql<Product>`SELECT * FROM ventanita.products`;
    const coffees = data.rows;

    coffees.map((coffee) => console.log(coffee))

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            {coffees.map(
                (coffee) => <ProductCard key={coffee.id} product={coffee} />
            )}
        </div>
    )
*/