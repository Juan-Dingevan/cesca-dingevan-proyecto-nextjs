import Image from "next/image";
export default function Home() {
    return (
        <div className={
                    "bg-lime-600 "
                    + "rounded-3xl "
                    + "p-8 "
                    + "grid "
                    + "justify-items-center "
                    + "items-center"
        }>
            <Image 
                src="/ventanita.svg"
                alt={"Logo vectorizado de La Ventanita"}
                width={200}
                height={200}
            />
            <p className="text-4xl font-bold text-white ">
                La Ventanita
            </p>
        </div>
    );
}