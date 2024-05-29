import { sql } from '@vercel/postgres';
import { ProductForm } from './types';
import { unstable_noStore as noStore } from 'next/cache';


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
export async function fetchFilteredProductsTable(
    query: string,
    currentPage: number,
){
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    /*
        Hay 3 posibilidades:
            - categories no especificado                       -> no retornamos nada: si no hay categorias, nunca habra matches
            - name no especificado, categories especificado    -> retornamos todo lo que haga match con categories
            - name especificado, categories especificado       -> retornamos todo lo que haga match con ambas
    */


    let q = ""

    try {
        if(!query) {
            // Why do we use sql.query() instead of the "normal"
            // back-tick string notation? Well, because that one
            // didn't work!
            // Se explanation in https://stackoverflow.com/questions/76862758/dynamically-building-a-sql-query-postgres-and-javascript


            const products = await sql.query(`
            SELECT 
                * 
            FROM 
                ventanita.products 
            `);

            return products.rows
        }

        if(query) {
            q = `
                SELECT 
                    * 
                FROM 
                    ventanita.products 
                WHERE 
                    (
                        ventanita.products.name ILIKE ${`%${query}%`} OR
                        ventanita.products.description ILIKE ${`%${query}%`}
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
export async function fetchProductById(id: string) {
    noStore();
    try {
      const data = await sql<ProductForm>`
        SELECT
          ventanita.products.id,
          ventanita.products.name,
          ventanita.products.description,
          ventanita.products.price,
          ventanita.products.category,
          ventanita.products.vegan,
          ventanita.products.gluten_free,
          ventanita.products.img_link
        FROM ventanita.products
        WHERE ventanita.products.id = ${id};
      `;
      
  
      const product = data.rows.map((product) => ({
        ...product,
        // Convert amount from cents to dollars
        price: product.price / 100,
      }));
  
      console.log(product[0]); // Invoice is an empty array []
      return product[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch invoice.');
    }
  }
  export async function fetchProductsPages(query: string) {
    noStore();
    try {
        if(!query) {
            const count = await sql` SELECT 
            COUNT(*) 
        FROM 
            ventanita.products `;
            const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
            return totalPages;
        }else{
            const count = await sql` SELECT 
            COUNT(*)
        FROM
            ventanita.products
        WHERE
            (
                ventanita.products.name ILIKE ${`%${query}%`} OR
                ventanita.products.description ILIKE ${`%${query}%`}
            )`;
            const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
            return totalPages;
        }
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of invoices.');
    }
  }

 