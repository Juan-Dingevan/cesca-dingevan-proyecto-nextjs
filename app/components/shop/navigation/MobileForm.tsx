import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import CategoryCheckbox from './CategoryCheckbox';

export default function MobileForm() {
    return (
        <form>
            <Accordion type="multiple">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Café</AccordionTrigger>
                    <AccordionContent>
                        <CategoryCheckbox text={'Espresso'} category={'espresso_drink'} />
                        <CategoryCheckbox text={'Filtrados'} category={'filter_drink'} />
                        <CategoryCheckbox text={'Con leche'} category={'milk_drink'} />
                        <CategoryCheckbox text={'Fríos'} category={'iced_drink'} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Té</AccordionTrigger>
                    <AccordionContent>
                        <CategoryCheckbox text={'Tés'} category={'tea'} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Para comer...</AccordionTrigger>
                    <AccordionContent>
                        <CategoryCheckbox text={'Tortas'} category={'cake'} />
                        <CategoryCheckbox text={'Sandwiches'} category={'sandwich'} />
                        <CategoryCheckbox text={'Laminados'} category={'pastry'} />
                        <CategoryCheckbox text={'Cookies'} category={'cookie'} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </form>
    )
}