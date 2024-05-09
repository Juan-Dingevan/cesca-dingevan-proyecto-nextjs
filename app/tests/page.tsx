import React from 'react'
import { sql } from '@vercel/postgres';

const TestsPage = async () => {
    let data = await sql`SELECT * FROM pg_catalog.pg_tables;`;

    return (
        <div>
            <p>Tests</p>
            <ul>
                {data.rows.map((row, index) => (
                    <li key={index}>{JSON.stringify(row)}</li>
                ))}
            </ul>
        </div>
    )
}

export default TestsPage