import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";
import Screen4 from "./screen4"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Riskscreen = ({ location, year, month}) => {


    return (
        <>
        <ToastContainer style={{ fontSize: "12px" }} />
        <div className="h-[850px] overflow-y-auto">
          <Screen1 location={location} year={year} month={month}/>
          <Screen2 location={location} year={year} month={month}/>
          <Screen3 location={location} year={year} month={month}/>
          <Screen4 location={location} year={year} month={month}/>
        </div>

        </>
    );
};

export default Riskscreen;
