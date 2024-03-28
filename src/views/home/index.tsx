// Next, React
import { FC, useEffect, useState } from "react";
import { SendTransaction } from "components/SendTransaction";
import Logo from "../../assets/smoleup.gif";
import x from "../../assets/x.png";
import smolelist from "../../assets/smolelist.gif";
import Image from "next/image";
import { Timer } from "components/Timer";


export const HomeView: FC = ({}) => {

  return (
    <div className="flex-1 justify-center items-center p-4">
      <div className="flex flex-col justify-center items-center">
        <Image className="w-96" alt="$Dino Logo" src={Logo} />
        <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
          <p className="uppercase py-2">$smole - smolecoin</p>
          <p className="text-slate-500 py-2 text-xl leading-relaxed">
            a smol mole and the smollest smolecoin in the smolana smolnet
          </p>
        </h4>
        <Timer timer={550}/>
        <div className="flex flex-col my-4">
          <SendTransaction />
        </div>
        <Image className="" alt="$Dino Logo" src={x} />
        <Image
          className=" absolute bottom-0 left-0"
          alt="$Dino Logo"
          src={smolelist}
        />
      </div>
    </div>
  );
};
