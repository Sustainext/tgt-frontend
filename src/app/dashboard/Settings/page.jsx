'use client'
import React,{useState} from "react";
import Aside from "./Aside";

const Settings = () => {
    const [activeModule, setActiveModule] = useState("Language Settings");
    const handleTabClick = (module) => {
        setActiveModule(module);
      };
  return (
    <div className="flex justify-start">
      <div className="w-[220px] min-h-[90vh] py-[11px] flex-shrink-0">
        <Aside activeTab={activeModule} handleTabClick={handleTabClick} />
      </div>
    </div>
  );
};

export default Settings;
