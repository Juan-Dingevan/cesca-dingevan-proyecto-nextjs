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
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const categoriesArray = categories.split('-');

    /*
        Hay 3 posibilidades:
            - categories no especificado                       -> no retornamos nada: si no hay categorias, nunca habra matches
            - name no especificado, categories especificado    -> retornamos todo lo que haga match con categories
            - name especificado, categories especificado       -> retornamos todo lo que haga match con ambas
    */

    const conditions = categoriesArray.map(c => `ventanita.products.category ILIKE ${`'%${c}%'`}`)

    let q = ""

    try {
        if(!categories) {
            return []
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
            WHERE ${conditions.join(` OR `)}
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
            `);

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
                LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
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
                LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
            `);
            return products.rows    
        }

        return []

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch products - ' + q);
    }
}

export async function countFilteredProducts(
    query: string,
    categories: string,
){
    const categoriesArray = categories.split('-');

    /*
        Hay 3 posibilidades:
            - categories no especificado                       -> no retornamos nada: si no hay categorias, nunca habra matches
            - name no especificado, categories especificado    -> retornamos todo lo que haga match con categories
            - name especificado, categories especificado       -> retornamos todo lo que haga match con ambas
    */

    const conditions = categoriesArray.map(c => `ventanita.products.category ILIKE ${`'%${c}%'`}`)

    try {
        if(!categories) {
            return 0
        }

        if(!query && categories) {
            // Why do we use sql.query() instead of the "normal"
            // back-tick string notation? Well, because that one
            // didn't work!
            // Se explanation in https://stackoverflow.com/questions/76862758/dynamically-building-a-sql-query-postgres-and-javascript

            const products = await sql.query(`
                SELECT 
                    COUNT(*) 
                FROM 
                    ventanita.products 
                WHERE ${conditions.join(` OR `)}
            `);

            return products.rows[0].count
        }

        if(query && categories) {
            const products = await sql.query(`
                SELECT 
                    COUNT(*) 
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

            return products.rows[0].count    
        }

        return 0
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch number of products - ');
    }
}

export async function numberOfPagesNeededForProducts(
    query: string,
    categories: string,
){
    const numberOfProducts = await countFilteredProducts(query, categories)
    const totalPages = Math.ceil(Number(numberOfProducts) / ITEMS_PER_PAGE);
  
    console.log("numberOfProducts = " + numberOfProducts)

    return totalPages;
}