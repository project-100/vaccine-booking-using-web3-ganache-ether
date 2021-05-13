import React from "react"
import { Link } from "react-router-dom"
import "../../src/Style.css"
function navbar(){
    return(
        <div className="nav" style={{textAlign:"right"}}>
         <Link to="/register"  >admin</Link >
 
        </div>
    )
}

export default navbar;