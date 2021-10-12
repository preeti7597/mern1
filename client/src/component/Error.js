import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
    return(
        <>
            <div className="error-page">
                <div className="error-div">
                    <h1>404</h1>
                    <h2 className="mb-5">We are sorry page not found!</h2>
                    <NavLink className="errorbtn" to="/">Back to Home</NavLink>
                </div>
            </div>
        </>
    )
}
export default Error;