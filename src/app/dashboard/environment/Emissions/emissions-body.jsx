"use client";
import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import CalculateSuccess from "./calculateSuccess";
import {
  fetchEmissionsData,
  fetchUsers,
  setValidationErrors,
  clearValidationErrors,
} from "@/lib/redux/features/emissionSlice";
import { useDispatch, useSelector } from "react-redux";
import Scope1 from "./scope1new";
import Scope2 from "./scope2new";
import Scope3 from "./scope3new";
import CalculateConfirmationModal from "./CalculateConfirmationModal";
import {
  validateEmissionsData,
  formatValidationErrors,
} from "./emissionValidation";

const AccordionItem = ({ title, children, scops, icons, onAccordionClick, scope }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    const canExpand = onAccordionClick();
    if (canExpand) {
      setIsOpen(!isOpen);
    }
  };

  const scope_emission = useSelector((state) => state.emissions.climatiqData[scope]);

  return (
    <>
       {/* desktop version */}
    <div className="shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 hidden xl:block md:block 4k:block 2k:block lg:block 2xl:block">
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
          <div className="float-end flex items-center justify-end">
            <div className="h-4 opacity-80 justify-start items-center inline-flex mr-4">
              <div className="text-[#0056a4] text-xs font-medium font-['Manrope'] leading-none">
                GHG Emissions =
              </div>
              <div>
                <span class="text-[#146152] text-xs font-medium font-['Manrope'] leading-none">
                  {" "}
                  {scope_emission} tCO
                </span>
                <sub class="text-[#146152] text-xs font-medium font-['Manrope'] leading-none">
                  2
                </sub>
                <span class="text-[#146152] text-xs font-medium font-['Manrope'] leading-none">
                  e
                </span>
              </div>
            </div>
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
   
          {/* mobile version */}
    <div className="shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 block xl:hidden md:hidden 4k:hidden 2k:hidden lg:hidden 2xl:hidden">
      <button
        className="py-3 w-[100%] text-left "
        onClick={handleAccordionClick}
      >
        <div className="flex mb-2">
        <div className="flex items-center px-3 w-[30%]">
          <h5 className="text-[18px]">{icons}</h5>{" "}
          <h5 className="text-[15px] text-[#344054] pt-1 px-3 font-[500]">
            {scops}
          </h5>
        </div>
        <div className="w-[60%]">
          <h5 className="text-[15px] text-[#344054] pt-1 px-3 font-[500] text-center">
            {title}
          </h5>
        </div>
        <span>
              <MdKeyboardArrowDown
                className={`text-2xl ${isOpen && "rotate-180"}`}
              />
            </span>
        </div>
  
        <div className="w-full">
          <div className=" flex items-center px-3">
            <div className="h-4 opacity-80 justify-start items-center inline-flex mr-4">
              <div className="text-[#0056a4] text-xs font-medium font-['Manrope'] leading-none">
                GHG Emissions =
              </div>
              <div>
                <span class="text-[#146152] text-xs font-medium font-['Manrope'] leading-none">
                  {" "}
                  {scope_emission} tCO
                </span>
                <sub class="text-[#146152] text-xs font-medium font-['Manrope'] leading-none">
                  2
                </sub>
                <span class="text-[#146152] text-xs font-medium font-['Manrope'] leading-none">
                  e
                </span>
              </div>
            </div>
      
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="p-4">{children({ setAccordionOpen: setIsOpen })}</div>
      )}{" "}
      {/* Pass setIsOpen as setAccordionOpen */}
    </div>
    </>
 
    
  );
};

const Emissionsnbody = ({
  location,
  year,
  month,
  countryCode,
  setYearError,
  setLocationError,
  locationname,
}) => {
  const dispatch = useDispatch();
  const scope1Ref = useRef();
  const scope2Ref = useRef();
  const scope3Ref = useRef();
  const [modalData, setModalData] = useState(null);
  const climatiqData = useSelector((state) => state.emissions.climatiqData);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [scopeData, setScopeData] = useState({});
  const assignedTasks = useSelector((state) => state.emissions.assignedTasks);
  const usersStatus = useSelector((state) => state.emissions.users.status);

  const scope1Data = useSelector((state) => state.emissions.scope1Data);
  const scope2Data = useSelector((state) => state.emissions.scope2Data);
  const scope3Data = useSelector((state) => state.emissions.scope3Data);

  const [scope1DataError, setScope1DataError] = useState("");
  const [scope2DataError, setScope2DataError] = useState("");
  const [scope3DataError, setScope3DataError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleAccordionClick = () => {
    if (!location) {
      setLocationError("Please select a location");
      return false;
    }
    if (!year) {
      setYearError("Please select a year");
      return false;
    }
    setLocationError("");
    setYearError("");
    return true;
  };

  const handleCalculate = async () => {
    // First check for required location and year
    if (!location) {
      setLocationError("Please select a location");
      return;
    }
    if (!year) {
      setYearError("Please select a year");
      return;
    }

    // Validate each scope
    const validationResults = [
      { data: scope1Data, scope: "Scope 1" },
      { data: scope2Data, scope: "Scope 2" },
      { data: scope3Data, scope: "Scope 3" },
    ]
      .filter(({ data }) => data?.data?.data?.length > 0)
      .map(({ data, scope }) => ({
        scope,
        result: validateEmissionsData(data, scope),
      }));

    let hasAnyErrors = false;
    const validationErrors = {};

    console.log("validation results", validationResults);

    // Process validation results by scope name instead of array index
    validationResults.forEach(({ scope, result }) => {
      if (result.hasErrors) {
        hasAnyErrors = true;
        // Convert "Scope 1" to "scope1" etc.
        const scopeKey = scope.toLowerCase().replace(/\s+/g, "");
        validationErrors[scopeKey] = {
          fields: result.fields,
          messages: result.messages,
          emptyFields: result.emptyFields,
        };
      }
    });

    if (hasAnyErrors) {
      // Store validation errors in redux state with all the validation info
      dispatch(setValidationErrors(validationErrors));
      return;
    }

    // Check for assigned tasks
    const hasAssignedTasks =
      assignedTasks.scope1.length > 0 ||
      assignedTasks.scope2.length > 0 ||
      assignedTasks.scope3.length > 0;

    if (hasAssignedTasks) {
      // Ensure users are loaded before showing modal
      if (usersStatus === "idle") {
        await dispatch(fetchUsers());
      }

      const formattedScopeData = {
        "Scope 1": assignedTasks.scope1,
        "Scope 2": assignedTasks.scope2,
        "Scope 3": assignedTasks.scope3,
      };

      // Remove empty scopes
      Object.keys(formattedScopeData).forEach((key) => {
        if (formattedScopeData[key].length === 0) {
          delete formattedScopeData[key];
        }
      });

      setScopeData(formattedScopeData);
      setShowConfirmationModal(true);
    } else {
      await proceedWithCalculation();
    }
  };

  const proceedWithCalculation = async () => {
    const updatePromises = [
      scope1Ref.current?.updateFormData(),
      scope2Ref.current?.updateFormData(),
      scope3Ref.current?.updateFormData(),
    ];
    await Promise.all(updatePromises);
    await dispatch(fetchEmissionsData({ location, year, month }));

    if (climatiqData.status === "succeeded") {
      setModalData({
        locationname,
        location,
        month,
        message: "Emission has been created",
      });
    }
  };

  const handleConfirmCalculate = async () => {
    setShowConfirmationModal(false);
    await proceedWithCalculation();
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <>
      <div className="mx-3">
        <AccordionItem
          title="Direct emission from operations"
          scops="Scope 1"
          icons={<IoHomeOutline />}
          onAccordionClick={handleAccordionClick}
          scope="scope1"
        >
          {({ setAccordionOpen }) => (
            <Scope1
              ref={scope1Ref}
              location={location}
              year={year}
              month={month}
              countryCode={countryCode}
              successCallback={() =>
                dispatch(fetchEmissionsData({ location, year, month }))
              }
              setAccordionOpen={setAccordionOpen}
              dataError={scope1DataError}
              showError={showError}
            />
          )}
        </AccordionItem>
        <AccordionItem
          title="InDirect emission from operations"
          scops="Scope 2"
          icons={<IoHomeOutline />}
          onAccordionClick={handleAccordionClick}
          scope="scope2"
        >
          {({ setAccordionOpen }) => (
            <Scope2
              ref={scope2Ref}
              location={location}
              year={year}
              month={month}
              countryCode={countryCode}
              successCallback={() =>
                dispatch(fetchEmissionsData({ location, year, month }))
              }
              setAccordionOpen={setAccordionOpen}
              dataError={scope2DataError}
              showError={showError}
            />
          )}
        </AccordionItem>

        <AccordionItem
          title="All other emissions (associated)"
          scops="Scope 3"
          icons={<IoHomeOutline />}
          onAccordionClick={handleAccordionClick}
          scope="scope3"
        >
          {({ setAccordionOpen }) => (
            <Scope3
              ref={scope3Ref}
              location={location}
              year={year}
              month={month}
              countryCode={countryCode}
              successCallback={() =>
                dispatch(fetchEmissionsData({ location, year, month }))
              }
              setAccordionOpen={setAccordionOpen}
              dataError={scope3DataError}
              showError={showError}
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

      <CalculateConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmCalculate}
        scopeData={scopeData}
      />

      {modalData && (
        <CalculateSuccess data={modalData} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Emissionsnbody;
