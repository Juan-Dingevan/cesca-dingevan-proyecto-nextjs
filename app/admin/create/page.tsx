import React from 'react'
import Form from '../../components/abm/CreateForm'

 
export default async function CreatePage() {
 
  /*return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );*/
  return (
    <main>
      <Form/>
    </main>
  )
}