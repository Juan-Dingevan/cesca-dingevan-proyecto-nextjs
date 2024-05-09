import Image from "next/image";
import LogoCard from "./components/welcome/LogoCard";
import Quote from "./components/welcome/Quote";
import LinkBar from "./components/welcome/LinkBar";

export default function Home() {
  return (
    <div className={"w-screen h-screen bg-slate-100 py-4"}>
      <div className={"flex justify-evenly"}>
        <div className="hidden md:block">
          <Image 
            src="/beans_right.png" 
            alt="Granos de café" 
            width="318" 
            height="320"
            draggable="false"
            className={"absolute bottom-0 left-0"}
          />
        </div>
        
        <div className={"grid justify-items-center items-center"}>
          <LogoCard/>
          <Quote text={"Coffee & Sweets"}/>
          <LinkBar/>
        </div>

        <div className="hidden md:block">
          <Image 
            src="/beans_left.png"
            alt="Granos de café"
            width="388"
            height="409"
            draggable="false"
            className={"absolute top-0 right-0"}
          />
        </div>  
      </div>
    </div>
  );
}
