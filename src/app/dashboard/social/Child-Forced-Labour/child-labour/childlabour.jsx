import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";
import Screen4 from "./screen4";
import Screen5 from "./screen5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Childlabourscreen = ({ selectedOrg, year, selectedCorp }) => {
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <Screen1
        selectedOrg={selectedOrg}
        year={year}
        selectedCorp={selectedCorp}
      />
      <Screen2
        selectedOrg={selectedOrg}
        year={year}
        selectedCorp={selectedCorp}
      />
      <Screen3
        selectedOrg={selectedOrg}
        year={year}
        selectedCorp={selectedCorp}
      />
      <Screen4
        selectedOrg={selectedOrg}
        year={year}
        selectedCorp={selectedCorp}
      />
      <Screen5
        selectedOrg={selectedOrg}
        year={year}
        selectedCorp={selectedCorp}
      />
    </>
  );
};

export default Childlabourscreen;
