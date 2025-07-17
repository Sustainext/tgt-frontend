'use client'
import React,{useState,useEffect} from "react";
import { useDispatch} from "react-redux";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../lib/redux/features/topheaderSlice";
const EZGB = () => {
    // const dispatch = useDispatch();
    //   useEffect(() => {
   
    //     dispatch(setHeadertext1("Setting"));
    //     dispatch(setHeaderdisplay("none"));
    //     dispatch(setHeadertext2(activeModule));
     
    // }, [activeModule,dispatch]);

     useEffect(() => {
    if (!document.getElementById('cmdButtonScript')) {
      const script = document.createElement('script');
      script.id = 'cmdButtonScript';
      script.src = 'https://button.screamingpower.ca/guest/cmdButton.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return (
    <div className="mx-5 my-5">
         <div id="cmdButton" customerCode="fsq9ur"></div>
    </div>
     
  );
};

export default EZGB;
