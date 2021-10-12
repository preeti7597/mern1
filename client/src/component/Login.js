import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import  { UserContext } from "../App";

const Login = () => {

  const {state, dispatch} = useContext(UserContext);
  
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const loginUser = async (e) => {
     
      e.preventDefault();

      const res = await fetch("/signin", {
        method:"POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
             email,
             password
        })
      });

      const data = await res.json();
        if (res.status === 400 || !data){
          window.alert("Invalid Credentials");
        }else{

          dispatch({type:"USER", payload:true})
          window.alert(" Login successful");
          history.push("/");
        }
    }

  return (
    <>
       <div className="container-fluid main_header pt-5">
        <div className="row">
            <div className="col-md-6 col-12 mx-auto">
                <div className="row border">

                  
                    <div className="col-md-5 col-12 main_header_right">
                        <figure className="pt-5 pl-3">
                            <img src="./images/log.png" alt="about" className="img-fluid pt-5" title="about"/>
                        </figure>
                        <NavLink className="signupLinkL" to="/signup">Create an Account </NavLink>
                    </div>
               
            <div className="col-md-7 col-12 main_header_left">
              
                <div className="card-body p-md-5">  
                  <h3 className="login-heading mb-5 text-uppercase"> Login form </h3>  
                  <form  method="POST" className="form" id="form">
                      <div className="form-outline mb-1"> 
                        Email ID  
                          <input type="text" id="email"  name="email" className="form-control form-control-lg"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                          />   
                      </div>  
                      
                        <div className="form-outline">
                          Password  
                            <input type="text" id="password" name="password" className="form-control form-control-lg"
                             value={password} 
                              onChange={(e) => setPassword(e.target.value)}
                               />          
                        </div>     
      
                      <div className="d-flex justify-content-center pt-4">               
                        <input type="submit" className="btn btn-warning btn-md ms-2" value="Login"
                          onClick={loginUser}
                        /> 
                      </div> 
                  </form>

              </div>               
            </div>
          </div>              
        </div>
      </div>
    </div>


    </>
  );
}

export default Login;