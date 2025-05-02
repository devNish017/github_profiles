import { useState,useEffect,useCallback } from "react";
import ReactDOM from "react-dom/client";
import Header from "./component/header";
import Body from "./component/body";

function Gitprofile(){


    return(
   
        <>
        <Header></Header>
        
        <Body></Body>
        
        </>

    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Gitprofile></Gitprofile>)
