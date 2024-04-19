const DemoForm = () => {
    return (
        <>
            <div className="flex mx-4 mb-5  mt-5">
                <div className="w-full max-w-xs mx-2 mb-3">
                    <label className="text-sm  leading-5 text-gray-700 flex">
                        Text Field
                        <div className="ml-2">
                            {/* <NewTooltip tooltiptext="Indicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion " /> */}
                        </div>
                    </label>

                    <input
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        placeholder="Enter text"
                        type="text"
                    />
                </div>
                <div className="w-full max-w-xs mx-2 mb-3">
                    <label className="text-sm  leading-5 text-gray-700 flex">
                        Email Field
                        <div className="ml-2">
                            {/* <NewTooltip tooltiptext="Indicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion " /> */}
                        </div>
                    </label>

                    <input
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        placeholder="Enter email"
                        type="email"
                    />
                </div>
                <div className="w-full max-w-xs mx-2 mb-3">
                    <label className="text-sm  leading-5 text-gray-700 flex">
                        Password Field
                        <div className="ml-2">
                            {/* <NewTooltip tooltiptext="Indicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion " /> */}
                        </div>
                    </label>

                    <input
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        placeholder="Enter password"
                        type="password"
                    />
                </div>
            </div>
            <div className="flex mx-4 mb-4">
                <div className="w-full max-w-xs mx-2 mb-3">
                    <label className="text-sm  leading-5 text-gray-700 flex">
                        Date Field
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
                <div className="w-full max-w-xs mx-2 mb-3 mt-3">
                    <label className=' mt-2 flex items-center md:w-2/3  text-gray-500 font-bold'>
                        <input
                            className='mr-2 leading-tight accent-green-500 text-[#D6D4D4] '
                            type='checkbox'
                        />

                        <span className='text-[18px] text-[#0A0528]'>
                            Checkbox Field
                        </span>
                    </label>


                </div>
                <div className="w-full max-w-xs mx-2 mb-3 mt-3">
                    <label className=' mt-2 flex items-center md:w-2/3  text-gray-500 font-bold'>
                        <input
                            className='mr-2 '
                            type='radio'
                        />

                        <span className='text-[18px] text-[#0A0528]'>
                        Radio Field
                        </span>
                    </label>


                </div>
            </div>

            <div className="flex mx-4 mb-5">
                <div className="w-full max-w-xs mx-2 mb-3">
                    <label className="text-sm  leading-5 text-gray-700 flex">
                        File Field
                        <div className="ml-2">
                            {/* <NewTooltip tooltiptext="Indicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion " /> */}
                        </div>
                    </label>

                    <input
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        placeholder="Enter Date"
                        type="file"
                    />
                </div>
                <div className="w-full max-w-xs mx-2 mb-3">

                      <label className="text-sm  leading-5 text-gray-700 flex">
                      select
                        <div className="ml-2">
                          {/* <NewTooltip tooltiptext="Indicate where the energy comes from" /> */}
                        </div>
                      </label>

                      <select
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        defaultValue=""
                      >
                        <option value="" disabled>
                        Select
                        </option>

                      </select>
                    </div>
                <div className="w-full max-w-xs mx-2 mb-3">
                <label className="text-sm  leading-5 text-gray-700 flex">
                Textarea

                    </label>
                <textarea
                            id="countriesOfOperation"
                            name="countriesOfOperation"
                            placeholder="Enter a description..."
                            className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-[85%] `}


                            // value={formData.countriesOfOperation}
                            // onChange={handleInputChange}
                            rows={7}
                        // Specify the number of rows to determine the initial height
                        />
                </div>
            </div>
            <div className="flex mx-4 mb-5">
                <div className="w-full max-w-xs mx-2 mb-3">
                    <label className="text-sm  leading-5 text-gray-700 flex">
                    Number Field
                        <div className="ml-2">
                            {/* <NewTooltip tooltiptext="Indicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion " /> */}
                        </div>
                    </label>

                    <input
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        placeholder="Enter text"
                        type="number"
                    />
                </div>

                <div className="w-full max-w-xs mx-2 mb-3">
                    <label className="text-sm  leading-5 text-gray-700 flex">
                    Text Field
                        <div className="ml-2">
                            {/* <NewTooltip tooltiptext="Indicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion " /> */}
                        </div>
                    </label>

                    <input
                       className="block  w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter text"
                        type="Text"
                    />
                </div>
            </div>
        </>
    );

}
export default DemoForm;