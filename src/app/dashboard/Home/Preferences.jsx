'use client'
import { useState } from "react";
import { MdOutlineModeEditOutline, MdAdd } from "react-icons/md";
const Preferences = () => {
    const [edit, setEdit] = useState(false);
    const handleEditToggle = () => {
        setEdit((prevEdit) => !prevEdit);
    };

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div className="text-neutral-800 text-[15px] font-bold leading-tight">
                        Preferences
                    </div>
                    <div>
                        <div className="text-sky-600 text-[10px] font-bold leading-[13px] space-x-2">
                            <button
                                onClick={handleEditToggle}
                                className="text-sky-600 text-[10px] font-normal leading-[13px] space-x-2 me-2 flex"
                            >
                                <MdOutlineModeEditOutline style={{ fontSize: "14px" }} />
                                <span className="text-[14px]">Edit</span>
                            </button>
                        </div>
                    </div>
                </div>
                <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
                    Frameworks
                </h3>
                <div className="w-full h-[0px] border border-gray-200 mt-2 mb-4"></div>

                <div className="grid grid-cols-4 gap-2 mb-3">

                    {edit && (

                        <div className="w-[70px] h-[70px]  rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                            <MdAdd />
                        </div>

                    )}
                </div>
                <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
                    Regulations
                </h3>
                <div className="w-full h-[0px] border border-gray-200 mt-2 mb-4"></div>
                <div className="grid grid-cols-4 gap-2 mb-3">


                    {edit && (

                        <div className="w-[70px] h-[70px] rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                            <MdAdd />
                        </div>

                    )}
                </div>
                <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
                    Targets
                </h3>
                <div className="w-full  border border-gray-200 mt-2 mb-4"></div>
                <div className="grid grid-cols-4 gap-2 mb-3">


                    {edit && (

                        <div className="w-[70px] h-[70px] rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                            <MdAdd />
                        </div>

                    )}
                </div>
                <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
                    SDG’s
                </h3>
                <div className="w-full h-[0px] border border-gray-200 mt-2 mb-4"></div>
                <div className="grid grid-cols-8 gap-2 mb-3">

                    {edit && (

                        <div className="w-[63px] h-[63px] rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                            <MdAdd />
                        </div>

                    )}
                </div>
                <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
                    Certifications
                </h3>
                <div className="w-full h-[0px] border border-gray-200 mt-2 mb-4"></div>
                <div className="grid grid-cols-4 gap-2 mb-3">

                    {edit && (

                        <div className="w-[70px] h-[70px] rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer ">
                            <MdAdd />
                        </div>

                    )}
                </div>
                <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
                    Ratings
                </h3>
                <div className="w-full  border border-gray-200 mt-2 mb-4"></div>
                <div className="grid grid-cols-4 gap-2 mb-3">

                    {edit && (

                        <div className="w-[70px] h-[70px] rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                            <MdAdd />
                        </div>

                    )}
                </div>
            </div>

        </>
    );
};

export default Preferences;
