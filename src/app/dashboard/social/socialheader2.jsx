'use client';
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { yearInfo, months } from "@/app/shared/data/yearInfo";
import axiosInstance from "@/app/utils/axiosMiddleware";

const monthMapping = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
};

const getMonthString = (monthNumber) => {
    return Object.keys(monthMapping).find(key => monthMapping[key] === monthNumber);
};

const Socialheader2 = ({ activeMonth, setActiveMonth, selectedOrg, setSelectedOrg, selectedCorp, setSelectedCorp, year, setYear }) => {
    const [formState, setFormState] = useState({
        selectedCorp: selectedCorp,
        selectedOrg: selectedOrg,
        year: year,
        month: activeMonth,
    });

    const [locations, setLocations] = useState([]);
    const [errors, setErrors] = useState({
        organization: "Please select an organization",
        corporate: "Please select a corporate",
        year: "Please select a year"
    });

    const [organisations, setOrganisations] = useState([]);
    const [corporates, setCorporates] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === "month") {
            setActiveMonth(monthMapping[value]);
        } else if (name === "year") {
            setYear(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                year: value ? "" : "Please select a year",
            }));
        } else if (name === "selectedOrg") {
            setSelectedOrg(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                organization: value ? "" : "Please select an organization",
            }));
        } else if (name === "selectedCorp") {
            setSelectedCorp(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                corporate: value ? "" : "Please select a corporate",
            }));
        }
    };

    useEffect(() => {
        const fetchOrg = async () => {
            try {
                const response = await axiosInstance.get(`/orggetonly`);
                setOrganisations(response.data);
            } catch (e) {
                console.error("Failed fetching organization:", e);
            }
        };

        fetchOrg();
    }, []);

    useEffect(() => {
        const fetchCorporates = async () => {
            if (selectedOrg) {
                try {
                    const response = await axiosInstance.get(`/corporate/`, {
                        params: { organization_id: selectedOrg },
                    });
                    setCorporates(response.data);
                } catch (e) {
                    console.error("Failed fetching corporates:", e);
                }
            }
        };

        fetchCorporates();
    }, [selectedOrg]);

    useEffect(() => {
        setFormState({
            selectedCorp: selectedCorp,
            selectedOrg: selectedOrg,
            year: year,
            month: activeMonth,
        });
    }, [selectedOrg, selectedCorp, year, activeMonth]);

    const handleOrgChange = (e) => {
        const newOrg = e.target.value;
        setSelectedOrg(newOrg);
        setSelectedCorp("");
        setErrors((prevErrors) => ({
            ...prevErrors,
            organization: newOrg ? "" : "Please select an organization",
        }));
    };

    const handleCorpChange = (e) => {
        const newCorp = e.target.value;
        setSelectedCorp(newCorp);
        setErrors((prevErrors) => ({
            ...prevErrors,
            corporate: newCorp ? "" : "Please select a corporate",
        }));
    };

    return (
        <>
            <div className="ml-2 mb-5">
                <div className="flex mb-5 gap-4">
                    <div className="ml-3 relative mb-2">
                        <select
                            name="selectedOrg"
                            className="border m-0.5 text-sm text-neutral-500 appearance-none pr-32 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={selectedOrg}
                            onChange={handleOrgChange}
                        >
                            <option value="">Select Organization</option>
                            {organisations &&
                                organisations.map((org) => (
                                    <option key={org.id} value={org.id}>
                                        {org.name}
                                    </option>
                                ))}
                        </select>
                        <div
                            className="absolute inset-y-0 right-2 flex items-center pointer-events-none"
                            style={{ top: "50%", transform: "translateY(-50%)" }}
                        >
                            <MdKeyboardArrowDown
                                className="text-neutral-500"
                                style={{ fontSize: "16px" }}
                            />
                        </div>
                        {errors.organization && <p className="text-red-500 text-sm absolute top-10 left-0 pl-2">{errors.organization}</p>}
                    </div>

                    <div className="ml-3 relative mb-2">
                        <select
                            name="selectedCorp"
                            className="border m-0.5 text-sm text-neutral-500 appearance-none pr-32 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={selectedCorp}
                            onChange={handleCorpChange}
                        >
                            <option value="">Select Corporate</option>
                            {corporates &&
                                corporates.map((corp) => (
                                    <option key={corp.id} value={corp.id}>
                                        {corp.name}
                                    </option>
                                ))}
                        </select>
                        <div
                            className="absolute inset-y-0 right-2 flex items-center pointer-events-none"
                            style={{ top: "50%", transform: "translateY(-50%)" }}
                        >
                            <MdKeyboardArrowDown
                                className="text-neutral-500"
                                style={{ fontSize: "16px" }}
                            />
                        </div>
                        {errors.corporate && <p className="text-red-500 text-sm absolute top-10 left-0 pl-2">{errors.corporate}</p>}
                    </div>

                    <div className="ml-3 relative mb-2">
                        <select
                            name="year"
                            className="border m-0.5 text-sm text-neutral-500 appearance-none pr-32 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={formState.year}
                            onChange={handleChange}
                        >
                            <option value="">Select year</option>
                            {yearInfo.map((item) => (
                                <option value={item.slice(0, 4)} key={item}>
                                    {item.slice(0, 4)}
                                </option>
                            ))}
                        </select>
                        <div
                            className="absolute inset-y-0 right-2 flex items-center pointer-events-none"
                            style={{ top: "50%", transform: "translateY(-50%)" }}
                        >
                            <MdKeyboardArrowDown
                                className="text-neutral-500"
                                style={{ fontSize: "16px" }}
                            />
                        </div>
                        {errors.year && <p className="text-red-500 text-sm absolute top-10 left-0 pl-2">{errors.year}</p>}
                    </div>
                </div>
                <div className="flex justify-between mb-4">
                    <div className="flex bg-[#f7f7f7] py-1 rounded-lg">
                        {months.map((month, index) => (
                            <button
                                key={index}
                                className={`text-[12px] border-r mx-1 ${formState.month === monthMapping[month] ? "bg-white shadow-md rounded-lg" : ""}`}
                                onClick={() => handleChange({ target: { name: "month", value: month } })}
                            >
                                <p
                                    className={`text-center ${formState.month === monthMapping[month]
                                        ? "custom-gradient-text"
                                        : "text-[#A1A1A1]"
                                        } hover:bg-[#f7f7f7] py-1 w-[55px] ${index === 0 ? "rounded-l" : ""
                                        } ${index === months.length - 1 ? "rounded-r" : ""}`}
                                >
                                    {month}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Socialheader2;
