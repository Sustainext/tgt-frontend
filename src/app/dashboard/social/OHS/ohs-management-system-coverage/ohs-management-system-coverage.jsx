import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3"
const Ohsmanagementsystemcoveragescreen = ({ location, year, month}) => {

    return (
        <>
          <Screen1 location={location} year={year} month={month}/>
          <Screen2 location={location} year={year} month={month}/>
          <Screen3 location={location} year={year} month={month}/>

        </>
    );
};

export default Ohsmanagementsystemcoveragescreen;