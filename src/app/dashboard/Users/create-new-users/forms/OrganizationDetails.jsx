"use client";
import React, { useEffect, useState } from "react";
import CheckboxTable from "../../common/CheckboxTable";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch and useSelector
import { useSearchParams } from "next/navigation"; 
import { MdPerson, MdChevronRight } from "react-icons/md";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { setOrgList, setCorpList, setLocList } from "../../../../../lib/redux/features/roles-permissionsSlice"; // Import Redux actions

const OrganizationDetailsForm = ({ onNext, onPrev }) => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const [organizations, setOrganizations] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [locations, setLocations] = useState([]);

  const [selectedOrg, setSelectedOrg] = useState(null); // For storing selected org ID
  const [selectedCorp, setSelectedCorp] = useState(null); // For storing selected corporate ID

  const [loadingOrganizations, setLoadingOrganizations] = useState(true);
  const [loadingCorporates, setLoadingCorporates] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);
  
  const selections = useSelector((state) => ({
    organization: state.roleprmission.org_list,
    corporate: state.roleprmission.corp_list,
    location: state.roleprmission.loc_list,
  }));

  // Handle toggle for selections
 const handleToggle = (category, value) => {
  switch (category) {
    case "organization":
      const newOrgList = selections.organization.includes(value)
        ? selections.organization.filter((item) => item !== value)
        : [...selections.organization, value];
      dispatch(setOrgList(newOrgList)); // Dispatch updated org list to Redux
      setCorporates([]); // Clear corporates when organization changes
      setLocations([]); // Clear locations when organization changes
      dispatch(setCorpList([])); // Clear corporate list in Redux
      dispatch(setLocList([])); // Clear location list in Redux
      break;
    case "corporate":
      const newCorpList = selections.corporate.includes(value)
        ? selections.corporate.filter((item) => item !== value)
        : [...selections.corporate, value];
      dispatch(setCorpList(newCorpList)); // Dispatch updated corporate list to Redux
      setLocations([]); // Clear locations when corporate changes
      dispatch(setLocList([])); // Clear location list in Redux
      break;
    case "location":
      const newLocList = selections.location.includes(value)
        ? selections.location.filter((item) => item !== value)
        : [...selections.location, value];
      dispatch(setLocList(newLocList)); // Dispatch updated location list to Redux
      break;
    default:
      break;
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ ...selections });
    console.log("test org", selections);
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoadingOrganizations(true); // Start loading organizations
      try {
        const response = await axiosInstance.get(`/orggetonly`);
        setOrganizations(response.data);
      } catch (error) {
        console.error("Failed fetching organizations:", error);
      } finally {
        setLoadingOrganizations(false); // Stop loading organizations
      }
    };

    fetchOrganizations();
  }, []);

  // Fetch corporates based on selected organizations
  useEffect(() => {
    const fetchCorporates = async () => {
      if (selections.organization.length > 0) {
        setLoadingCorporates(true); // Start loading corporates
        try {
          const response = await axiosInstance.get(`/sustainapp/roles/corporates/`, {
            params: { organization_ids: selections.organization.join(",") }, // Pass comma-separated organization IDs
          });
          setCorporates(response.data);
        } catch (error) {
          console.error("Failed fetching corporates:", error);
        } finally {
          setLoadingCorporates(false); // Stop loading corporates
        }
      }
    };
    fetchCorporates();
  }, [selections.organization]);

  // Fetch locations based on selected corporates
  useEffect(() => {
    const fetchLocations = async () => {
      if (selections.corporate.length > 0) {
        setLoadingLocations(true); // Start loading locations
        try {
          const response = await axiosInstance.get(`/sustainapp/roles/locations/`, {
            params: { corporate_ids: selections.corporate.join(",") }, // Pass comma-separated corporate IDs
          });
          setLocations(response.data || []);
        } catch (error) {
          console.error("Failed fetching locations:", error);
          setLocations([]);
        } finally {
          setLoadingLocations(false); // Stop loading locations
        }
      }
    };
    fetchLocations();
  }, [selections.corporate]);

  const searchParams = useSearchParams();
  const edit = searchParams.get("edit") === "true"; // Check if in edit mode
  const currentUser = useSelector((state) => state.roleprmission.userlist);

  // Pre-fill selections when in edit mode
  useEffect(() => {
    if (edit && currentUser) {
      // Extract IDs from orgs, corps, locs arrays
      const orgIds = currentUser.orgs ? currentUser.orgs.map(org => org.id) : [];
      const corpIds = currentUser.corps ? currentUser.corps.map(corp => corp.id) : [];
      const locIds = currentUser.locs ? currentUser.locs.map(loc => loc.id) : [];
  
      // Dispatch the extracted IDs to Redux
      dispatch(setOrgList(orgIds));
      dispatch(setCorpList(corpIds));
      dispatch(setLocList(locIds));
  
      // Set the selected organization and corporate (optional)
      if (orgIds.length > 0) {
        setSelectedOrg(orgIds[0]); // Selecting the first organization by default
      }
      if (corpIds.length > 0) {
        setSelectedCorp(corpIds[0]); // Selecting the first corporate by default
      }
    }
    else {
      // Clear form fields if not editing
      dispatch(setOrgList([]));
      dispatch(setCorpList([]));
      dispatch(setLocList([]));
    }
  }, [edit, currentUser, dispatch]);

  return (
    <div className="py-6">
      <div className="flex justify-items-center items-center gap-2 mt-6 mb-2">
        <MdPerson className="text-[#68737D] text-[18px]" />
        <div className="text-[#0f1728] text-[18px] font-medium font-['Manrope'] leading-7">
          Organization Details
        </div>
      </div>
      <div className="text-[#667084] text-[14px] font-normal font-['Manrope'] leading-tight mb-6">
        Select the relevant Organization, Corporate, and Location from the list.
        This will map the user to the selected hierarchy, allowing them to view
        and interact with data based on these selections.
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-6">
          {/* Organizations */}
          <CheckboxTable
            title="Select Organizations"
            options={organizations}
            onToggle={(item) => handleToggle("organization", item)} // Select an org
            selections={selections.organization}
            isParent={false}
            tooltipContent={`This list is generated from the Organisation Structure section. You can elect one or more organizations to map new users. This selection determines which organizations the users can interact with.`}
            loading={loadingOrganizations}
          />

          {/* Corporates */}
          <CheckboxTable
            title="Select Corporates"
            options={corporates}
            filedname={organizations}
            onToggle={(item) => handleToggle("corporate", item)} // Select a corporate
            selections={selections.corporate}
            isParent={true}
            tooltipContent={`This list is generated based on the organization selected in the previous column. You may select one or more corporates. This selection determines which corporates the users can interact with.`}
            loading={loadingCorporates}
          />

          {/* Locations */}
          <CheckboxTable
            title="Select Locations"
            filedname={corporates}
            options={locations}
            onToggle={(item) => handleToggle("location", item)} // Select a location
            selections={selections.location}
            isParent={true}
            tooltipContent={`This list is generated based on the Corporate selected in the previous column. You may select one or more Locations. This selection determines which Locations the users can interact with.`}
            loading={loadingLocations}
          />
        </div>
        <div className="flex justify-end items-center gap-1">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 text-[12px]"
          >
            <MdChevronRight className="w-4 h-4 rotate-180" />
            <span>Previous</span>
          </button>
          <button
            type="submit"
            className="bg-[#007eef] hover:shadow-lg text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 shadow"
          >
            <span className="text-[12px] font-['Manrope']">Next</span>
            <MdChevronRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationDetailsForm;
