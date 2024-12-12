import React, { useState, useEffect } from "react";
import { MdPerson, MdChevronRight } from "react-icons/md";
import PermissionToggle from "../../common/PermissionToggle";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation"; // Correct import for Next.js 13 App Router
import {
  setCollect,
  setAnalyse,
  setReport,
  setOptimise,
  setTrack,
  setPermissionscheckbox,
  setOrgList,
  setCorpList,
  setLocList,
  setfirstname,
  setlastname,
  setjobtitle,
  setdepartment,
  setworkemail,
  setroletype,
  setphonenumber,
} from "../../../../../lib/redux/features/roles-permissionsSlice";
import UserAddedModal from "../../common/UserModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
const PermissionsForm = ({ onPrev, onNext, reset }) => {
  const [loopen, setLoOpen] = useState(false);
  const dispatch = useDispatch();
  const searchParams = useSearchParams(); // Access search params using Next.js's useSearchParams
  const first_name = useSelector((state) => state.roleprmission.first_name);
  const last_name = useSelector((state) => state.roleprmission.last_name);
  const phone_number = useSelector((state) => state.roleprmission.phone_number);
  const job_title = useSelector((state) => state.roleprmission.job_title);
  const department = useSelector((state) => state.roleprmission.department);
  const role_type = useSelector((state) => state.roleprmission.role_type);
  const org_list = useSelector((state) => state.roleprmission.org_list);
  const corp_list = useSelector((state) => state.roleprmission.corp_list);
  const loc_list = useSelector((state) => state.roleprmission.loc_list);
  const work_email = useSelector((state) => state.roleprmission.work_email);

  // Get the state from Redux
  const { collect, analyse, report, optimise, track, permissions_checkbox } =
    useSelector((state) => state.roleprmission);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const edit = searchParams.get("edit") === "true"; // Check if "edit" query param is present
  const currentUser = useSelector((state) => state.roleprmission.userlist);

  // Toggle individual permissions based on `permissions_checkbox`
  const handleChange = (name) => {
    if (permissions_checkbox) {
      switch (name) {
        case "collect":
          dispatch(setCollect(!collect));
          break;
        case "analyse":
          dispatch(setAnalyse(!analyse));
          break;
        case "report":
          dispatch(setReport(!report));
          break;
        case "optimise":
          dispatch(setOptimise(!optimise));
          break;
        case "track":
          dispatch(setTrack(!track));
          break;
        default:
          break;
      }
    }
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleOverrideChange = () => {
    dispatch(setPermissionscheckbox(!permissions_checkbox));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    LoaderOpen();
    // Construct the simplified data object
    const data = {
      username: work_email || "",
      email: work_email || "",
      first_name: first_name || "",
      last_name: last_name || "",
      phone_number: phone_number || "",
      job_title: job_title || "",
      department: department || "",
      work_email: work_email || "",
      custom_role: role_type || "",
      // Permissions
      collect: collect || false,
      analyse: analyse || false,
      report: report || false,
      optimise: optimise || false,
      track: track || false,
      permissions_checkbox: permissions_checkbox || false,

     
      orgs: org_list.length ? org_list : [],
      corps: corp_list.length ? corp_list : [],
      locs: loc_list.length ? loc_list : [],
    };

    const url = edit
      ? `${process.env.BACKEND_API_URL}/api/auth/manage_user/${currentUser.id}/`
      : `${process.env.BACKEND_API_URL}/api/auth/create-customuser/`;

    try {
      const response = edit
        ? await axiosInstance.patch(url, data) // Use PATCH for editing
        : await axiosInstance.post(url, data); // Use POST for creating

      if (response.status === 201 || response.status === 200) {
        toast.success(
          edit ? "User updated successfully" : "User created successfully",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setIsSubmitted(true);
        onNext();
        LoaderClose();
      } else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
        });
        LoaderClose();
      }
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;

        // Check if both username and email errors exist
        if (errorData.username && errorData.email) {
          toast.error("Username and email already exist.", {
            position: "top-right",
            autoClose: 3000,
          });
          LoaderClose();
        } else {
          toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 1000,
          });
          LoaderClose();
        }
      } else if (error.request) {
        console.error("Request error:", error.request);
        LoaderClose();
      } else {
        console.error("Error message:", error.message);
        LoaderClose();
      }
    }
  };

  const addNewUser = () => {
    dispatch(setCollect(true));
    dispatch(setAnalyse(true));
    dispatch(setReport(false));
    dispatch(setOptimise(false));
    dispatch(setTrack(false));
    dispatch(setPermissionscheckbox(false));
    dispatch(setOrgList([]));
    dispatch(setCorpList([]));
    dispatch(setLocList([]));
    dispatch(setfirstname(""));
    dispatch(setlastname(""));
    dispatch(setjobtitle(""));
    dispatch(setdepartment(""));
    dispatch(setworkemail(""));
    dispatch(setroletype(""));
    dispatch(setphonenumber(""));
    reset();
  };

  useEffect(() => {
    const isAdmin = role_type === "Admin"; 

    if (isAdmin) {
      // If admin, enable all permissions by default
      dispatch(setCollect(true));
      dispatch(setAnalyse(true));
      dispatch(setReport(true));
      dispatch(setOptimise(true));
      dispatch(setTrack(true));
      dispatch(setPermissionscheckbox(false)); // Override default permissions
    }
    else if (edit && currentUser) {
      dispatch(setCollect(currentUser.collect || false));
      dispatch(setAnalyse(currentUser.analyse || false));
      dispatch(setReport(currentUser.report || false));
      dispatch(setOptimise(currentUser.optimise || false));
      dispatch(setTrack(currentUser.track || false));
      dispatch(setPermissionscheckbox(currentUser.permissions_checkbox || false));
    } else {
      dispatch(setCollect(true));
      dispatch(setAnalyse(true));
      dispatch(setReport(false));
      dispatch(setOptimise(false));
      dispatch(setTrack(false));
      dispatch(setPermissionscheckbox(false));
    }
  }, [edit, currentUser]); // Dependencies on edit mode and currentUser changes

  const descriptions = {
    collect:
      "This module gives user permission to enter or modify data in the Environment, Social, Governance, General and Economic sections.",
    analyse:
      "This module gives user permission to view and analyse the data under Environment, Social, Governance, General and Economic sections.",
    report:
      "This module gives user permission to access, generate and edit reports for the organization for a given time period.",
    optimise:
      "This module gives user to optimize the sustainability practices through data analysis, scenario planning, benchmarking, and setting science-based targets.",
    track:
      "This module allows users to monitor their sustainability metrics, including carbon emissions and other ESG data, in real-time.",
  };

  return (
    <>
      <div className="flex justify-items-center items-center gap-2 mt-6 mb-2">
        <MdPerson />
        <div className="text-[#0f1728] text-md font-medium font-['Manrope'] leading-7">
          Permissions
        </div>
      </div>
      <div className="text-[#667084] text-sm font-normal font-['Manrope'] leading-tight mb-6">
        Select the modules from below for which the user can have access to.
      </div>

      <div className="bg-white">
        <div className="p-4 rounded-lg border-2 border-[#e6e6e6]">
          <div className="mb-4 flex justify-between items-center gradient-background p-4">
            <label className="flex items-center gap-2 text-[#405261]">
              Override default permission
            </label>
            <input
              type="checkbox"
              className=""
              value={permissions_checkbox}
              checked={permissions_checkbox}
              onChange={handleOverrideChange}
            />
          </div>
          <div className={`px-4 ${!permissions_checkbox ? "opacity-50" : ""}`}>
            <PermissionToggle
              label="Collect"
              description={descriptions.collect}
              enabled={collect}
              onChange={() => handleChange("collect")}
              disabled={!permissions_checkbox}
            />
            <PermissionToggle
              label="Analyse"
              description={descriptions.analyse}
              enabled={analyse}
              onChange={() => handleChange("analyse")}
              disabled={!permissions_checkbox}
            />
            <PermissionToggle
              label="Report"
              description={descriptions.report}
              enabled={report}
              onChange={() => handleChange("report")}
              disabled={!permissions_checkbox}
            />
            <PermissionToggle
              label="Optimise"
              description={descriptions.optimise}
              enabled={optimise}
              onChange={() => handleChange("optimise")}
              disabled={!permissions_checkbox}
            />
            <PermissionToggle
              label="Track"
              description={descriptions.track}
              enabled={track}
              onChange={() => handleChange("track")}
              disabled={!permissions_checkbox}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center mt-[4rem]">
        <button
          className="mt-4 bg-transparent text-black/40 font-bold py-2 px-4 rounded flex justify-center items-center gap-2"
          onClick={onPrev}
        >
          <MdChevronRight className="w-4 h-4 rotate-180" />
          <div className="text-black/40 text-[12px] font-bold font-['Manrope'] leading-[15px]">
            Previous
          </div>
        </button>
        <button
          type="button"
          className="mt-4 bg-[#007eef] hover:shadow-lg text-[12px] text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 shadow whitespace-nowrap"
          onClick={handleSubmit} // Add the onClick handler here
        >
          <span className="text-[12px] font-['Manrope']">
            {edit
              ? "Save Changes"
              : "Save Permissions & Create User"}
          </span>
        </button>
      </div>

      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
            <UserAddedModal addNewUser={addNewUser} edit={edit} />
          </div>
        </div>
      )}
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
      {/* ToastContainer for showing toast notifications */}
      <ToastContainer />
    </>
  );
};

export default PermissionsForm;
