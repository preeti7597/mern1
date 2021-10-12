import React, { useState } from "react";
import { NavLink , useHistory} from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const[user,setUser] = useState(
    {
       name:"",
       email:"",
       course:"",
       phone:"",
       address:"",
       password:"",
       confirmpassword:""
    });

let name, value;

const handleInputs = (e) => {
   console.log(e);
    name = e.target.name;
    value = e.target.value;
 
  setUser({...user, [name]:value});
}


const PostData = async (e) => {
  e.preventDefault();
 const { name, email, course, phone, address, password, confirmpassword } = user;

 const res = await fetch("/register", {
   method: "POST",
   headers: {
     "Content-Type" : "application/json"
   },
   body: JSON.stringify({
        name, email, course, phone, address, password, confirmpassword
   })
 });


 const data = await res.json();
  if(data.status === 422 || !data){
    window.alert("Invalid Registration");
    console.log("Invalid Registration");
  }
  else{
    window.alert(" Registration successful");
    console.log(" Registration successful");

    history.push("/login");
  }
}

  return (
    <>

    <div className="container-fluid main_header pt-5">
        <div className="row">
            <div className="col-md-8 col-12 mx-auto">
                <div className="row border">

                  
                    <div className="col-md-6 col-12 main_header_right">
                        <figure className="pt-5">
                            <img src="./images/pg.jpg" alt="about" className="img-fluid pt-5" title="about"/>
                        </figure>
                        <NavLink className="sloginLink" to="/login">Already have an Account? </NavLink>
                    </div>
          
            <div className="col-md-6 col-12 main_header_left">
           
                <div className="card-body p-md-3">  
                  <h3 className="registration mb-2 text-uppercase ">Registration</h3>  
                  
              <form method="POST" className="register-form" id="register-form" >
                  <div className="form-outline mb-1"> 
                    Name
                    <input type="text" id="name"  name="name" className="form-control form-control-md"
                       value={user.name} 
                       onChange={handleInputs}
                     />   
                  </div>  

                  <div className="form-outline mb-1"> 
                    Email ID  
                    <input type="text" id="email"  name="email" className="form-control form-control-md"
                       value={user.email} 
                       onChange={handleInputs}
                     />   
                  </div>  

                  <div className="form-outline mb-1"> 
                    Course 
                    <input type="text" id="course"  name="course" className="form-control form-control-md"
                       value={user.course} 
                       onChange={handleInputs}
                     />   
                  </div>  
  
                  <div className="form-outline mb-1">
                    Phone Number   
                    <input type="text" id="phone"  name="phone" className="form-control form-control-md"
                       value={user.phone} 
                       onChange={handleInputs}
                    />    
                  </div>   
  
                  <div className="form-outline mb-1"> 
                    Address  
                    <input type="text" id="address"  name="address" className="form-control form-control-md"
                      value={user.address} 
                      onChange={handleInputs}
                    />   
                  </div> 
  
                  <div className="row">  
                    <div className="col-md-6 mb-1">  
                      <div className="form-outline">
                        Password  
                        <input type="text" id="password" name="password" className="form-control form-control-md"
                         value={user.password} 
                       onChange={handleInputs} />          
                      </div>  
                    </div>  
                    <div className="col-md-6 mb-1">  
                      <div className="form-outline">  
                         Confirm Password
                        <input type="text" id="confirmpassword"  name="confirmpassword" className="form-control form-control-md"
                         value={user.confirmpassword} 
                       onChange={handleInputs} />     
                      </div>  
                    </div>  
                  </div>   
  
                  <div className="d-flex justify-content-center pt-1">               
                    <input type="submit"  name="signup" id="signup" className="btn btn-warning btn-md ms-2" value="Register"
                      onClick={PostData}
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

export default Signup;