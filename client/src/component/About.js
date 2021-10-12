import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../images/user.png";

const About = () => {
  const history = useHistory();
  const [userData, setuserData] = useState({});

  const callAboutPage = async () => {
      try{
          const res = await fetch("/about", {
            method:"GET",
            headers: {
              Accept: "application/json",
              "Content-Type" : "application/json"
            },
            credentials : "include"              
          });

        const data = await res.json();
          setuserData(data);

            if(!res.status === 200){
              const error = new Error(res.error);
              throw error;
            }
        }
        catch(err){
        console.log(err);
        history.push("/login");
      }
  }

  useEffect(() => {
    callAboutPage();
  }, []);


  return (
    <>
    <div className="container mt-5">
    <form method="GET" className="form">
      <div className="row">
         <div className="contact-col col-lg-10 col-md-10 col-sm-10 mx-auto ">
            <div className="contact-heading pt-4 pb-5">DETAILS</div>              
                  
                    <div className="row">

                      <div className="col-md-4">
                        <img src={logo} alt="pic" className="img"/>
                      </div>

                      <div className="col-md-6">
                        <div className="heading">
                          <h5>{ userData.name }</h5>
                          <h6>{ userData.address }</h6>
                          <h6>{ userData.email }</h6>
                          <ul className="nav nav-tabs pt-5" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                            </li>
                             <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>
                    
                 {/*----------------next----------------*/}
                   
                  <div className="row">
                    <div className="col-md-4 ">
                        <div className="profile-Link pl-5 pb-4">
                          <p>WORK LINK</p>
                          <a href="https://www.instagram.com/" className="worklink" target="blank"> Instagram</a><br/>
                          <a href="https://www.youtube.com/" className="worklink" target="blank"> Youtube</a><br/>
                          <a href="https://twitter.com/" className="worklink" target="blank"> Twitter</a><br/>
                          <a href="https://www.facebook.com/" className="worklink" target="blank"> Facebook</a><br/>
                        </div>
                    </div>

                    <div className="col-md-8">
                      <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                          <div className="row mt-2">
                            <div className="col-md-6">
                                 Name
                            </div>
                            <div className="col-md-6">
                               { userData.name }
                            </div>
                          </div>

                          <div className="row mt-2">
                            <div className="col-md-6">
                                Course
                            </div>
                            <div className="col-md-6">
                               { userData.course }
                            </div>
                          </div>

                          <div className="row mt-2">
                            <div className="col-md-6">
                                Phone
                            </div>
                            <div className="col-md-6">
                              { userData.phone }
                            </div>
                          </div>

                        </div>
                      
                               {/*----------------profile--------------------------*/}

                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                          
                          <div className="row mt-2">
                            <div className="col-md-6">
                                Phone
                            </div>
                            <div className="col-md-6">
                              { userData.phone }
                            </div>
                          </div>

                          <div className="row mt-2">
                            <div className="col-md-6">
                                Name
                            </div>
                            <div className="col-md-6">
                             { userData.name }
                            </div>
                          </div>

                          <div className="row mt-2">
                            <div className="col-md-6">
                                Course
                            </div>
                            <div className="col-md-6">
                               { userData.course }
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>     
                  </div>
            
      </div>
    </div>
    </form>
  </div>
    </>
  );
}

export default About;
