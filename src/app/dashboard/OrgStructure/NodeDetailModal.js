import { useState, useEffect, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { useRouter } from "next/navigation";
import { showToast } from "@/app/utils/toastUtils";


const NodeDetailModal = ({
  isOpen,
  onClose,
  nodeData,
  nodeType,
  rawData,
  isAdmin,
}) => {
  const router = useRouter();
  const modalRef = useRef(null);
  const [details, setDetails] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  // Handle edit navigation
  const handleEdit = () => {
    let filteredDetails = {};

    if (details) {
      if (nodeType === "organization") {
        // Organization format based on your original Structure code
        filteredDetails = {
          id: details.id,
          name: details.name,
          type_corporate_entity: details.type_corporate_entity,
          owner: details.owner,
          phone: details.phone,
          mobile: details.mobile,
          website: details.website,
          fax: details.fax,
          employeecount: details.employeecount || details.no_of_employees,
          revenue: details.revenue,
          sector: details.sector,
          subindustry: details.subindustry || details.sub_industry,
          street: details.address,
          country: details.country,
          state: details.state,
          city: details.city,
          timezone: details.timezone,
          language: details.language,
          date_format: details.date_format,
          currency: details.currency,
          from_date: details.from_date,
          to_date: details.to_date,
          active: details.active,
          amount: details.amount,
          ownership_and_legal_form: details.ownership_and_legal_form,
          group: details.group,
          type_of_business_activities: details.type_of_business_activities,
          type_of_product: details.type_of_product,
          type_of_services: details.type_of_services,
          location_of_headquarters: details.location_of_headquarters,
          sdg: details.sdg,
          rating: details.rating,
          certification: details.certification,
          target: details.target,
          framework: details.framework,
        };
      } else if (nodeType === "corporate") {
        // Corporate format based on your original Structure code
        filteredDetails = {
          id: details.id,
          name: details.name,
          corporatetype: details.corporatetype,
          owner: details.ownershipnature || details.ownership,
          legalform: details.legalform,
          ownership: details.ownership,
          revenue: details.revenue,
          sector: details.sector,
          subindustry: details.subindustry,
          website: details.website,
          employeecount: details.employeecount,
          street: details.address,
          country: details.country,
          state: details.state,
          city: details.city,
          from_date: details.from_date,
          to_date: details.to_date,
          currency: details.currency,
          date_format: details.date_format,
          timezone: details.timezone,
          language: details.language,
          location_of_headquarters:
            details.location_headquarters || details.location_of_headquarters,
          phone: details.phone,
          mobile: details.mobile,
          fax: details.fax,
          zipcode: details.zipcode,
          framework: details.framework,
          organization: details.organization, // Keep the parent organization reference
        };
      } else if (nodeType === "location") {
        // Filter only location relevant fields
        filteredDetails = {
          id: details.id,
          name: details.name,
          typelocation: details.typelocation || details.location_type,
          currency: details.currency,
          dateformat: details.dateformat || details.date_format,
          phone: details.phone,
          mobile: details.mobile,
          website: details.website,
          fax: details.fax,
          sector: details.sector,
          sub_industry: details.sub_industry,
          timezone: details.timezone,
          employeecount: details.employeecount,
          language: details.language,
          corporate_data:details.corporate_data,
          revenue: details.revenue,
          street: details.streetaddress,
          country: details.country,
          state: details.state,
          city: details.city,
          zipcode: details.zipcode || details.zipCode,
          from_date: details.from_date,
          to_date: details.to_date,
          latitude: details.latitude,
          longitude: details.longitude,
          location_type: details.location_type,
          area: details.area,
          corporate: details.corporate,
          organization: details.organization,
        };
      }
    }

    const dataToPass = {
      type: nodeType === "corporate" ? "Corporate Entity" : nodeType,
      item: nodeData,
      filteredData: [filteredDetails],
    };

    const encodedData = encodeURIComponent(JSON.stringify(dataToPass));

    // Navigate based on entity type
    if (nodeType === "organization") {
      router.push(
        `/dashboard/OrgStructure/forms/Organization?data=${encodedData}`
      );
    } else if (nodeType === "corporate") {
      router.push(`/dashboard/OrgStructure/forms/Entity?data=${encodedData}`);
    } else if (nodeType === "location") {
      router.push(`/dashboard/OrgStructure/forms/Location?data=${encodedData}`);
    }

    onClose();
  };

  // When delete button is clicked
  const handleDeleteClick = (entity, type) => {
    setSelectedEntity(entity);
    setIsDeleteModalOpen(true);
  };

  // Handle the actual deletion
  const handleEntityDelete = async () => {
    try {
      let endpoint = "";
      let entityTypeDisplay = "";
      console.log("node type delete triggered!", nodeType);
      switch (nodeType) {
        case "organization":
          endpoint = `/organization_activity/${details.id}/`;
          entityTypeDisplay = "Organization";
          break;
        case "corporate":
          endpoint = `/corporate/${details.id}/`;
          entityTypeDisplay = "Corporate entity";
          break;
        case "location":
          endpoint = `/location/${details.id}/`;
          entityTypeDisplay = "Location";
          break;
        default:
          throw new Error(`Invalid entity type: ${nodeType}`);
      }

      await axiosInstance.delete(endpoint);
      showToast(`${entityTypeDisplay} deleted successfully`);
      setIsDeleteModalOpen(false);
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    } catch (error) {
      showToast("Failed to delete entity", "error");
      console.error(
        "Error deleting entity:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (isOpen && nodeData && rawData) {
      let foundDetails = null;

      switch (nodeType) {
        case "location": {
          // Find organization containing this location
          const org = rawData.find((o) =>
            o.corporatenetityorg?.some((c) =>
              c.location?.some((l) => l.id === nodeData.id)
            )
          );
          // Find corporate entity containing this location
          const corp = org?.corporatenetityorg?.find((c) =>
            c.location?.some((l) => l.id === nodeData.id)
          );
          // Find the location itself
          const loc = corp?.location?.find((l) => l.id === nodeData.id);

          foundDetails = {
            ...loc,
            type: "location",
            organization: org?.name,
            corporate: corp?.name,
            organization_data: org,
            corporate_data: corp,
            breadcrumb: [org?.name, corp?.name, loc?.name],
          };
          break;
        }
        case "corporate": {
          const org = rawData.find((o) =>
            o.corporatenetityorg?.some((c) => c.id === nodeData.id)
          );
          const entity = org?.corporatenetityorg?.find(
            (c) => c.id === nodeData.id
          );

          foundDetails = {
            ...entity,
            type: "corporate",
            organization: org?.name,
            organization_data: org,
            breadcrumb: [org?.name, entity?.name],
            // Include any corporate specific fields
            corporatetype: entity?.corporatetype,
            ownershipnature: entity?.ownershipnature,
            legalform: entity?.legalform,
            location_headquarters: entity?.location_headquarters,
          };
          break;
        }
        case "organization": {
          const org = rawData.find((o) => o.id === nodeData.id);
          foundDetails = {
            ...org,
            type: "organization",
            breadcrumb: [org?.name],
            // Include organization specific fields
            ownership_and_legal_form: org?.ownership_and_legal_form,
            type_of_corporate_entity: org?.type_of_corporate_entity,
            type_of_business_activities: org?.type_of_business_activities,
            group: org?.group,
          };
          break;
        }
      }

      console.log("Found Details:", foundDetails); // Debug log
      setDetails(foundDetails);
    }
  }, [isOpen, nodeData, nodeType, rawData]);

  if (!isOpen || !details) return null;

  return (
    <>
      <div className="fixed right-0 top-[5rem] z-50 flex justify-end border border-gray-300 rounded-xl h-[110vh]">
        <div
          ref={modalRef}
          className="w-[480px] bg-white shadow-xl h-full overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">
                <HiOutlineBuildingOffice2 className="w-5 h-5" />
              </span>
              <span className="font-medium text-lg">{details.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              {isAdmin && (
                <>
                  {/* Edit Button */}
                  <button
                    className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 
              hover:text-[#007eef] hover:border-[#007eef]"
                    type="button"
                    onClick={handleEdit}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mr-1.5"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:text-red-500 hover:border-red-500"
                    onClick={() => handleDeleteClick(details, details.type)}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mr-1.5"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                  </button>
                </>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="px-6 py-3 text-sm text-gray-600">
            {details.breadcrumb?.filter(Boolean).map((part, index) => (
              <span key={index}>
                {index > 0 && (
                  <FaChevronRight className="inline mx-2 text-gray-400" />
                )}
                {part}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="px-6 py-2 space-y-6">
            {/* General Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                General Information
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {nodeType === "location" && (
                  <div>
                    <label className="text-sm text-gray-600">
                      Location Type
                    </label>
                    <p className="text-sm text-gray-900">
                      {details.typelocation || "Default"}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-600">Sector</label>
                  <p className="text-sm text-gray-900">
                    {details.sector || "Default"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Sub Industry</label>
                  <p className="text-sm text-gray-900">
                    {details.sub_industry || details.subindustry || "Default"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    Employee Count
                  </label>
                  <p className="text-sm text-gray-900">
                    {details.employeecount ||
                      details.no_of_employees ||
                      0}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Revenue</label>
                  <p className="text-sm text-gray-900">
                    {details.revenue
                      ? `${details.currency || ""} ${details.revenue}`
                      : 0}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            {/* Address Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Address Information
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-600">Address</label>
                  <p className="text-sm text-gray-900">
                    {details.streetaddress || details.address || "-"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm text-gray-600">City</label>
                    <p className="text-sm text-gray-900">
                      {details.city || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">State</label>
                    <p className="text-sm text-gray-900">
                      {details.state || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Country</label>
                    <p className="text-sm text-gray-900">
                      {details.country ||
                        details.Country ||
                        details.countryoperation ||
                        "-"}
                    </p>
                  </div>
                  {nodeType === "location" && (
                     <div>
                     <label className="text-sm text-gray-600">Zip Code</label>
                     <p className="text-sm text-gray-900">
                       {details.zipCode || details.zipcode || "-"}
                     </p>
                   </div>
                  )}
                 
                </div>
              </div>
            </div>
            <hr />

            {/* Reporting Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Reporting Information
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm text-gray-600">From Date</label>
                  <p className="text-sm text-gray-900">
                    {details.from_date || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">To Date</label>
                  <p className="text-sm text-gray-900">
                    {details.to_date || "-"}
                  </p>
                </div>
                {/* <div className="col-span-2">
                  <label className="text-sm text-gray-600">
                    Reporting Frameworks
                  </label>
                  <p className="text-sm text-gray-900">
                    {details.framework || "-"}
                  </p>
                </div> */}
              </div>
            </div>
            <hr />

            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <p className="text-sm text-gray-900">
                    {details.phone || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Mobile</label>
                  <p className="text-sm text-gray-900">
                    {details.mobile || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Fax</label>
                  <p className="text-sm text-gray-900">{details.fax || "-"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Website</label>
                  <p className="text-sm text-gray-900">
                    {details.website || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        entityData={selectedEntity}
        entityType={nodeType}
        onConfirm={handleEntityDelete}
      />
    </>
  );
};

export default NodeDetailModal;
