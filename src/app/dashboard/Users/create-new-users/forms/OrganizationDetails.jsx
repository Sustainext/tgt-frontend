"use client";
import React, { useEffect, useState } from "react";
import CheckboxTable from "../../common/CheckboxTable";
import { useSelector, useDispatch } from "react-redux";
import { MdPerson, MdChevronRight } from "react-icons/md";
import axiosInstance from "@/app/utils/axiosMiddleware";
import {
  setOrgList,
  setCorpList,
  setLocList,
} from "../../../../../lib/redux/features/roles-permissionsSlice";
import { useSearchParams } from "next/navigation";
const OrganizationDetailsForm = ({ onNext, onPrev }) => {
  const dispatch = useDispatch();
  const [organizations, setOrganizations] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loadingOrganizations, setLoadingOrganizations] = useState(true);
  const [loadingCorporates, setLoadingCorporates] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit") === "true"; // Check if in edit mode
  const currentUser = useSelector((state) => state.roleprmission.userlist);
  const selections = useSelector((state) => ({
    organization: state.roleprmission.org_list,
    corporate: state.roleprmission.corp_list,
    location: state.roleprmission.loc_list,
  }));

  const handleToggle = async (category, value) => {
    switch (category) {
      case "organization":
        const newOrgList = selections.organization.includes(value)
          ? selections.organization.filter((item) => item !== value)
          : [...selections.organization, value];

        dispatch(setOrgList(newOrgList));

        try {
          const response = await axiosInstance.get(
            `/sustainapp/roles/corporates/`,
            {
              params: { organization_ids: newOrgList.join(",") },
            }
          );
          const validCorporates = response.data || [];
          setCorporates(validCorporates);

          const updatedCorpList = selections.corporate.filter((corp) =>
            validCorporates.some((c) => c.id === corp)
          );
          dispatch(setCorpList(updatedCorpList));
        } catch (error) {
          console.error("Error fetching corporates:", error);
          setCorporates([]);
          dispatch(setCorpList([]));
        }

        try {
          const response = await axiosInstance.get(
            `/sustainapp/roles/locations/`,
            {
              params: { corporate_ids: selections.corporate.join(",") },
            }
          );
          const validLocations = response.data || [];
          setLocations(validLocations);

          const updatedLocList = selections.location.filter((loc) =>
            validLocations.some((l) => l.id === loc)
          );
          dispatch(setLocList(updatedLocList));
        } catch (error) {
          console.error("Error fetching locations:", error);
          setLocations([]);
          dispatch(setLocList([]));
        }
        break;

      case "corporate":
        const newCorpList = selections.corporate.includes(value)
          ? selections.corporate.filter((item) => item !== value)
          : [...selections.corporate, value];
        dispatch(setCorpList(newCorpList));

        try {
          const response = await axiosInstance.get(
            `/sustainapp/roles/locations/`,
            {
              params: { corporate_ids: newCorpList.join(",") },
            }
          );
          const validLocations = response.data || [];
          setLocations(validLocations);

          const updatedLocList = selections.location.filter((loc) =>
            validLocations.some((l) => l.id === loc)
          );
          dispatch(setLocList(updatedLocList));
        } catch (error) {
          console.error("Error fetching locations:", error);
          setLocations([]);
          dispatch(setLocList([]));
        }
        break;

      case "location":
        const newLocList = selections.location.includes(value)
          ? selections.location.filter((item) => item !== value)
          : [...selections.location, value];
        dispatch(setLocList(newLocList));
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ ...selections });
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoadingOrganizations(true);
      try {
        const response = await axiosInstance.get(`/orggetonly`);
        setOrganizations(response.data);
      } catch (error) {
        console.error("Failed fetching organizations:", error);
      } finally {
        setLoadingOrganizations(false);
      }
    };

    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (selections.organization.length > 0) {
      const fetchCorporates = async () => {
        setLoadingCorporates(true);
        try {
          const response = await axiosInstance.get(
            `/sustainapp/roles/corporates/`,
            {
              params: { organization_ids: selections.organization.join(",") },
            }
          );
          const validCorporates = response.data || [];
          setCorporates(validCorporates);

          const updatedCorpList = selections.corporate.filter((corp) =>
            validCorporates.some((c) => c.id === corp)
          );
          dispatch(setCorpList(updatedCorpList));
        } catch (error) {
          console.error("Error fetching corporates:", error);
          setCorporates([]);
          dispatch(setCorpList([]));
        } finally {
          setLoadingCorporates(false);
        }
      };

      fetchCorporates();
    }
  }, [selections.organization]);

  useEffect(() => {
    if (selections.corporate.length > 0) {
      const fetchLocations = async () => {
        setLoadingLocations(true);
        try {
          const response = await axiosInstance.get(
            `/sustainapp/roles/locations/`,
            {
              params: { corporate_ids: selections.corporate.join(",") },
            }
          );
          const validLocations = response.data || [];
          setLocations(validLocations);

          const updatedLocList = selections.location.filter((loc) =>
            validLocations.some((l) => l.id === loc)
          );
          dispatch(setLocList(updatedLocList));
        } catch (error) {
          console.error("Error fetching locations:", error);
          setLocations([]);
          dispatch(setLocList([]));
        } finally {
          setLoadingLocations(false);
        }
      };

      fetchLocations();
    }
  }, [selections.corporate]);

  useEffect(() => {
    if (edit && currentUser) {
      const orgIds = currentUser.orgs
        ? currentUser.orgs.map((org) => org.id)
        : [];
      const corpIds = currentUser.corps
        ? currentUser.corps.map((corp) => corp.id)
        : [];
      const locIds = currentUser.locs
        ? currentUser.locs.map((loc) => loc.id)
        : [];

      dispatch(setOrgList(orgIds));
      dispatch(setCorpList(corpIds));
      dispatch(setLocList(locIds));
    } else {
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
      </div>

      <form onSubmit={handleSubmit}>
        <div className="xl:flex lg:flex md:flex 2k:flex 4k:flex flex-row gap-6">
          <CheckboxTable
            title="Select Organizations"
            options={organizations}
            onToggle={(item) => handleToggle("organization", item)}
            selections={selections.organization}
            loading={loadingOrganizations}
          />
          <CheckboxTable
            title="Select Corporates"
            options={corporates}
            onToggle={(item) => handleToggle("corporate", item)}
            selections={selections.corporate}
            loading={loadingCorporates}
          />
          <CheckboxTable
            title="Select Locations"
            options={locations}
            onToggle={(item) => handleToggle("location", item)}
            selections={selections.location}
            loading={loadingLocations}
          />
        </div>
        <div className="flex justify-end items-center gap-1">
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
            <span className="text-[12px] font-['Manrope']">Next</span>
            <MdChevronRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationDetailsForm;
