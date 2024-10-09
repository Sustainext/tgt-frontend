"use client";
import React, { useEffect, useState } from "react";
import CheckboxTable from "../../common/CheckboxTable";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation"; 
import { MdPerson, MdChevronRight } from "react-icons/md";
import axiosInstance from "@/app/utils/axiosMiddleware";

const OrganizationDetailsForm = ({ onNext, onPrev }) => {
  const [organizations, setOrganizations] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [locations, setLocations] = useState([]);

  const [selectedOrg, setSelectedOrg] = useState(null); // For storing selected org ID
  const [selectedCorp, setSelectedCorp] = useState(null); // For storing selected corporate ID

const [loadingOrganizations, setLoadingOrganizations] = useState(true);
const [loadingCorporates, setLoadingCorporates] = useState(false);
const [loadingLocations, setLoadingLocations] = useState(false);
  const [selections, setSelections] = useState({
    organization: [],
    corporate: [],
    location: [],
  });

  // Handle toggle for selections
  const handleToggle = (category, value) => {
    setSelections((prev) => {
      const newSelections = {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };

      if (category === "organization") {
        // Reset corporates and locations when organization changes
        setSelectedOrg(value); // Set the selected organization
        setCorporates([]); // Clear corporates when organization changes
        setLocations([]); // Clear locations when organization changes
        newSelections.corporate = [];
        newSelections.location = [];
      }

      if (category === "corporate") {
        // Reset locations when corporate changes
        setSelectedCorp(value); // Set the selected corporate
        setLocations([]); // Clear locations when corporate changes
        newSelections.location = [];
      }

      return newSelections;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ ...selections });
    console.log("test org",selections);
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
  const currentUser = useSelector((state) => state.users.currentUser);

  // Pre-fill selections when in edit mode
  useEffect(() => {
    if (edit && currentUser.organizationDetails) {
      const { organization, corporate, location } =
        currentUser.organizationDetails;

      setSelections({
        organization: organization || [],
        corporate: corporate || [],
        location: location || [],
      });

      if (organization && organization.length > 0) {
        setSelectedOrg(organization[0]);

        if (corporate && corporate.length > 0) {
          setSelectedCorp(corporate[0]);
        }
      }
    }
  }, [edit, currentUser]);

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
            tooltipContent={`Select one or more organizations.`}
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
            tooltipContent={`Select one or more corporates based on the selected organization.`}
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
            tooltipContent={`Select one or more locations based on the selected corporate.`}
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
            className="bg-[#007eef]   hover:shadow-lg text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 shadow"
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
