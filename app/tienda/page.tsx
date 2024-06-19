import ShopNavBar from '../components/shop/navigation/ShopNavBar';
import ProductDisplay from '../components/shop/ProductDisplay';
import ShoppingCartDisplay from '../components/cart/ShoppingCartDisplay';

export default async function TestPage({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      categories?: string;
      page?: string;
    };
  })
{
    const query = searchParams?.query || '';
    const categories = searchParams?.categories || '';
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div className="flex flex-col md:grid md:grid-cols-5 h-screen">
            <div className='order-1 md:col-span-1 md:order-1'>
                <ShopNavBar />
            </div>
            <div className='order-3 md:col-span-4 md:order-2'>
                <ProductDisplay query={query} categories={categories} currentPage={currentPage}/>
            </div>
        </div>
    )
}

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