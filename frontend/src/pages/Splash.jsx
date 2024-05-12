import React from 'react';
import '../styles/splash.css'
import Logo from "../assets/images/logo.png";

const Splash = () => {
  return (   
    <div class="banner-splash">
      <div class="content-splash">
            <h2>Welcome to</h2>
            <h1>EcoLite</h1>
            <p style={{fontFamily:"Arial, Helvetica, sans-serif"}}>The best online garbage recycling platform</p>
            <div className="img-container-splash">
            <img src={Logo} class="image-splash"/>
            </div> 
            <a href="/landing">
             <button type="button" class="button-splash"><span></span>Get Started</button>
            </a>            
        </div>
    </div>
  );
};

export default Splash;