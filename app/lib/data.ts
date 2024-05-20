import { sql } from '@vercel/postgres';

/*
    The CATEGORY field in the ventanita.products 
    table can take one of the following values:
        COFFEE:
            - espresso_drink
            - filter_drink
            - iced_drink
            - milk_drink
        TEA:
            - tea
        FOOD:
            - cake
            - pastry
            - sandwich
            - cookie
*/

const ITEMS_PER_PAGE = 3;
export async function fetchFilteredProducts(
    query: string,
    categories: string,
    currentPage: number,
){


    const categoriesArray = categories.split('-');
    const categoryQuery = categoriesArray.map(category => `ventanita.products.category ILIKE '%${category}%'`).join(' OR ');

    /*
        Hay 4 posibilidades:
            - name no especificado, categories no especificado -> retornamos todo
            - name especificado, categories no especificado    -> retornamos lo que haga match con name
            - name no especificado, categories especificado    -> retornamos todo lo que haga match con categories
            - name especificado, categories especificado       -> retornamos todo lo que haga match con ambas
    */

    const conditions = categoriesArray.map(c => `ventanita.products.category ILIKE ${`'%${c}%'`}`)

    let q = ""

    try {
        if(!query && !categories) {
            const products = await sql<Product>`SELECT * FROM ventanita.products`;
            return products.rows
        }
        
        if (query && !categories) {
            const products = await sql<Product>`
                SELECT 
                    * 
                FROM 
                    ventanita.products 
                WHERE 
                    ventanita.products.name ILIKE ${`%${query}%`} OR
                    ventanita.products.description ILIKE ${`%${query}%`}
                `;
            return products.rows
        }

        if(!query && categories) {
            // Why do we use sql.query() instead of the "normal"
            // back-tick string notation? Well, because that one
            // didn't work!
            // Se explanation in https://stackoverflow.com/questions/76862758/dynamically-building-a-sql-query-postgres-and-javascript

            const products = await sql.query(`
            SELECT 
                * 
            FROM 
                ventanita.products 
            WHERE ${conditions.join(` OR `)}`);

            return products.rows
        }

        if(query && categories) {
            q = `
            SELECT 
                * 
            FROM 
                ventanita.products 
            WHERE 
                (
                    ventanita.products.name ILIKE ${`%${query}%`} OR
                    ventanita.products.description ILIKE ${`%${query}%`}
                ) AND (
                    ${conditions.join(` OR `)}
                ) 
            `;

            const products = await sql.query(`
                SELECT 
                    * 
                FROM 
                    ventanita.products 
                WHERE 
                    (
                        ventanita.products.name ILIKE ${`'%${query}%'`} OR
                        ventanita.products.description ILIKE ${`'%${query}%'`}
                    ) AND (
                        ${conditions.join(` OR `)}
                    ) 
                `);
            return products.rows    
        }

        return []

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch products - ' + q);
    }
}