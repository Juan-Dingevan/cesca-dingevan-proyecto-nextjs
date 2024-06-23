const { db } = require('@vercel/postgres');

coffees = [
    {
      name: 'espresso',
      description: 'Bebida intensa de 30ml, de cuerpo fuerte y sabor audaz.',
      price: 200,
      category: 'espresso_drink',
      vegan: true,
      gluten_free: true,
      date_added: '12-19-2023',
      img_link: 'https://res.cloudinary.com/dppaqcnzk/image/upload/f_auto,q_auto/jvnr87edkhtexvps6lx6'
    },
    {
      name: 'americano',
      description: 'Un shot de espresso diluido con agua caliente. Recomfortante e ideal a toda hora.',
      price: 350,
      category: 'espresso_drink',
      vegan: true,
      gluten_free: true,
      date_added: '10-21-2023',
      img_link: 'https://res.cloudinary.com/dppaqcnzk/image/upload/f_auto,q_auto/itmax0yiztre9pkpqsbo'
    },
    {
      name: 'macchiato',
      description: 'Bebida delicada, un shot de espresso con una copo de espuma de leche encima.',
      price: 400,
      category: 'espresso_drink',
      vegan: false,
      gluten_free: true,
      date_added: '01-02-2023',
      img_link: 'https://res.cloudinary.com/dppaqcnzk/image/upload/f_auto,q_auto/t4uknk6tjx5mrd2t9gkl'
    },
    {
      name: 'macchiato grande',
      description: 'Bebida delicada, un shot de espresso doble con una fina capa de leche texturizada encima.',
      price: 500,
      category: 'espresso_drink',
      vegan: false,
      gluten_free: true,
      date_added: '03-04-2023',
      img_link: 'https://res.cloudinary.com/dppaqcnzk/image/upload/f_auto,q_auto/nagv7iy9ze3ijwnmr6pj'
    },
    {
      name: 'doppio',
      description: 'Un doble shot de espresso, de cuerpo fuerte y sabor audaz.',
      price: 350,
      category: 'espresso_drink',
      vegan: true,
      gluten_free: true,
      date_added: '05-05-2023',
      img_link: 'https://res.cloudinary.com/dppaqcnzk/image/upload/f_auto,q_auto/au4n0aiu3gwtidu0cyue'
    }
]
  

async function seedProducts(client) {
    try {
        const insertedProducts = await Promise.all(
            coffees.map(
            (coffee) => client.sql`
                INSERT INTO ventanita.products (name, description, price, category, vegan, gluten_free, date_added, img_link)
                VALUES (
                    ${coffee.name}, 
                    ${coffee.description}, 
                    ${coffee.price}, 
                    ${coffee.category},
                    ${coffee.vegan},
                    ${coffee.gluten_free},
                    ${coffee.date_added},
                    ${coffee.img_link}
                )
                ON CONFLICT (id) DO NOTHING;`,
            ),
        );

    console.log(`Seeded ${insertedProducts.length} invoices`);

    return insertedProducts;

    } catch (error) {
        console.error('Error seeding products:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();
    await seedProducts(client)
    await client.end();
}

main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });