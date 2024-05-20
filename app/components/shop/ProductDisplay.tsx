import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import ProductCard from './ProductCard';
import { fetchFilteredProducts } from '@/app/lib/data';

export default async function ProductDisplay({
    query,
    categories,
    currentPage,
  }: {
    query: string;
    categories: string;
    currentPage: number;
  }) 
{
    noStore();

    //const data = await sql<Product>`SELECT * FROM ventanita.products`;
    //const coffees = data.rows;
    const coffees = await fetchFilteredProducts(query, categories, currentPage)

    coffees.map((coffee) => console.log(coffee))

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            {coffees.map(
                (coffee) => <ProductCard key={coffee.id} product={coffee} />
            )}
        </div>
    )
}