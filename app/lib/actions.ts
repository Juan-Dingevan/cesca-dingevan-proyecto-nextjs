'use server';

import {MercadoPagoConfig, Preference} from "mercadopago";
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CartProduct } from './types';
import { signIn } from '@/auth';
import { AuthError } from "next-auth";
import cloudinary from "./cloudinary";
import { fail } from "assert";


//observar tipos de datos (gluten_free, vegan)
const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  description: z.string(),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  category: z.string({
    invalid_type_error: 'Please select a category.',}),
  vegan: z.boolean(),
  gluten_free: z.boolean(),
  //date_added: z.Date(),
  date_added: z.string(),
  img_link: z.string(),
});
 
//const CreateProduct = FormSchema.omit({ id: true, date_added: true });
const CreateProduct = FormSchema.omit({ id: true, date_added: true, img_link: true});

export type State = {
    errors?: {
      //name?: string[];
      //description?: string[];
      //price?: string[];
      //category?: string[];
      //vegan?: string[];
      //gluten_free?: string[];
      //img_link?: string[];
    };
    message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    category: formData.get('category'),
    vegan: Boolean(formData.get('vegan')),
    gluten_free: Boolean(formData.get('gluten_free')),
    //img_link: formData.get('img_link'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }
  
  // Prepare data for insertion into the database
  const { name, description, price, category, vegan, gluten_free } = validatedFields.data;
  const priceInCents = price * 100;
  const date = new Date().toISOString().split('T')[0];

  const img = formData.get('picture') as File
  let img_link = ""

  if(img) {
    img_link = await uploadToCloudinary(img);
  } else {
    img_link = formData.get('img_link') as string
  }

  // Insert data into the database
  try {
    await sql`
        INSERT INTO ventanita.products (name, description, price, category, vegan, gluten_free, date_added, img_link)
        VALUES (${name}, ${description}, ${priceInCents}, ${category}, ${vegan}, ${gluten_free}, ${date}, ${img_link})
      `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/admin');
  redirect('/admin');
}

async function uploadToCloudinary(img: File) {
  // No es el código más limpio del mundo.

  console.log("1")

  // Obtenemos el reader de la imagen como tal
  // No podemos usar el FileReader() porque estamos
  // en Node, y no en un navegador.
  const imageReader = img.stream().getReader();
  
  console.log("2")

  // Creamos un arreglo de bytes (unisgned ints de 8 bits)
  // Sobre el cual copiaremos los bytes de la imagen
  const imageDataU8: number[] = [];
  
  console.log("3")

  // Poblamos el arreglo
  while (true) {
    const { done, value } = await imageReader.read();

    if (done)
      break;
    
    // @ts-ignore
    imageDataU8.push(...value);
  }

  console.log("4")

  // Creamos el buffer de la imagen a partir de los bytes
  // @ts-ignore
  const byteArrayBuffer = Buffer.from(imageDataU8, 'binary');

  console.log("5")

  // Hacemos la llamada a la API de cloudinary
  // Las llamadas con buffer de datos (en vez de links de
  // imagenes) son asincrónicas, así que le hacemos un wrap
  // en una promesa, y la esperamos
  const uploadResult = await new Promise((resolve) => {
    cloudinary.uploader.upload_stream((error, uploadResult) => {
      return resolve(uploadResult);
    }).end(byteArrayBuffer);
  });

  console.log("6")

  //console.log(uploadResult)

  // Finalmente, obtenemos el link de la imagen como la
  // URL devuelta por el pedido a la API de cloudinary
  const img_link = (uploadResult as any).url;

  return img_link;
}

export async function deleteProduct(id: string) {
    //throw new Error('Failed to Delete Invoice');
    try {
        await sql`DELETE FROM ventanita.products WHERE id = ${id}`;
        revalidatePath('/admin');
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}

const UpdateProduct = FormSchema.omit({ id: true, date_added: true, img_link: true });

export async function updateProduct(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateProduct.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    category: formData.get('category'),
    vegan: Boolean(formData.get('vegan')),
    gluten_free: Boolean(formData.get('gluten_free')),
  });

   
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  
  const { name, description, price, category, vegan, gluten_free} = validatedFields.data;
  const priceInCents = price * 100;


  const img = formData.get('picture') as File
  let img_link = ""


  if(img) {
    img_link = await uploadToCloudinary(img);
  } else {
    img_link = formData.get('img_link') as string
  }
   
  try {
    await sql`
      UPDATE ventanita.products
      SET name = ${name}, description = ${description}, price = ${priceInCents}, category = ${category}, vegan = ${vegan}, gluten_free = ${gluten_free}, img_link = ${img_link} 
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
   
  revalidatePath('/admin');
  redirect('/admin');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function payment(
  cart: CartProduct[],
  name: string
) {

  const client = new MercadoPagoConfig({accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!});

  const cartItemsFormatted = cart.map(item => ({
    id: item.id,
    title: item.name,
    quantity: item.quantity,
    unit_price: item.price / 100
  }));

  // Armamos el preference de mp
  // lanzamos el sandbox
  // y despues vemos que hacemos para que el usuario vuelva a
  // donde estaba antes 
  // ver https://github.com/goncy/donancy/blob/main/src/app/page.tsx
  // y https://www.youtube.com/watch?v=LhqDshOTipo

  let redirectPath: string | null = null
  let rootPath = ""

  if(process.env.NODE_ENV === 'development') {
    rootPath = "localhost:3000"
  } else {
    rootPath = "https://la-ventanita-cafe.vercel.app"
  }

  const successPath = rootPath + "/pagos/exito"
  const failurePath = rootPath + "/pagos/error"
  const pendingPath = rootPath + "/pagos/pendiente"

  try {
    const preference = await new Preference(client).create({
      body: {
        payment_methods: {
          excluded_payment_methods: [],
          excluded_payment_types: [
            {
              id: "ticket"
            }
          ],
          installments: 1
        },

        items: cartItemsFormatted,

        back_urls: {
          "success": successPath,
          "failure": failurePath,
          "pending": pendingPath
        },

        auto_return: "approved"
      },
    });
    
    redirectPath = preference.sandbox_init_point!
  } catch (error) {
    console.log(error)
    return { message: 'Mercadopago Error: Failed to create preference.' };
  }

  if(redirectPath)
    redirect(redirectPath);
}