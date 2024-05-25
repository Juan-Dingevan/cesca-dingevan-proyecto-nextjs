'use server';


import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


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
const CreateProduct = FormSchema.omit({ id: true, date_added: true });

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

  //export async function createInvoice(prevState: State, formData: FormData) {
    export async function createProduct(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateProduct.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      category: formData.get('category'),
      vegan: Boolean(formData.get('vegan')),
      gluten_free: Boolean(formData.get('gluten_free')),
      img_link: formData.get('img_link'),
    });
    
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Product.',
      };
    }
   
    // Prepare data for insertion into the database
    const { name, description, price, category, vegan, gluten_free, img_link } = validatedFields.data;
    const priceInCents = price * 100;
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
    await sql`
        INSERT INTO ventanita.products (name, description, price, category, vegan, gluten_free, date_added, img_link)
        VALUES (${name}, ${description}, ${priceInCents}, ${category}, ${vegan}, ${gluten_free}, ${date}, ${img_link})
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
    console.log("here4");
   
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/admin');
    redirect('/admin');
  }
  export async function deleteProduct(id: string) {
    //throw new Error('Failed to Delete Invoice');
    try {
        await sql`DELETE FROM ventanita.products WHERE id = ${id}`;
        revalidatePath('/admin');
    }catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
      }
  }
