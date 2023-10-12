import {Heading} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import "@/components/Header.css";


const BurgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15">
        <path fill="currentColor" fill-rule="evenodd" d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1h-12ZM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5Zm0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5Z" clip-rule="evenodd"/>
    </svg>
);


export default function Menu(){

    const[Burger, setBurger] = useState(false);

    function Handler() {
        setBurger(Burger === false ? true : false );
    }

    return(
        <BurgerIcon />
    )
 }