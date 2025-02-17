import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";
import Screen4 from "./screen4";
import Screen5 from "./screen5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Childlabourscreen = ({ selectedOrg, year, selectedCorp, togglestatus }) => {
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <Screen1
        selectedOrg={selectedOrg}
        year={year}
        selectedCorp={selectedCorp}
        togglestatus={togglestatus}
      />
      <Screen2
        selectedOrg={selectedOrg}
        year={year}
        selectedCorp={selectedCorp}
        togglestatus={togglestatus}
      />
      <Screen3
        selectedOrg={selectedOrg}
        year={year}
        selectedCorp={selectedCorp}
        togglestatus={togglestatus}
      />
      <Screen4
        selectedOrg={selectedOrg}
        year={year}
        selectedCorp={selectedCorp}
        togglestatus={togglestatus}
      />
      <Screen5
        selectedOrg={selectedOrg}
        year={year}
        selectedCorp={selectedCorp}
        togglestatus={togglestatus}
      />
    </>
  );
};

export default Childlabourscreen;
