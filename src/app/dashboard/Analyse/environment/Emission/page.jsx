'use client'
import React, { useEffect, useState } from "react";
import ScopeTable from "./ScopeTable";
import SourceTable from "./SourceTable";
import LocationTable from "./LocationTable";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { yearInfo } from "../../../../shared/data/yearInfo";

const AnalyseEmission = () => {
  const [analyseData, setAnalyseData] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [scopeData, setScopeData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [corporates, setCorporates] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/analyseview`,
        {
          params: {
            username: "mahinder.singh@sustainext.ai",
            year: selectedYear,
          },
        }
      );

      const data = response.data;
      const keyToUse = selectedCorp || "";
      const selectedData = data[keyToUse];

      if (selectedData) {
        const { source, scope, location } = selectedData;
        const formattedLocation = location.map((loc, index) => ({
          sno: String(index + 1),
          location: loc.location_name,
          ageContribution: `${loc.contribution_scope}%`,
          totalemissions: String(loc.total_co2e),
        }));
        const formattedScope = scope.map((s, index) => ({
          sno: String(index + 1),
          scope: s.scope_name,
          ageContribution: `${s.contribution_scope}%`,
          totalemissions: String(s.total_co2e),
        }));
        const formattedSource = source.map((src, index) => ({
          sno: String(index + 1),
          source: src.source_name,
          ageContribution: `${src.contribution_source}%`,
          totalemissions: String(src.total_co2e),
        }));
        setScopeData(formattedScope);
        setSourceData(formattedSource);
        setLocationData(formattedLocation);
      } else {
        console.log("Organisation not found in the data");
      }

      const resultArray = Object.keys(data).map((key) => ({
        key: key,
        value: data[key],
      }));

      setAnalyseData(resultArray);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCorp, selectedYear]);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await axiosInstance.get(
          `/orggetonly`
        );
        setOrganisations(response.data);
        setSelectedOrg(response.data[0].id);
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
          const response = await axiosInstance.get(
            `/corporate/`,
            {
              params: { organization_id: selectedOrg },
            }
          );
          setCorporates(response.data);
        } catch (e) {
          console.error("Failed fetching corporates:", e);
        }
      }
    };

    fetchCorporates();
  }, [selectedOrg]);

  return (
    <>
      <div className="my-4 pb-5 mx-5 text-left">
        <div className="mb-2 flex items-center py-4 px-3 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 w-[80%] mb-4">
            <div className="mr-2">
              <label
                htmlFor="cname"
                className="text-neutral-800 text-[13px] font-normal"
              >
                Select Organization
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={selectedOrg}
                  onChange={(e) => setSelectedOrg(e.target.value)}
                >
                  <option value="">--Select Organization--</option>
                  {organisations?.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mr-2">
              <label
                htmlFor="cname"
                className="text-neutral-800 text-[13px] font-normal"
              >
                Select Corporate
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={selectedCorp}
                  onChange={(e) => setSelectedCorp(e.target.value)}
                >
                  <option value="">--Select Corporate--</option>
                  {corporates?.map((corp) => (
                    <option key={corp.id} value={corp.name}>
                      {corp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mr-2">
              <label
                htmlFor="cname"
                className="text-neutral-800 text-[13px] font-normal"
              >
                Select Year
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="" disabled>
                    --Select Year--
                  </option>
                  {yearInfo.map((year) => (
                    <option key={year} value={year.slice(0, 4)}>
                      {year.slice(0, 4)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mx-8"></div>
        </div>
      </div>
      <div className="mt-8">
        <ScopeTable data={scopeData} />
      </div>
      <div className="mt-8">
        <SourceTable data={sourceData} />
      </div>
      <div className="mt-8">
        <LocationTable data={locationData} />
      </div>
    </>
  );
};
export default AnalyseEmission;
