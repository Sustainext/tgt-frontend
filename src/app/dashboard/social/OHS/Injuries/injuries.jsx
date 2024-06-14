import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";
import Screen4 from "./screen4";
import Screen5 from "./screen5";
import Screen6 from "./screen6";
const Injuriesscreen = ({ location, year, month}) => {

    return (
        <>
        <Screen1 location={location} year={year} month={month}/>
        <Screen2 location={location} year={year} month={month}/>
        <Screen3 location={location} year={year} month={month}/>
        <Screen4 location={location} year={year} month={month}/>
        <Screen5 location={location} year={year} month={month}/>
        <Screen6 location={location} year={year} month={month}/>


        </>
    );
};

export default Injuriesscreen;