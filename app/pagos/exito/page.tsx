import { Metadata } from 'next';
import SuccessfulPayment from './SuccessfulPayment';
 
export const metadata: Metadata = {
  title: 'Éxito | La Ventanita',
};


export default function PagoExitoso() {
    return (
        <SuccessfulPayment />
    )
}