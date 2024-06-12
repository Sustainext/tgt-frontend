import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";

const Workinvolvementscreen = ({ location, year, month}) => {


    return (
        <>
        <div>
          <Screen1 location={location} year={year} month={month}/>
          <Screen2 location={location} year={year} month={month}/>
          <Screen3 location={location} year={year} month={month}/>

        </div>

        </>
    );
};

export default Workinvolvementscreen;
