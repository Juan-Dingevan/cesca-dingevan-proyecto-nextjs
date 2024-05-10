import React from 'react'
import ProductCard from '../components/shop/ProductCard'
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

const TestsPage = async () => {
    noStore();

    const data = await sql<Product>`SELECT * FROM ventanita.products`;
    const coffees = data.rows;

    coffees.map((coffee) => console.log(coffee))

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            {coffees.map(
                (coffee) => <ProductCard product={coffee} />
            )}
        </div>
    )
}

export default TestsPage

/*
    let data = await sql`SELECT * FROM pg_catalog.pg_tables;`;
    <div>
        <p>Tests</p>
        <ul>
            {data.rows.map((row, index) => (
                <li key={index}>{JSON.stringify(row)}</li>
            ))}
        </ul>
    </div>
*/