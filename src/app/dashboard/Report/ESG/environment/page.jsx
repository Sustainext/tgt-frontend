"use client";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section5 from "./sections/section5";
import Section6 from "./sections/section6";
import Section7 from "./sections/section7";
import Section8 from "./sections/section8";
import Section9 from "./sections/section9";
import Section10 from "./sections/section10";
import Section11 from "./sections/section11";
import Section12 from "./sections/section12";
import Section13 from "./sections/section13";
import Section14 from "./sections/section14";
import Section15 from "./sections/section15";
import Section16 from "./sections/section16";
import Section17 from "./sections/section17";
import Section18 from "./sections/section18";
import Section19 from "./sections/section19";
import Section20 from "./sections/section20";
import Section21 from "./sections/section21";
import Section22 from "./sections/section22";
import Section23 from "./sections/section23";
import Section24 from "./sections/section24";
import Section25 from "./sections/section25";
import Section26 from "./sections/section26";
import Section27 from "./sections/section27";
import Section28 from "./sections/section28";
import Section29 from "./sections/section29";
import Section30 from "./sections/section30";
import Section31 from "./sections/section31";
import Section32 from "./sections/section32";
import Section33 from "./sections/section33";
import Section34 from "./sections/section34";
import axiosInstance, { patch } from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import {
  setEnvironmentStatement,
  setEmission,
  setScopeOneEmission,
  setScopeTwoEmission,
  setScopeThreeEmission,
  setGHGEmissionIntensityTracking,
  setGHGEmissionReductionEfforts,
  setOzoneDepletingSubstanceElimination,
  setMaterialManagementStrategy,
  setRecyclingProcess,
  setReclamationRecyclingProcess,
  setWaterWithdrawalTracking,
  setWaterConsumptionGoals,
  setEnergyConsumptionWithinOrganization,
  setEnergyConsumptionOutsideOrganization,
  setEnergyIntensityTracking,
  setBaseYear,
  setConsolidation,
  setEnergyConsumptionReductionCommitment,
  setSignificantSpills,
  setHabitatProtectionRestorationCommitment,
  setAirQualityProtectionCommitment,
  setBiogenicCO2Emission,
  setBiogenicCO2305,
} from "../../../../../lib/redux/features/ESGSlice/screen12Slice";

const Environment = forwardRef(({ onSubmitSuccess,reportType }, ref) => {
  const [activeSection, setActiveSection] = useState("section12_1");

  const section12_1Ref = useRef(null);
  const section12_2Ref = useRef(null);
  const section12_3Ref = useRef(null);
  const section12_4Ref = useRef(null);
  const section12_5Ref = useRef(null);
  const section12_6Ref = useRef(null);
  const section12_7Ref = useRef(null);
  const section12_8Ref = useRef(null);
  const section12_1_1Ref = useRef(null);
  const section12_1_2Ref = useRef(null);
  const section12_1_3Ref = useRef(null);
  const section12_1_4Ref = useRef(null);
  const section12_1_5Ref = useRef(null);
  const section12_1_6Ref = useRef(null);
  const section12_1_7Ref = useRef(null);
  const section12_1_8Ref = useRef(null);
  const section12_1_9Ref = useRef(null);
  const section12_2_1Ref = useRef(null);
  const section12_2_2Ref = useRef(null);
  const section12_2_3Ref = useRef(null);
  const section12_3_1Ref = useRef(null);
  const section12_3_2Ref = useRef(null);
  const section12_3_3Ref = useRef(null);
  const section12_3_4Ref = useRef(null);
  const section12_4_1Ref = useRef(null);
  const section12_4_2Ref = useRef(null);
  const section12_4_3Ref = useRef(null);
  const section12_4_4Ref = useRef(null);
  const section12_4_5Ref = useRef(null);
  const section12_5_1Ref = useRef(null);
  const section12_5_2Ref = useRef(null);
  const section12_5_3Ref = useRef(null);
  const section12_5_4Ref = useRef(null);
  const section12_5_5Ref = useRef(null);
  const section12_5_6Ref = useRef(null);
  const section12_6_1Ref = useRef(null);
  const section12_6_2Ref = useRef(null);
  const section12_7_1Ref = useRef(null);

  const scrollToSection = (sectionRef, sectionId) => {
    setActiveSection(sectionId);

    const elementTop =
      sectionRef.current?.getBoundingClientRect().top + window.scrollY;

    // Scroll smoothly to the section, ensuring it scrolls up as well
    window.scrollTo({
      top: elementTop - 100, // Adjust 100 to the height of any sticky header
      behavior: "smooth",
    });
  };

  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const environmental_responsibility_statement = useSelector(
    (state) => state.screen12Slice.environmental_responsibility_statement
  );
  const emissions = useSelector((state) => state.screen12Slice.emissions);
  const scope_one_emissions = useSelector(
    (state) => state.screen12Slice.scope_one_emissions
  );
  const scope_two_emissions = useSelector(
    (state) => state.screen12Slice.scope_two_emissions
  );
  const scope_three_emissions = useSelector(
    (state) => state.screen12Slice.scope_three_emissions
  );
  const ghg_emission_intensity_tracking = useSelector(
    (state) => state.screen12Slice.ghg_emission_intensity_tracking
  );
  const ghg_emission_reduction_efforts = useSelector(
    (state) => state.screen12Slice.ghg_emission_reduction_efforts
  );
  const ozone_depleting_substance_elimination = useSelector(
    (state) => state.screen12Slice.ozone_depleting_substance_elimination
  );
  const material_management_strategy = useSelector(
    (state) => state.screen12Slice.material_management_strategy
  );
  const recycling_process = useSelector(
    (state) => state.screen12Slice.recycling_process
  );
  const reclamation_recycling_process = useSelector(
    (state) => state.screen12Slice.reclamation_recycling_process
  );
  const water_withdrawal_tracking = useSelector(
    (state) => state.screen12Slice.water_withdrawal_tracking
  );
  const water_consumption_goals = useSelector(
    (state) => state.screen12Slice.water_consumption_goals
  );
  const energy_consumption_within_organization = useSelector(
    (state) => state.screen12Slice.energy_consumption_within_organization
  );
  const energy_consumption_outside_organization = useSelector(
    (state) => state.screen12Slice.energy_consumption_outside_organization
  );
  const energy_intensity_tracking = useSelector(
    (state) => state.screen12Slice.energy_intensity_tracking
  );
  const energy_consumption_reduction_commitment = useSelector(
    (state) => state.screen12Slice.energy_consumption_reduction_commitment
  );
  const significant_spills = useSelector(
    (state) => state.screen12Slice.significant_spills
  );
  const habitat_protection_restoration_commitment = useSelector(
    (state) => state.screen12Slice.habitat_protection_restoration_commitment
  );
  const air_quality_protection_commitment = useSelector(
    (state) => state.screen12Slice.air_quality_protection_commitment
  );
  const biogenic_c02_emissions = useSelector(
    (state) => state.screen12Slice.biogenic_c02_emissions
  );
  const biogenic_c02_emissions_305_3c = useSelector(
    (state) => state.screen12Slice.biogenic_c02_emissions_305_3c
  );
  const consolidation = useSelector(
    (state) => state.screen12Slice.consolidation
  );
  const base_year = useSelector((state) => state.screen12Slice.base_year);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const submitForm = async (type) => {
    LoaderOpen();
    const data = {
      environmental_responsibility_statement: {
        page: "screen_twelve",
        label: "12. Environment",
        subLabel:
          "Add statement about company’s responsibility to minimize the environmental impact",
        type: "textarea",
        content: environmental_responsibility_statement,
        field: "environmental_responsibility_statement",
        isSkipped: false,
      },
      emissions: {
        page: "screen_twelve",
        label: "12.1 Emissions",
        subLabel: "Add statement about company’s strategy to reduce emission",
        type: "textarea",
        content: emissions,
        field: "emissions",
        isSkipped: false,
      },
      scope_one_emissions: {
        page: "screen_twelve",
        label: "12.1.2 Scope 1 GHG Emissions",
        subLabel: "Add statement about company’s scope 1 emissions",
        type: "textarea",
        content: scope_one_emissions,
        field: "scope_one_emissions",
        isSkipped: false,
      },
      scope_two_emissions: {
        page: "screen_twelve",
        label: "12.1.3 Scope 2 GHG Emissions",
        subLabel: "Add statement about company’s scope 2 emissions",
        type: "textarea",
        content: scope_two_emissions,
        field: "scope_two_emissions",
        isSkipped: false,
      },
      scope_three_emissions: {
        page: "screen_twelve",
        label: "12.1.4 Scope 3 GHG Emissions",
        subLabel: "Add statement about company’s scope 3 emissions",
        type: "textarea",
        content: scope_three_emissions,
        field: "scope_three_emissions",
        isSkipped: false,
      },
      ghg_emission_intensity_tracking: {
        page: "screen_twelve",
        label: "12.1.5 GHG Emission Intensity",
        subLabel: "Add statement about tracking of GHG emission intensity",
        type: "richTextarea",
        content: ghg_emission_intensity_tracking,
        field: "ghg_emission_intensity_tracking",
        isSkipped: false,
      },
      ghg_emission_reduction_efforts: {
        page: "screen_twelve",
        label: "12.1.6 Reduction in GHG Emissions",
        subLabel: "Add statement about efforts to reduce GHG emission",
        type: "richTextarea",
        content: ghg_emission_reduction_efforts,
        field: "ghg_emission_reduction_efforts",
        isSkipped: false,
      },
      ozone_depleting_substance_elimination: {
        page: "screen_twelve",
        label: "12.1.7 Ozone Depleting Substances",
        subLabel:
          "Add statement about company’s commitment to eliminate use of ozone depleting substance",
        type: "richTextarea",
        content: ozone_depleting_substance_elimination,
        field: "ozone_depleting_substance_elimination",
        isSkipped: false,
      },
      material_management_strategy: {
        page: "screen_twelve",
        label: "12.2 Materials",
        subLabel: "Add statement about company’s material management strategy",
        type: "textarea",
        content: material_management_strategy,
        field: "material_management_strategy",
        isSkipped: false,
      },
      recycling_process: {
        page: "screen_twelve",
        label: "12.2.2 Recycled Input Materials Used",
        subLabel: "Add statement about company’s process for recycling",
        type: "textarea",
        content: recycling_process,
        field: "recycling_process",
        isSkipped: false,
      },
      reclamation_recycling_process: {
        page: "screen_twelve",
        label: "12.2.3 Reclaimed Products and Their Packaging Materials",
        subLabel:
          "Add statement about company’s reclamation and recycling process",
        type: "textarea",
        content: reclamation_recycling_process,
        field: "reclamation_recycling_process",
        isSkipped: false,
      },
      water_withdrawal_tracking: {
        page: "screen_twelve",
        label: "12.3.2 Water Withdrawal",
        subLabel: "Add statement about company’s tracking of water withdrawal",
        type: "textarea",
        content: water_withdrawal_tracking,
        field: "water_withdrawal_tracking",
        isSkipped: false,
      },
      water_consumption_goals: {
        page: "screen_twelve",
        label: "12.3.4 Water Consumption",
        subLabel: "Add statement about company’s water consumption goals",
        type: "textarea",
        content: water_consumption_goals,
        field: "water_consumption_goals",
        isSkipped: false,
      },
      energy_consumption_within_organization: {
        page: "screen_twelve",
        label: "12.4.2 Energy Consumption within the Organization",
        subLabel:
          "Add statement about company’s energy consumption within organisation",
        type: "textarea",
        content: energy_consumption_within_organization,
        field: "energy_consumption_within_organization",
        isSkipped: false,
      },
      energy_consumption_outside_organization: {
        page: "screen_twelve",
        label: "12.4.3 Energy Consumption Outside of the Organization",
        subLabel:
          "Add statement about company’s energy consumption outside of the organisation",
        type: "textarea",
        content: energy_consumption_outside_organization,
        field: "energy_consumption_outside_organization",
        isSkipped: false,
      },
      energy_intensity_tracking: {
        page: "screen_twelve",
        label: "12.4.4 Energy Intensity",
        subLabel: "Add statement about tracking the Energy Intensity",
        type: "textarea",
        content: energy_intensity_tracking,
        field: "energy_intensity_tracking",
        isSkipped: false,
      },
      energy_consumption_reduction_commitment: {
        page: "screen_twelve",
        label: "12.4.5 Reduction in Energy consumption",
        subLabel:
          "Add statement about company’s commitment to reduce energy consumption",
        type: "textarea",
        content: energy_consumption_reduction_commitment,
        field: "energy_consumption_reduction_commitment",
        isSkipped: false,
      },
      significant_spills: {
        page: "screen_twelve",
        label: "12.5.6 Significant Spills",
        subLabel:
          "Add statement about company’s programs for preventing and managing significant spills",
        type: "richTextarea",
        content: significant_spills,
        field: "significant_spills",
        isSkipped: false,
      },
      habitat_protection_restoration_commitment: {
        page: "screen_twelve",
        label: "12.6.2 Habitat Protected and Restored",
        subLabel:
          "Add statement about company’s commitment to protect and restore habitats",
        type: "richTextarea",
        content: habitat_protection_restoration_commitment,
        field: "habitat_protection_restoration_commitment",
        isSkipped: false,
      },
      air_quality_protection_commitment: {
        page: "screen_twelve",
        label: "12.7 Air Quality",
        subLabel:
          "Add statement about company’s commitment to protect and maintain air quality",
        type: "richTextarea",
        content: air_quality_protection_commitment,
        field: "air_quality_protection_commitment",
        isSkipped: false,
      },
      biogenic_c02_emissions_305_3c: {
        page: "screen_twelve",
        label: "305-3-c. Biogenic CO2 emissions",
        subLabel: "",
        type: "richTextarea",
        content: biogenic_c02_emissions_305_3c,
        field: "biogenic_c02_emissions_305_3c",
        isSkipped: false,
      },
      biogenic_c02_emissions: {
        page: "screen_twelve",
        label: "Biogenic CO2 emissions",
        subLabel: "",
        type: "richTextarea",
        content: biogenic_c02_emissions,
        field: "biogenic_c02_emissions",
        isSkipped: false,
      },
      consolidation: {
        page: "screen_twelve",
        label: "Consolidation Approach",
        subLabel: "Add statement about tracking of Consolidation Approach",
        type: "textarea",
        content: consolidation,
        field: "consolidation",
        isSkipped: false,
      },
      base_year: {
        page: "screen_twelve",
        label: "Base Year",
        subLabel: "Add statement about emissions in the Base Year",
        type: "textarea",
        content: base_year,
        field: "base_year",
        isSkipped: false,
      },
    };

    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_twelve/${reportid}/`;
    try {
      const response = await axiosInstance.put(url, data);

      if (response.status === 200) {
        if (type == "next") {
          toast.success("Data added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        if (onSubmitSuccess) {
          onSubmitSuccess(true); // Notify the parent of successful submission
        }
        LoaderClose();
        return true;
      } else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
        return false;
      }
    } catch (error) {
      LoaderClose();
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false; // Indicate failure
    }
  };

  const loadFormData = async () => {
    LoaderOpen();
    dispatch(setEnvironmentStatement(""));
    dispatch(setEmission(""));
    dispatch(setScopeOneEmission(""));
    dispatch(setScopeTwoEmission(""));
    dispatch(setScopeThreeEmission(""));
    dispatch(setGHGEmissionIntensityTracking(""));
    dispatch(setGHGEmissionReductionEfforts(""));
    dispatch(setOzoneDepletingSubstanceElimination(""));
    dispatch(setMaterialManagementStrategy(""));
    dispatch(setRecyclingProcess(""));
    dispatch(setBaseYear(""));
    dispatch(setConsolidation(""));
    dispatch(setReclamationRecyclingProcess(""));
    dispatch(setWaterWithdrawalTracking(""));
    dispatch(setWaterConsumptionGoals(""));
    dispatch(setEnergyConsumptionWithinOrganization(""));
    dispatch(setEnergyConsumptionOutsideOrganization(""));
    dispatch(setEnergyIntensityTracking(""));
    dispatch(setEnergyConsumptionReductionCommitment(""));
    dispatch(setSignificantSpills(""));
    dispatch(setHabitatProtectionRestorationCommitment(""));
    dispatch(setAirQualityProtectionCommitment(""));
    dispatch(setBiogenicCO2Emission(""));
    dispatch(setBiogenicCO2305(""));

    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_twelve/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        setData(response.data);
        dispatch(
          setEnvironmentStatement(
            response.data.environmental_responsibility_statement?.content || ""
          )
        );
        dispatch(setEmission(response.data.emissions?.content || ""));
        dispatch(
          setScopeOneEmission(response.data.scope_one_emissions?.content || "")
        );
        dispatch(
          setScopeTwoEmission(response.data.scope_two_emissions?.content || "")
        );
        dispatch(
          setScopeThreeEmission(
            response.data.scope_three_emissions?.content || ""
          )
        );
        dispatch(
          setGHGEmissionIntensityTracking(
            response.data.ghg_emission_intensity_tracking?.content || ""
          )
        );
        dispatch(
          setGHGEmissionReductionEfforts(
            response.data.ghg_emission_reduction_efforts?.content || ""
          )
        );
        dispatch(
          setOzoneDepletingSubstanceElimination(
            response.data.ozone_depleting_substance_elimination?.content || ""
          )
        );
        dispatch(
          setMaterialManagementStrategy(
            response.data.material_management_strategy?.content || ""
          )
        );
        dispatch(
          setRecyclingProcess(response.data.recycling_process?.content || "")
        );
        dispatch(
          setReclamationRecyclingProcess(
            response.data.reclamation_recycling_process?.content || ""
          )
        );
        dispatch(
          setWaterWithdrawalTracking(
            response.data.water_withdrawal_tracking?.content || ""
          )
        );
        dispatch(
          setWaterConsumptionGoals(
            response.data.water_consumption_goals?.content || ""
          )
        );
        dispatch(
          setEnergyConsumptionWithinOrganization(
            response.data.energy_consumption_within_organization?.content || ""
          )
        );
        dispatch(
          setEnergyConsumptionOutsideOrganization(
            response.data.energy_consumption_outside_organization?.content || ""
          )
        );
        dispatch(
          setEnergyIntensityTracking(
            response.data.energy_intensity_tracking?.content || ""
          )
        );
        dispatch(
          setEnergyConsumptionReductionCommitment(
            response.data.energy_consumption_reduction_commitment?.content || ""
          )
        );
        dispatch(
          setSignificantSpills(response.data.significant_spills?.content || "")
        );
        dispatch(
          setHabitatProtectionRestorationCommitment(
            response.data.habitat_protection_restoration_commitment?.content ||
              ""
          )
        );
        dispatch(
          setAirQualityProtectionCommitment(
            response.data.air_quality_protection_commitment?.content || ""
          )
        );
        dispatch(
          setBiogenicCO2Emission(
            response.data.biogenic_c02_emissions?.content || ""
          )
        );
        dispatch(
          setBiogenicCO2305(
            response.data.biogenic_c02_emissions_305_3c?.content || ""
          )
        );
        dispatch(setBaseYear(response.data.base_year?.content || ""));
        dispatch(setConsolidation(response.data.consolidation?.content || ""));
      }

      LoaderClose();
    } catch (error) {
      console.error("API call failed:", error);
      LoaderClose();
    }
  };

  useEffect(() => {
    // Ensure API is only called once
    if (!apiCalledRef.current && reportid) {
      apiCalledRef.current = true; // Set the flag to true to prevent future calls
      loadFormData(); // Call the API only once
    }
  }, [reportid]);

  return (
    <>
      <div className="mx-2 p-2">
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          12. Environment
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%]  2k:w-[80%] 4k:w-[80%] 2xl:w-[80%]  w-full">
            <Section1 orgName={orgName} />
            <Section2 section12_1Ref={{ section12_1Ref }} data={data} />
          {reportType=='GRI Report: In accordance With' && <Section3 section12_1_1Ref={section12_1_1Ref} data={data} /> }  
            <Section4 section12_1_2Ref={section12_1_2Ref} data={data} reportType={reportType} />
            <Section5 section12_1_3Ref={section12_1_3Ref} data={data} reportType={reportType} />
            <Section6 section12_1_4Ref={section12_1_4Ref} data={data} reportType={reportType} />
            <Section7
              section12_1_5Ref={section12_1_5Ref}
              section12_1_6Ref={section12_1_6Ref}
              section12_1_7Ref={section12_1_7Ref}
              data={data}
              reportType={reportType}
            />
            <Section8 section12_1_8Ref={section12_1_8Ref} data={data} reportType={reportType} />
            <Section9 section12_1_9Ref={section12_1_9Ref} data={data} reportType={reportType} />
            <Section10 section12_2Ref={section12_2Ref} data={data} reportType={reportType} />
           {reportType=='GRI Report: In accordance With' && <Section11 section12_2_1Ref={section12_2_1Ref} data={data} reportType={reportType} />} 
            <Section12 section12_2_2Ref={section12_2_2Ref} data={data} reportType={reportType} />
            <Section13 section12_2_3Ref={section12_2_3Ref} data={data} reportType={reportType} />
            <Section14 section12_3Ref={section12_3Ref} data={data} reportType={reportType} />
          {reportType=='GRI Report: In accordance With' &&  <Section15 section12_3_1Ref={section12_3_1Ref} data={data} reportType={reportType} />} 
            <Section16 section12_3_2Ref={section12_3_2Ref} data={data} reportType={reportType} />
            <Section17 section12_3_3Ref={section12_3_3Ref} data={data} reportType={reportType} />
            <Section18 section12_3_4Ref={section12_3_4Ref} data={data} reportType={reportType} />
            <Section19
              section12_4_1Ref={section12_4_1Ref}
              section12_4Ref={section12_4Ref}
              data={data}
              reportType={reportType}
            />
            <Section20 section12_4_2Ref={section12_4_2Ref} data={data} reportType={reportType} />
            <Section21 section12_4_3Ref={section12_4_3Ref} data={data} reportType={reportType} />
            <Section22 section12_4_4Ref={section12_4_4Ref} data={data} reportType={reportType} />
            <Section23 section12_4_5Ref={section12_4_5Ref} data={data} reportType={reportType}/>
            <Section24
              section12_5_1Ref={section12_5_1Ref}
              section12_5Ref={section12_5Ref}
              data={data}
              reportType={reportType}
            />
            <Section25 section12_5_2Ref={section12_5_2Ref} data={data} reportType={reportType} />
            <Section26 section12_5_3Ref={section12_5_3Ref} data={data} reportType={reportType} />
            <Section27 section12_5_4Ref={section12_5_4Ref} data={data} reportType={reportType} />
            <Section28 section12_5_5Ref={section12_5_5Ref} data={data} reportType={reportType} />
            <Section29
              section12_5_6Ref={section12_5_6Ref}
              orgName={orgName}
              data={data}
              reportType={reportType}
            />
            <Section30 section12_6Ref={section12_6Ref} data={data} reportType={reportType} />
          {reportType=='GRI Report: In accordance With' && <Section31 section12_6_1Ref={section12_6_1Ref} data={data} reportType={reportType} />}
            <Section32 section12_6_2Ref={section12_6_2Ref} data={data} reportType={reportType} />
            <Section33 section12_7Ref={section12_7Ref} data={data} reportType={reportType} />
          {reportType=='GRI Report: In accordance With' &&  <Section34 section12_7_1Ref={section12_7_1Ref} data={data} reportType={reportType} />}
          </div>
          {/* page sidebar */}

          <div
            className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-fit top-20 sticky mt-2 w-[20%] md:w-[25%] lg:w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36  md:fixed 
  md:top-[19rem]
  md:right-4  hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block"
          >
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              12. Environment
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section12_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_1Ref, "section12_1")}
            >
              12.1. Emissions
            </p>
            {
              reportType=='GRI Report: In accordance With'?(
                <p
                className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                  activeSection === "section12_1_1" ? "text-blue-400" : ""
                }`}
                onClick={() => scrollToSection(section12_1_1Ref, "section12_1_1")}
              >
                12.1.1. Management of Material Topics
              </p>
              ):(
                <div></div>
              )
            }

           
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_1_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_1_2Ref, "section12_1_2")}
            >
            {reportType=='GRI Report: In accordance With'?'12.1.2.':'12.1.1.'}  Scope 1 GHG Emissions
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_1_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_1_3Ref, "section12_1_3")}
            >
            {reportType=='GRI Report: In accordance With'?'12.1.3.':'12.1.2.'}  Scope 2 GHG Emissions
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_1_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_1_4Ref, "section12_1_4")}
            >
             {reportType=='GRI Report: In accordance With'?'12.1.4.':'12.1.3.'} Scope 3 GHG Emissions
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_1_5" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_1_5Ref, "section12_1_5")}
            >
             {reportType=='GRI Report: In accordance With'?'12.1.5.':'12.1.4.'} Base Year
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_1_6" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_1_6Ref, "section12_1_6")}
            >
            {reportType=='GRI Report: In accordance With'?'12.1.6.':'12.1.5.'}  Consolidation Approach
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_1_7" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_1_7Ref, "section12_1_7")}
            >
            {reportType=='GRI Report: In accordance With'?'12.1.7.':'12.1.6.'} GHG emission intensity
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_1_8" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_1_8Ref, "section12_1_8")}
            >
            {reportType=='GRI Report: In accordance With'?'12.1.8.':'12.1.7.'}  Reduction in GHG emissions 
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_1_9" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_1_9Ref, "section12_1_9")}
            >
             {reportType=='GRI Report: In accordance With'?'12.1.9.':'12.1.8.'}  Ozone depleting substances
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section12_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_2Ref, "section12_2")}
            >
              12.2. Materials
            </p>
            {reportType=='GRI Report: In accordance With'?(
                <p
                className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                  activeSection === "section12_2_1" ? "text-blue-400" : ""
                }`}
                onClick={() => scrollToSection(section12_2_1Ref, "section12_2_1")}
              >
                12.2.1. Management of Material Topics
              </p>
            ):(
              <div></div>
            )}
            
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_2_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_2_2Ref, "section12_2_2")}
            >
            {reportType=='GRI Report: In accordance With'?'12.2.2.':'12.2.1.'}   Recycled input materials used
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_2_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_2_3Ref, "section12_2_3")}
            >
            {reportType=='GRI Report: In accordance With'?'12.2.3.':'12.2.2.'} Reclaimed products and their packaging materials
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section12_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_3Ref, "section12_3")}
            >
              12.3. Water
            </p>
            {reportType=='GRI Report: In accordance With'?(
                <p
                className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                  activeSection === "section12_3_1" ? "text-blue-400" : ""
                }`}
                onClick={() => scrollToSection(section12_3_1Ref, "section12_3_1")}
              >
                12.3.1. Management of Material Topic
              </p>
            ):(
              <div></div>
            )} 
            
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_3_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_3_2Ref, "section12_3_2")}
            >
             {reportType=='GRI Report: In accordance With'?'12.3.2.':'12.3.1.'}  Water withdrawal
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_3_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_3_3Ref, "section12_3_3")}
            >
            {reportType=='GRI Report: In accordance With'?'12.3.3.':'12.3.2.'}   Water discharge & management of associated impact
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_3_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_3_4Ref, "section12_3_4")}
            >
            {reportType=='GRI Report: In accordance With'?'12.3.4.':'12.3.3.'}  Water Consumption
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section12_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_4Ref, "section12_4")}
            >
              12.4. Energy
            </p>
            {reportType=='GRI Report: In accordance With'?(
              <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_4_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_4_1Ref, "section12_4_1")}
            >
              12.4.1. Management of Material Topics
            </p>
            ):(
              <div></div>
            )}
            
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_4_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_4_2Ref, "section12_4_2")}
            >
            {reportType=='GRI Report: In accordance With'?'12.4.2':'12.4.1'}   Energy consumption within the organisation
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_4_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_4_3Ref, "section12_4_3")}
            >
            {reportType=='GRI Report: In accordance With'?'12.4.3':'12.4.2'}  Energy consumption outside of the organisation
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_4_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_4_4Ref, "section12_4_4")}
            >
            {reportType=='GRI Report: In accordance With'?'12.4.4':'12.4.3'}  Energy intensity
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_4_5" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_4_5Ref, "section12_4_5")}
            >
            {reportType=='GRI Report: In accordance With'?'12.4.5':'12.4.4'} Reduction in energy consumption 
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section12_5" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_5Ref, "section12_5")}
            >
              12.5. Waste
            </p>
            {reportType=='GRI Report: In accordance With'?(
              <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_5_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_5_1Ref, "section12_5_1")}
            >
              12.5.1. Management of Material Topics
            </p>
            ):(
              <div></div>
            )}
            
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_5_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_5_2Ref, "section12_5_2")}
            >
            {reportType=='GRI Report: In accordance With'?'12.5.2.':'12.5.1.'}   Waste generation and impacts
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_5_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_5_3Ref, "section12_5_3")}
            >
            {reportType=='GRI Report: In accordance With'?'12.5.3.':'12.5.2.'} Management of waste related impacts
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_5_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_5_4Ref, "section12_5_4")}
            >
            {reportType=='GRI Report: In accordance With'?'12.5.4.':'12.5.3.'}  Waste disposed
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_5_5" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_5_5Ref, "section12_5_5")}
            >
            {reportType=='GRI Report: In accordance With'?'12.5.5.':'12.5.4.'}  Waste diverted from disposal
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_5_6" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_5_6Ref, "section12_5_6")}
            >
            {reportType=='GRI Report: In accordance With'?'12.5.6.':'12.5.5.'}  Significant Spills
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section12_6" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_6Ref, "section12_6")}
            >
              12.6. Biodiversity
            </p>
            {reportType=='GRI Report: In accordance With'?(
                 <p
                 className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                   activeSection === "section12_6_1" ? "text-blue-400" : ""
                 }`}
                 onClick={() => scrollToSection(section12_6_1Ref, "section12_6_1")}
               >
                 12.6.1. Management of Material Topic
               </p>
            ):( 
              <div></div>
            )}  
           
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section12_6_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_6_2Ref, "section12_6_2")}
            >
             {reportType=='GRI Report: In accordance With'?'12.6.2.':'12.6.1.'}  Habitat protected and restored
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section12_7" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section12_7Ref, "section12_7")}
            >
              12.7. Air Quality 
            </p>
            {reportType=='GRI Report: In accordance With'?(
               <p
               className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                 activeSection === "section12_7_1" ? "text-blue-400" : ""
               }`}
               onClick={() => scrollToSection(section12_7_1Ref, "section12_7_1")}
             >
               12.7.1. Management of Material Topics
             </p>
            ):(
              <div></div>
            )}
           
          </div>
        </div>
      </div>

      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </>
  );
});

export default Environment;
