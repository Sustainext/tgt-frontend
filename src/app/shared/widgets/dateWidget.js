const dateWidget = (props) =>{
    return(
      <div className="w-full max-w-xs mx-2 mb-3">
                    <label className="text-sm  leading-5 text-gray-700 flex">
                        {props.label}
                        <div className="ml-2">
                            {/* <NewTooltip tooltiptext="Indicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion " /> */}
                        </div>
                    </label>

                    <input
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        placeholder="Enter Date"
                        type="date"
                    />
        </div>
    )
  }

export default dateWidget;