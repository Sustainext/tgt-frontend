import Screen1 from "./screen1";
import Screen2 from "./screen2"
const Ohsscreen1 = ({ location, year, month}) => {


    return (
        <>
          <Screen1 location={location} year={year} month={month}/>
          <Screen2 location={location} year={year} month={month}/>
        </>
    );
};

export default Ohsscreen1;
