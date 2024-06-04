'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import { Button } from '../components/abm/CreateButton';


export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    /*
        PENDIENTES:
            - Pasar el formulario a su propio componente
            - Darle lindo estilo
            - Mostrar el error de manera agraciada
    */

    return (
        <form className="flex flex-col" action={dispatch}>
            <label>
                <p>email</p>
                <input type="email" name="email"/>
            </label>
            <label>
                <p>contraseña</p>
                <input type="password" name="password"/>
            </label>
            <LoginButton />
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();
   
    return (
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Entrar
      </Button>
    );
  }