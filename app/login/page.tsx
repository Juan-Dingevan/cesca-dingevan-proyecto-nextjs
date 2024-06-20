

import LoginForm from '../components/LoginForm'

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Log in | Admin | La Ventanita',
};




export default function LoginPage() {
    //const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    /*
        PENDIENTES:
            - Pasar el formulario a su propio componente
            - Darle lindo estilo
            - Mostrar el error de manera agraciada
    */

    return (
        <main className="flex items-center justify-center min-h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
            <div className="flex h-20 w-full items-end rounded-lg bg-lime-600 p-3 md:h-36">
                <div className="w-32 text-white md:w-36">
                    <p className="text-2xl font-bold text-white md:text-4xl">
                    La Ventanita
                    </p>
                </div>
            </div>
             <LoginForm />
        </div>
    </main>

    )
}

