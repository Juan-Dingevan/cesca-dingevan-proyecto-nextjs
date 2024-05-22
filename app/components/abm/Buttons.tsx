import React from 'react';
import Link from 'next/link';

export function CreateProduct() {
    return (
      <Link
        href="/admin/create"
        className="flex h-10 items-center rounded-lg bg-lime-600 px-4 text-sm font-medium text-white transition-colors ease-in-out duration-500 hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"      >
        <span className="hidden md:block">Create Product</span>{' '}
      </Link>
    );
  }