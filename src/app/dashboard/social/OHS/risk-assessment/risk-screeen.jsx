import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";
import Screen4 from "./screen4"

const Riskscreen = ({ location, year, month}) => {


    return (
        <>
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
