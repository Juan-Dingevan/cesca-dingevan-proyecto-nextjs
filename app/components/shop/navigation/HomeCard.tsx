import Image from "next/image";
import Link from "next/link";
export default function Home() {
    return (
        <Link 
            className={`
                bg-lime-600
                rounded-3xl
                mb-2
                p-1
                flex
                items-center
                items-center
                justify-center
            `} 
            href={"/"}
        >
            <Image 
                src="/ventanita.svg"
                alt={"Logo vectorizado de La Ventanita"}
                width={30}
                height={30}
            />
            <p className="text-lg font-bold text-white pl-2">
                La Ventanita
            </p>
        </Link>
    );
}