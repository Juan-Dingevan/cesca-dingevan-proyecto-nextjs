import VentanitaLink from "@/app/components/welcome/VentanitaLink";

export default function LinkBar() {
    return (
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:items-center">
        <VentanitaLink text='Tienda' url='/tienda'/>
        <VentanitaLink text='Admin' url='/admin'/>
      </div>
    );
};