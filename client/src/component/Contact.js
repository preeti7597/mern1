import React, { useEffect, useState } from "react";
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';

const Contact = () => {
  
  const [userData, setuserData] = useState({
    name:"",
    email:"",
    phone:"",
    message:""
  });

  const userContact = async () => {
      try{
          const res = await fetch("/getdata", {
            method: "GET",
            headers: {
              "Content-Type" : "application/json"
            }
          });

        const data = await res.json();
          console.log(data);
          setuserData({...userData, name:data.name, email:data.email, phone:data.phone});

            if(!res.status === 200){
              const error = new Error(res.error);
              throw error;
            }
        
      }catch(err) {
        console.log(err);
      }
  }

  useEffect(() => {
    userContact();
  },[]);

 /*-------------storing data on states--------------------*/
 
 const handleInputs = (e) => {
   const name = e.target.name;
   const value = e.target.value;

   setuserData({...userData, [name]: value });

 }

 /*-------------send the data to backend--------------------*/
const contactForm = async (e) => {
   e.preventDefault();

   const {name, email, phone, message} = userData;

   const res = await fetch("/contact",{
              method:"POST",
              headers: {
                "Content-Type" : "application/json"
              },
              body: JSON.stringify({
                name, email, phone, message
              })  
            }); 

            const data = await res.json();
           
              if(!data){
                console.log("message not send");
              }else{
                alert("Message sent");
                setuserData({...userData, message:""});
              }
      }
  


  return (
    <>
        {/*-------------grid--------------------*/} 
        
            <div className="container ">
              <div className="row  ">

                <div className="col-sm grid">
                  <PhoneIcon/><span>Phone: {userData.phone}</span>
                </div>

                <div className="col-sm grid">
                  <EmailIcon/> <span>Email: {userData.email}</span>
                </div>

                <div className="col-sm grid">
                  <HomeIcon/> <span>Address: {userData.address}</span>
                </div>
              
              </div>
            </div>

            {/*-------------contact--------------------*/}    

            <div className="container mt-5">
              <div className="row">
                <div className="contact-col col-lg-10 col-md-10 mx-auto ">
                  <div className="contact-heading p-4">
                    Get in touch
                  </div>
             <form method="POST" className="conform">
                <div className="row">  
                  <div className="col-md-4 mt-4 mb-4">                      
                      <input type="text" id="name" name="name" className="form-control form-control-md" 
                      value={userData.name}
                      onChange={handleInputs}                      
                      placeholder="FullName" />                             
                  </div>  
                  <div className="col-md-4 mt-4 mb-4">                      
                      <input type="text" id="email"  name="email" className="form-control form-control-md" 
                      value={userData.email}
                      onChange={handleInputs}
                      placeholder="Email" />                          
                  </div>
                  <div className="col-md-4 mt-4 mb-4">                      
                      <input type="text" id="phone"  name="phone" className="form-control form-control-md" 
                      value={userData.phone}
                      onChange={handleInputs}
                      placeholder="Phone" />                          
                  </div>  
                </div> 
                
                <div className="form-group">
                     <textarea className="form-control" id="message" rows="3"
                      name="message"
                      value={userData.message} 
                      onChange={handleInputs}
                     placeholder="Message"></textarea>
                </div> 

                <div className="d-flex justify-content-center pt-3 pb-4"> 
                  <input type="submit" className="btn btn-warning btn-md ms-2" 
                  value="Send Message"
                  onClick={contactForm}
                  /> 
                </div>   
            </form>
                </div>
              </div>
            </div>

    </>
  );
}

export default Contact;