import React, { useState, useEffect } from "react";
import { MdPerson, MdChevronRight } from "react-icons/md";
import PermissionToggle from "../../common/PermissionToggle";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation"; // Correct import for Next.js 13 App Router
import { addUser, setCurrentUser, updateUser } from "../../../../../lib/redux/features/userSlice";
import UserAddedModal from "../../common/UserModal";

const PermissionsForm = ({ onPrev, onNext, reset }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams(); // Access search params using Next.js's useSearchParams
  const [permissions, setPermissions] = useState({
    collect: true,
    analyse: true,
    report: false,
    optimise: false,
    track: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [overrideEnabled, setOverrideEnabled] = useState(false);
  const currentUser = useSelector((state) => state.users.currentUser);
  const edit = searchParams.get("edit") === "true"; // Check if "edit" query param is present

  // Toggle individual permissions only if override is enabled
  const handleChange = (name) => {
    if (overrideEnabled) {
      setPermissions((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }
  };

  const handleOverrideChange = () => {
    const newState = !overrideEnabled;
    setOverrideEnabled(newState);
  };

  // Pre-fill the permissions based on the currentUser when in edit mode
  useEffect(() => {
    if (edit && currentUser?.permissions) {
      setPermissions({
        collect: currentUser.permissions.collect || false,
        analyse: currentUser.permissions.analyse || false,
        report: currentUser.permissions.report || false,
        optimise: currentUser.permissions.optimise || false,
        track: currentUser.permissions.track || false,
      });
    }
  }, [edit, currentUser]); // Dependencies on edit mode and currentUser changes

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      personalDetails: currentUser.personalDetails,
      organizationDetails: currentUser.organizationDetails,
      permissions: permissions,
    };

    if (edit) {
      // If editing, update the existing user
      dispatch(
        updateUser({ id: currentUser.personalDetails.id, updates: userData })
      );
      onNext({ ...permissions });
    } else {
      // If creating new user
      onNext({ ...permissions });
      dispatch(addUser());
    }

    setIsSubmitted(true);
  };

  const addNewUser = () => {
    dispatch(setCurrentUser({}));
    reset();
  };

  const descriptions = {
    collect:
      "Enabling this module allows the user to enter and amend data in the Environment, Social, Governance, General, and Economic areas.",
    analyse:
      "Enabling this module allows the user to view and analyse data under the Environment, Social, Governance, General, and Economic areas.",
    report:
      "Enabling this module allows the user to access, generate and edit reports for the organization for a given time period.",
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white">
          <div className="p-4 rounded-lg border-2 border-[#e6e6e6]">
            <div className="mb-4 flex justify-between items-center gradient-background p-4">
              <label className="flex items-center gap-2 text-[#405261]">
                Override default permission
              </label>
              <input
                type="checkbox"
                className=""
                checked={overrideEnabled}
                onChange={handleOverrideChange}
              />
            </div>
            <div className={`px-4 ${!overrideEnabled ? "opacity-50" : ""}`}>
              {Object.keys(permissions).map((key) => (
                <PermissionToggle
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  description={descriptions[key]}
                  enabled={permissions[key]}
                  onChange={() => handleChange(key)}
                  disabled={!overrideEnabled}
                />
              ))}
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
            type="submit"
            className="mt-4 bg-[#007eef] hover:shadow-lg text-[12px] text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 shadow whitespace-nowrap"
          >
            <span className="text-[12px] font-['Manrope']">
              {edit
                ? "Save Permissions & Update User"
                : "Save Permissions & Create User"}
            </span>
          </button>
        </div>
      </form>
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
            <UserAddedModal addNewUser={addNewUser} edit={edit} />
          </div>
        </div>
      )}
    </>
  );
};

export default PermissionsForm;
