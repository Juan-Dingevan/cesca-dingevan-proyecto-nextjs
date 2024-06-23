import Link from "next/link";
export default function VentanitaLink({text, url}: {text: string, url: string}) {
    return (
        <Link
          href={url}
          className="text-white text-lg bg-lime-600 hover:bg-lime-500 focus:ring-2 focus:outline-none focus:ring-lime-300 rounded-lg px-5 py-2.5 text-center hover:transition-colors ease-in-out duration-500"
        >
          {text}
        </Link>
    );
};