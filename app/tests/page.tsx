import React from 'react'
import ProductCard from '../components/shop/ProductCard'

const TestsPage = async () => {
    return (
        <>
            <ProductCard />
        </>
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