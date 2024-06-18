import SearchBar from './SearchBar';
import DesktopForm from './DesktopForm';
import MobileForm from './MobileForm';
import GoToCart from './GoToCart';

export default function ShopNavBar() {
    return (
        <div className={`
            bg-slate-100
            p-8
            border-lime-600
            border-solid
            md:border-r-2
            md:border-b-0
            border-b-2
            md:h-screen
            flex
            flex-col
            justify-between
        `}>
            <SearchBar />
            
            <div className="hidden md:block">
                <DesktopForm />
            </div>
            
            <div className="md:hidden">
                <MobileForm />
            </div>
            
            <GoToCart />    
        </div>
    );
}