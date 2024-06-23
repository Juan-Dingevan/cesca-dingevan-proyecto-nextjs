import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
    const { category } = params;

    try {
        const result = await sql.query(`
            SELECT
                    * 
            FROM 
                ventanita.products
            WHERE
                category = $1
        `, [category]);
        
        const productos = result.rows;
        return NextResponse.json({ productos });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}
