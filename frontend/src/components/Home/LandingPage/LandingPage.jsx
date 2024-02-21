import "./LandingPage.css";
import React, { useEffect } from "react";
// import { Preferences } from "@capacitor/preferences";
import loginLogo from "../../../assets/images/fulllogo.gif";
// import loginLogo from "../../../assets/images/full_new.gif";
// import Rajsthan from "../../../assets/images/tagline.gif";
// import Election from "../../../assets/images/headintro.gif";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    //  Preferences.clear();
    // Redirect to /login after 5 seconds
    const timer = setTimeout(async () => {
      // const userDataResult = await Preferences.get({ key: "userData" });
      // const userData = JSON.parse(userDataResult.value);
      // if (userData === null) {
        // history.push("/role");
      // } else {
        // history.push(`/${userData.role}/home`);
      // }
      navigate("/home");
      // console.log(userData)
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div id="landingPage">
      {/* <div class="image-container">
        <img src={Rajsthan} alt="Image 1" class="left-image" />
        <img src={Election} alt="Image 2" class="right-image" />
      </div> */}
      <div
        id="login"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height:'100vh'
        }}
      >
        <img src={loginLogo} width={"30%"} alt="logo" class="" />
        {/* <br/>
        <div>
          <div style={{ color: "#2dabfc", fontSize: "23px" }}>SAHAJ</div>
          <div style={{ color: "#04d39d", fontSize: "25px" }}>Bhilwara</div>
          <div style={{ color: "#2dabfc", fontSize: "30px" }}>Rajasthan</div>
        </div> */}
      </div>
    </div>
  );
}

export default LandingPage;
