'use client'
import MyGoals from "./MyGoals";
import MyTasks from "./MyTasks";
import Preferences from "./Preferences/page";
const HomeDashboard = () =>  {
  return (
    <>
      <div className="flex space-x-3 pe-4 ">
        <div className="w-2/5 space-y-4 mb-8">
          <div>
           <MyGoals/>
          </div>
          <div className="col-start-1 row-start-2 rounded-lg shadow border border-gray-200 min-h-[46vh]">
            <MyTasks />
          </div>
        </div>
        <div className="row-span-2 col-start-2 row-start-1 rounded-lg shadow border border-gray-200 p-4 h-[660px] w-3/5">
          <Preferences />
        </div>
      </div>
    </>
  );
}

export default HomeDashboard;
