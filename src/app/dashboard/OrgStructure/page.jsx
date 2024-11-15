"use client";
import { useState, useEffect } from "react";
import {
  FaTrashAlt,
  FaEye,
  FaEdit,
  FaAngleRight,
  FaAngleDown,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import axiosInstance from "../../utils/axiosMiddleware";
import axios from "axios";
import Link from "next/link";
import Organization from "./forms/Organization/page";
import ConfirmationModal from "../../shared/components/ConfirmationModal";
import EntityView from "../../shared/components/EntityView";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";

const Table = ({ data, labels, currentIndex, rawData }) => {
  const [newrole, setRole] = useState("");
  const router = useRouter();
  const values1 = Object.values(data);
  const values = values1.filter((item, index) => index !== values1.length - 1);

  const [expanded, setExpanded] = useState(false);
  const [childExpanded, setChildExpanded] = useState(false);
  const [orgStruct, setOrgStruct] = useState(rawData);
  const [filteredEntity, setFilteredEntity] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("custom_role"); // Fetch the role

      if (storedRole) {
        setRole(storedRole); // Get role from localStorage
        console.log("Stored role:", storedRole);
      }
    }
  }, []);

  const minimumWidth = 70;
  const numberOfChildren = data.children.length;
  const widthPerEntity = 48;

  const handleExpand = () => {
    setExpanded(!expanded);
    if (labels[currentIndex] === "Location") {
      console.log(childExpanded, "childExpanded");
    }
  };

  const separateData = (orgStruct) => {
    const formattedOrganizations = [];
    const formattedCorporateEntities = [];
    const formattedLocations = [];

    console.log("inside separate data function, raw data ->", orgStruct);

    orgStruct?.forEach((org) => {
      formattedOrganizations.push({
        id: org.id,
        name: org.name,
        type_corporate_entity: org.type_corporate_entity,
        owner: org.owner,
        location_of_headquarters: org.location_of_headquarters,
        phone: org.phone,
        mobile: org.mobile,
        fax: org.fax,
        revenue: org.revenue,
        sector: org.sector,
        subindustry: org.subindustry,
        website: org.website,
        employeecount: org.employeecount,
        street: org.address,
        city: org.city,
        state: org.state,
        country: org.countryoperation,
        zipCode: org.zipCode,
        date_format: org.date_format,
        currency: org.currency,
        timezone: org.timezone,
        language: org.language,
        from_date: org.from_date,
        to_date: org.to_date,
        sdg: org.sdg,
        rating: org.rating,
        certification: org.certification,
        target: org.target,
        framework: org.framework,
        no_of_employees: org.no_of_employees,
        active: org.active,
        amount: org.amount,
        ownership_and_legal_form: org.ownership_and_legal_form,
        group: org.group,
        type_of_corporate_entity: org.type_of_corporate_entity,
        type_of_business_activities: org.type_of_business_activities,
        type_of_product: org.type_of_product,
        type_of_services: org.type_of_services,
      });

      org.corporatenetityorg.forEach((entity) => {
        formattedCorporateEntities.push({
          id: entity.id,
          name: entity.name,
          corporatetype: entity.corporatetype,
          ownershipnature: entity.ownershipnature,
          legalform: entity.legalform,
          ownership: entity.ownership,
          revenue: entity.revenue,
          sector: entity.sector,
          subindustry: entity.subindustry,
          website: entity.website,
          employeecount: entity.employeecount,
          address: entity.address,
          city: entity.city,
          state: entity.state,
          country: entity.Country,
          from_date: entity.from_date,
          to_date: entity.to_date,
          currency: entity.currency,
          date_format: entity.date_format,
          timezone: entity.timezone,
          language: entity.language,
          location_headquarters: entity.location_headquarters,
          phone: entity.phone,
          mobile: entity.mobile,
          fax: entity.fax,
          zipcode: entity.zipcode,
          framework: entity.framework,
          organization: entity.organization,
        });

        entity.location.forEach((location) => {
          formattedLocations.push({
            id: location.id,
            name: location.name,
            phone: location.phone,
            mobile: location.mobile,
            website: location.website,
            fax: location.fax,
            sector: location.sector,
            subindustry: location.sub_industry,
            employeecount: location.employeecount,
            revenue: location.revenue,
            streetaddress: location.streetaddress,
            city: location.city,
            state: location.state,
            country: location.country,
            zipCode: location.zipcode,
            date_format: location.dateformat,
            from_date: location.from_date,
            to_date: location.to_date,
            currency: location.currency,
            timezone: location.timezone,
            language: location.language,
            location_type: location.location_type,
            area: location.area,
            latitude: location.latitude,
            longitude: location.longitude,
          });
        });
      });
    });

    return {
      formattedOrganizations,
      formattedCorporateEntities,
      formattedLocations,
    };
  };

  const filterOrgStruct = (orgStruct, viewType, dataItem) => {
    const separatedData = separateData(orgStruct);
    console.log("filtering ->", viewType, dataItem);
    console.log("separated data", separatedData);

    if (viewType === "Corporate Entity") {
      const found = separatedData.formattedOrganizations.filter((item) => {
        console.log(
          "organisation comparison",
          item.name,
          dataItem["Organisation Name"]
        );
        return item.name === dataItem["Organisation Name"];
      });

      console.log("found", found);
      return found;
    } else if (viewType === "Location") {
      const found = separatedData.formattedCorporateEntities.filter((item) => {
        console.log("entity comparison", item.name, dataItem["Entity Name"]);
        return item.name === dataItem["Entity Name"];
      });
      console.log("found", found);
      return found;
    } else if (viewType === undefined) {
      const found = separatedData.formattedLocations.filter((item) => {
        console.log(
          "location comparison",
          item.name,
          dataItem["Location Unit"]
        );
        return item.name === dataItem["Location Unit"];
      });
      console.log("found", found);
      return found;
    }

    return orgStruct;
  };

  const [showEntityView, setShowEntityView] = useState(false);
  const [viewType, setViewType] = useState("");

  const handleEntityView = (type, item) => {
    setViewType(type);
    const filteredOrgStruct = filterOrgStruct(orgStruct, type, item);
    setFilteredEntity(filteredOrgStruct);
    setShowEntityView(true);
  };

  const closeEntityView = () => {
    setShowEntityView(false);
  };

  const handleEntityEdit = (type, item) => {
    setViewType(type);
    const filteredOrgStruct = filterOrgStruct(orgStruct, type, item);
    const dataToPass = {
      type: type,
      item: item,
      filteredData: filterOrgStruct(orgStruct, type, item),
    };
    console.log("data to pass", dataToPass);
    setFilteredEntity(filteredOrgStruct);
    const encodedData = encodeURIComponent(JSON.stringify(dataToPass));
    if (dataToPass.type === "Corporate Entity")
      router.push(
        `/dashboard/OrgStructure/forms/Organization?data=${encodedData}`
      );
    else if (dataToPass.type === "Location")
      router.push(`/dashboard/OrgStructure/forms/Entity?data=${encodedData}`);
    else
      router.push(`/dashboard/OrgStructure/forms/Location?data=${encodedData}`);
  };

  const handleEntityDelete = async (type, item) => {
    setIsDeleteConfirmationOpen(false);
    try {
      const filteredOrgStruct = await filterOrgStruct(orgStruct, type, item);
      console.log("item", filteredOrgStruct);
      if (!filteredOrgStruct || !filteredOrgStruct[0].id) {
        throw new Error("Invalid or missing ID from filteredOrgStruct");
      }

      let endpoint;
      if (type === "Corporate Entity") {
        endpoint = `${process.env.BACKEND_API_URL}/organization_activity/${filteredOrgStruct[0].id}/`;
      }
      if (type === "Location") {
        endpoint = `${process.env.BACKEND_API_URL}/corporate/${filteredOrgStruct[0].id}/`;
      } else if (type === undefined) {
        endpoint = `${process.env.BACKEND_API_URL}/location/${filteredOrgStruct[0].id}/`;
      }
      if (!endpoint) {
        throw new Error(`Endpoint not set for type: ${type}`);
      }

      await axiosInstance
        .delete(endpoint)
        .then((response) => {
          console.log(`Deleted ${type} with ID ${filteredOrgStruct[0].id}`);
          window.location.reload();
        })
        .catch((error) => {
          console.error(
            "Error deleting entity:",
            error.response ? error.response.data : error.message
          );
        });
    } catch (error) {
      console.error("Error in handleEntityDelete:", error.message);
    }
  };

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleDelete = (type, data) => {
    setIsDeleteConfirmationOpen(true);
  };

  const [isNewRole, setIsNewRole] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("custom_role"); // Fetch the role

      if (storedRole) {
        setIsNewRole(storedRole === "true"); // Get role from localStorage
        console.log("Stored role:", storedRole);
      }
    }
  }, []);

  return (
    <>
      <tr className="my-2 cursor-pointer">
        <td className="py-4 h-12 flex justify-center items-center">
          {data.children ? (
            expanded ? (
              <div>
                <div onClick={handleExpand}>
                  <FaAngleDown />
                </div>
                {labels[currentIndex] !== "" && numberOfChildren ? (
                  <div
                    className="h-[0px] absolute rotate-90 border border-sky-600"
                    style={{
                      width: `${
                        minimumWidth + numberOfChildren * widthPerEntity
                      }px`,
                      left: `calc(-1.7rem - ${numberOfChildren} * 1.5rem)`,
                      top: `calc(4.5rem + ${numberOfChildren} * 1.3rem)`,
                      background:
                        "linear-gradient(90deg, #007EEF 0%, #2AE4FF 100%)",
                    }}
                  ></div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="flex items-center">
                {labels[currentIndex] !== "Corporate Entity" ? (
                  <div className="w-[25px] h-[0px] border border-sky-600 ms-4"></div>
                ) : (
                  ""
                )}
                <div onClick={handleExpand}>
                  <FaAngleRight />
                </div>
              </div>
            )
          ) : (
            ""
          )}
        </td>
        {values.map((item, index) => {
          return (
            <td className="py-2" key={index}>
              {item}
            </td>
          );
        })}
        <td className="py-2 px flex justify-left items-center space-x-3 text-neutral-500">
          <FaEye
            style={{ fontSize: "20px" }}
            onClick={() => handleEntityView(labels[currentIndex], data)}
          />
          {isNewRole && (
            <>
              <FaEdit
                style={{ fontSize: "20px" }}
                onClick={() => handleEntityEdit(labels[currentIndex], data)}
              />
              <FaTrashAlt
                style={{ fontSize: "20px" }}
                onClick={() => handleDelete(labels[currentIndex], data)}
              />
            </>
          )}
        </td>
      </tr>
      {data.children && expanded && (
        <tr>
          <td colSpan={values.length + 2}>
            <div style={{ margin: "10px 0 10px 0px" }}>
              <TableList
                data={data.children}
                labels={labels}
                currentIndex={currentIndex}
                rawData={rawData}
              />
            </div>
          </td>
        </tr>
      )}
      {showEntityView && (
        <EntityView
          onClose={closeEntityView}
          data={filteredEntity}
          viewType={viewType}
        />
      )}
      <div>
        <ConfirmationModal
          isOpen={isDeleteConfirmationOpen}
          onClose={closeDeleteConfirmation}
          onConfirm={() => handleEntityDelete(labels[currentIndex], data)}
          message="Are you sure you want to delete this entity?"
        />
      </div>
    </>
  );
};

const TableList = ({ data, labels, currentIndex, rawData }) => {
  if (!data || data.length === 0) {
    return (
      <p className="flex justify-center items-center text-red-600">
        No Data available
      </p>
    );
  }

  const propertyNames1 = Object.keys(data[0]);
  const propertyNames = propertyNames1.filter(
    (item) => item !== "children" && item !== "id"
  );

  return (
    <div className="my-4 ms-4">
      <div
        className={`flex justify-between items-center w-2/3 ${
          labels[currentIndex] === "location" ? "ms-[27px]" : "ms-[10px]"
        }`}
      >
        <div
          className={`w-full h-[31px] text-neutral-500 text-[17px] font-bold leading-snug tracking-tight ${
            labels[currentIndex] !== "Location" ? "" : "ms-12"
          }`}
        >
          {labels[currentIndex]}
        </div>
      </div>
      <table className="w-full py-4 text-sm">
        <thead className="font-sm font-semibold border-b border-black border-opacity-10 ">
          <tr>
            <th className="py-2 text-left w-2"></th>
            {propertyNames.map((item, index) => (
              <th
                className="py-4 text-left text-neutral-500 text-xs font-bold leading-[15px]"
                key={index}
                style={{
                  width: `${
                    item === "Sub Industry"
                      ? "25%"
                      : 100 / (propertyNames.length + 1)
                  }%`,
                }}
              >
                {item}
              </th>
            ))}
            <th
              className="py-2 text-left text-neutral-500 text-xs font-bold leading-[15px]"
              style={{
                width: `${100 / (propertyNames.length + 5)}%`,
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <Table
              data={item}
              key={item.id}
              labels={labels}
              currentIndex={currentIndex + 1}
              rawData={rawData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Structure = () => {
  const levelLabels = ["Organisation", "Corporate Entity", "Location"];
  const [hData, setHData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [newrole, setRole] = useState("");
  const dispatch = useDispatch();

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };
  const token = getAuthToken();

  useEffect(() => {
    fetchHierarchy();
  }, [token]);

  const fetchHierarchy = () => {
    axiosInstance
      .get(`${process.env.BACKEND_API_URL}/structure`)
      .then((response) => {
        setRawData(response.data);
        const filtered = filterData(response.data);
        setHData(filtered);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const filterData = (data) => {
    const extractedData = data.map((org) => ({
      "Organisation Name": org.name,
      Country: org.countryoperation,
      Sector: org.sector,
      "Sub Industry": org.subindustry,
      children: org.corporatenetityorg?.map((entity) => ({
        "Entity Name": entity.name,
        "Sub-industry": entity.subindustry,
        Country: entity.Country,
        "No Of Employees": entity.employeecount,
        Revenue: entity.currency + " " + entity.revenue,
        children: entity.location?.map((location) => ({
          "Location Unit": location.name,
          "Location Type": location.typelocation,
          Address: location.streetaddress,
          City: location.city,
          "No Of Employees": location.employeecount,
          children: [],
        })),
      })),
    }));
    return extractedData;
  };
  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("Organizational Structure"));
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("custom_role"); // Fetch the role

      if (storedRole) {
        setRole(storedRole); // Get role from localStorage
        console.log("Stored role:", storedRole);
      }
    }
  }, []);
  const isNewRole = newrole === "true";
  return (
    <div className="w-full my-4">
      <div className="flex justify-end items-center space-x-2 me-8">
        {isNewRole && (
          <>
            <Link
              href={"/dashboard/OrgStructure/forms/Organization"}
              className="text-sky-600 text-xs font-bold leading-[15px] flex items-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all"
            >
              Add new Organisation
            </Link>
            <Link
              href={"/dashboard/OrgStructure/forms/Entity"}
              className="text-sky-600 text-xs font-bold leading-[15px] flex items-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all"
            >
              Add new Corporate
            </Link>
            <Link
              href={"/dashboard/OrgStructure/forms/Location"}
              className="text-sky-600 text-xs font-bold leading-[15px] flex items-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all"
            >
              Add new Location
            </Link>
          </>
        )}
      </div>

      <TableList
        data={hData}
        labels={levelLabels}
        currentIndex={0}
        rawData={rawData}
      />
    </div>
  );
};

export default Structure;
