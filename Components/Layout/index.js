import React from "react";
import NavScrollExample from "../Navbar/Navbar";

export default function Layout({children}){
    return(
        <>
            <NavScrollExample UName={'Darshan'}/>
            {children}
        </>
    )
}