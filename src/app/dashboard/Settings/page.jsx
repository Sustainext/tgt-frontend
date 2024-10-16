'use client'
import React,{useState,useEffect} from "react";
import Aside from "./Aside";
import LanguageSettings from "./LanguageSettings";
import { useDispatch} from "react-redux";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../lib/redux/features/topheaderSlice";
const Settings = () => {
    const [activeModule, setActiveModule] = useState("Language Settings");
    const dispatch = useDispatch();
    const handleTabClick = (module) => {
        setActiveModule(module);
      };
      useEffect(() => {
   
        dispatch(setHeadertext1("Setting"));
        dispatch(setHeaderdisplay("none"));
        dispatch(setHeadertext2(activeModule));
     
    }, [activeModule,dispatch]);
  return (
    <div className="flex justify-start">
      <div className="w-[220px] min-h-[90vh] py-[11px] flex-shrink-0">
        <Aside activeTab={activeModule} handleTabClick={handleTabClick} />
      </div>
      <div className='m-10'>
          {activeModule === 'Language Settings' && (
            <LanguageSettings />
          )}
        </div>
    </div>
  );
};

export default Settings;
