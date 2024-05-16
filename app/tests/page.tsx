import React from 'react'
import ProductCard from '../components/shop/ProductCard'
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import ShopNavBar from '../components/shop/ShopNavBar';

const TestsPage = async () => {
    return (
        <div className="grid grid-cols-1">
            <ShopNavBar />
        </div>
    )
}

export default TestsPage

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