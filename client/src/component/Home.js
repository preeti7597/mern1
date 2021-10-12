import React, { useEffect, useState } from "react";

const Home = () => {

  const [username, setusername] = useState('');

  const [show, setShow] = useState(false);

  const userHome = async () => {
      try{
          const res = await fetch("/getdata", {
            method:"GET",
            headers: {
              "Content-Type" : "application/json"
            },
          });

        const data = await res.json();
          setusername(data.name);
          setShow(true);

      }catch(err){
        console.log(err);
      }
  }

  useEffect(() => {
    userHome();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="home-div ">
          <p>Welcome!!</p>
          <h1><span className="preweb">{username}</span></h1>
          <h3>{ show ? 'Happy to see you ' : ' Welcome to PreeWEB'}</h3>
        </div>
      </div>
    </>
  );
}

export default Home;