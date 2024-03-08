import React, { useState, useEffect } from 'react';
import LoginView from "@/components/LoginView/loginView";
import "../src/app/globals.css"
import imageB from "../public/img/background.jpg"
import SpinnerComponent from '@/components/Spinner/spinner';

const Index = () => {

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
      const image = new Image();
      image.src = imageB.src;
  
      image.onload = () => {
        setIsImageLoaded(true);
      };
  
      return () => {
        image.onload = null;
      };
    }, []);

    if(!isImageLoaded) return <SpinnerComponent />
    

  return (
    <div className={`background-container ${isImageLoaded ? 'show' : 'hide'}`}>
      <LoginView />
    </div>
  );
};

export default Index;
