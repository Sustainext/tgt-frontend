import Screen1 from "./screen1";
import Screen2 from "./screen2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Ohsservicesmain = ({ location, year, month}) => {

    return (
        <>
<ToastContainer style={{ fontSize: "12px" }} />
          <Screen1 location={location} year={year} month={month}/>
          <Screen2 location={location} year={year} month={month}/>

        </>
    );
};

export default Ohsservicesmain;
