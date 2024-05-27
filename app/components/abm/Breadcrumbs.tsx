import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex text-xl md:text-2xl font-serif">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active ? "page" : undefined}
            className={breadcrumb.active ? 'text-gray-900' : 'text-gray-500'}
          >
            <Link href={breadcrumb.href}>
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-3 inline-block">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}