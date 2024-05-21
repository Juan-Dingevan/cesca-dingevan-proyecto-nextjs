import { unstable_noStore as noStore } from 'next/cache';
import ProductCard from './ProductCard';
import { fetchFilteredProducts, numberOfPagesNeededForProducts } from '@/app/lib/data';
import Pagination from './Pagination';

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
    const products = await fetchFilteredProducts(query, categories, currentPage)
    const totalPages = await numberOfPagesNeededForProducts(query, categories)

    return (
        <div className='py-4 flex-col'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
                {products.map(
                    (product) => <ProductCard key={product.id} product={product} />
                )}
            </div>
            <div className="mt-3 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}