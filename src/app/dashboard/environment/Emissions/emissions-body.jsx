"use client";
import { useEffect, useState, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import axiosInstance, { post } from "@/app/utils/axiosMiddleware";
import { useEmissions } from "./EmissionsContext";
// import Scope1 from "./scope1";
// import Scope2 from "./scope2";
// import Scope3 from "./scope3";
import CalculateSuccess from "./calculateSuccess";
import { fetchEmissionsData, setClimatiqData } from '@/lib/redux/features/emissionSlice';
// import { useDispatch, useSelector } from 'react-redux';
import Scope1 from "./scope1new";
import Scope2 from "./scope2new";
import Scope3 from "./scope3new";

const AccordionItem = ({
  title,
  children,
  scops,
  icons,
  onAccordionClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    const canExpand = onAccordionClick();
    if (canExpand) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200">
      <button
        className="py-3 w-[100%] text-left flex"
        onClick={handleAccordionClick}
      >
        <div className="flex items-center px-3 w-[30%]">
          <h5 className="text-[18px]">{icons}</h5>{" "}
          <h5 className="text-[15px] text-[#344054] pt-1 px-3 font-[500]">
            {scops}
          </h5>
        </div>
        <div className="w-[40%]">
          <h5 className="text-[15px] text-[#344054] pt-1 px-3 font-[500] text-center">
            {title}
          </h5>
        </div>
        <div className="w-[30%]">
          <div className="float-end">
            <span>
              <MdKeyboardArrowDown
                className={`text-2xl ${isOpen && "rotate-180"}`}
              />
            </span>
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="p-4">{children({ setAccordionOpen: setIsOpen })}</div>
      )}{" "}
      {/* Pass setIsOpen as setAccordionOpen */}
    </div>
  );
};

const Emissionsnbody = ({ location, year, month, countryCode, setYearError, setLocationError, locationname }) => {
  const { climatiqData, setClimatiqData } = useEmissions();
  const scope1Ref = useRef();
  const scope2Ref = useRef();
  const scope3Ref = useRef();
  const [modalData, setModalData] = useState(null);

  const getLatestComputedData = () => {
    const base_url = `${process.env.BACKEND_API_URL}/datametric/get-climatiq-score?`;
    const url = `${base_url}location=${location}&&year=${year}&&month=${month}`;
console.log(url,"test datas new");
    axiosInstance
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          setClimatiqData(response.data);
        } else {
          setClimatiqData(0);
        }
      })
      .catch((error) => {
        setClimatiqData({});
        console.log(error, ' -got error');
      });
  };

  const handleAccordionClick = () => {
    if (!location) {
      setLocationError("Please select location");
      return false;
    }
    if (!year) {
      setYearError("Please select year");
      return false;
    }
    setLocationError("");
    setYearError("");
    return true;
  };

  useEffect(() => {
    getLatestComputedData();
  }, [year, location, month]);

  const handleCalculate = async () => {
    const updatePromises = [
      scope1Ref.current?.updateFormData(),
      scope2Ref.current?.updateFormData(),
      scope3Ref.current?.updateFormData(),
    ];

    await Promise.all(updatePromises);

    await getLatestComputedData();

    if (climatiqData !== 0) {
      setModalData({
        ...modalData,
        locationname,
        location,
        month,
        message: "Emission has been created",
      });
    }
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <>
      <div className="mx-3">
        {/* <AccordionItem
          title="Direct emission from operations"
          scops="Scope 1"
          icons={<IoHomeOutline />}
          onAccordionClick={handleAccordionClick}
        >
          {({ setAccordionOpen }) => (
            <Scope1
              ref={scope1Ref}
              location={location}
              year={year}
              month={month}
              countryCode={countryCode}
              successCallback={getLatestComputedData}
              setAccordionOpen={setAccordionOpen}  // Passing setAccordionOpen to Scope1
            />
          )}
        </AccordionItem> */}
        <AccordionItem
          title="Direct emission from operations"
          scops="Scope 1"
          icons={<IoHomeOutline />}
          onAccordionClick={handleAccordionClick}
        >
          {({ setAccordionOpen }) => (
            <Scope1
              ref={scope1Ref}
              location={location}
              year={year}
              month={month}
              countryCode={countryCode}
              successCallback={() => dispatch(fetchEmissionsData({ location, year, month }))}
              setAccordionOpen={setAccordionOpen}
            />
          )}
        </AccordionItem>
        <AccordionItem
          title="InDirect emission from operations"
          scops="Scope 2"
          icons={<IoHomeOutline />}
          onAccordionClick={handleAccordionClick}
        >
          {({ setAccordionOpen }) => (
            <Scope2
              ref={scope2Ref}
              location={location}
              year={year}
              month={month}
              countryCode={countryCode}
              successCallback={() => dispatch(fetchEmissionsData({ location, year, month }))}
              setAccordionOpen={setAccordionOpen} // Pass setAccordionOpen to Scope2
            />
          )}
        </AccordionItem>

        <AccordionItem
          title="All other emissions (associated)"
          scops="Scope 3"
          icons={<IoHomeOutline />}
          onAccordionClick={handleAccordionClick}
        >
          {({ setAccordionOpen }) => (
            <Scope3
              ref={scope3Ref}
              location={location}
              year={year}
              month={month}
              countryCode={countryCode}
              successCallback={() => dispatch(fetchEmissionsData({ location, year, month }))}
              setAccordionOpen={setAccordionOpen} // Pass setAccordionOpen to Scope3
            />
          )}
        </AccordionItem>
      </div>
      <div className="flex justify-end items-center mt-[24] me-5">
        <button
          onClick={handleCalculate}
          className="w-[172px] h-8 px-[22px] py-2 bg-sky-600 rounded shadow flex-col justify-center items-center inline-flex text-white text-xs font-bold leading-[15px] cursor-pointer"
        >
            Calculate
        </button>
      </div>

      {modalData && (
        <CalculateSuccess
          data={modalData}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Emissionsnbody;