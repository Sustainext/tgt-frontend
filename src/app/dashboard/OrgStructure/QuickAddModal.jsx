import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import industryList from "@/app/shared/data/sectors";
import { post } from "@/app/utils/axiosMiddleware";
import { useRouter } from "next/navigation";
import { showToast } from "@/app/utils/toastUtils";

const INITIAL_FORM_STATE = {
  name: "",
  country: "",
  state: "",
  city: "",
  sector: "",
  subIndustry: "",
  locationType: "",
};

const QuickAddModal = ({ isOpen, onClose, type, parentNode }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [subIndustries, setSubIndustries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const handleCancel = () => {
    setFormData(INITIAL_FORM_STATE);
    setFormErrors({});
    setSubIndustries([]);
    setStates([]);
    setCities([]);
    onClose();
  };

  useEffect(() => {
    // Only handle state/city updates for location type
    if (type === "location" && formData.country) {
      const statesOfCountry = State.getStatesOfCountry(formData.country);
      setStates(statesOfCountry);
      setCities([]);
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
    }
  }, [formData.country, type]);

  useEffect(() => {
    // Only handle city updates for location type
    if (type === "location" && formData.country && formData.state) {
      const citiesOfState = City.getCitiesOfState(
        formData.country,
        formData.state
      );
      setCities(citiesOfState);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.state, type]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is changed
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "sector") {
      const selectedIndustry = industryList.find(
        (industry) => industry.industry === value
      );
      setSubIndustries(selectedIndustry?.subIndustries || []);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (type === "location") {
      if (!formData.country) {
        errors.country = "Country is required";
      }
      // if (!formData.state) {
      //   errors.state = "State is required";
      // }
      // if (!formData.city) {
      //   errors.city = "City is required";
      // }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddMoreDetails = () => {
    onClose();
    switch (type) {
      case "organization":
        router.push("/dashboard/OrgStructure/forms/Organization");
        break;
      case "corporate":
        router.push("/dashboard/OrgStructure/forms/Entity");
        break;
      case "location":
        router.push("/dashboard/OrgStructure/forms/Location");
        break;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    let endpoint = "";
    let payload = {};
    let entityType = "";

    switch (type) {
      case "organization":
        endpoint = "/organization";
        entityType = "Organization";
        payload = {
          name: formData.name,
          countryoperation: formData.country,
          sector: formData.sector,
          type_corporate_entity: "Office",
          owner: "Default",
          phone: 9876543210,
          mobile: 9876543210,
          website: "https://www.sustainext.ai",
          fax: 234567,
          employeecount: 100,
          revenue: 100000,
          date_format: "mm/dd/yyyy",
          currency: "USD",
          timezone: "+00:00",
          language: "English",
          active: true,
          framework: "GRI",
          subindustry: formData.subIndustry || "Default",
          address: formData.address || "Bengaluru",
          state: formData.state || "Karnataka",
          city: formData.city || "Bengaluru",
          from_date: formData.from_date || null,
          to_date: formData.to_date || null,
          no_of_employees: 100,
          amount: null,
          ownership_and_legal_form: null,
          group: null,
          type_of_corporate_entity: formData.type || "Default",
          location_of_headquarters: formData.location || "Bengaluru",
          sub_industry: "Default",
          type_of_business_activities: null,
          type_of_product: null,
          type_of_services: null,
          sdg: "SDG1",
          rating: "rating1",
          certification: null,
          target: null,
          username: "mahinder.singh@sustainext.ai",
        };
        break;

      case "corporate":
        endpoint = "/corporate";
        entityType = "Corporate entity";
        payload = {
          name: formData.name,
          Country: formData.country,
          sector: formData.sector,
          subindustry: formData.subIndustry,
          organization: parentNode.name,
          corporatetype: "Default",
          ownershipnature: "Default",
          location_headquarters: "Default",
          phone: 9876543210,
          mobile: 9876543210,
          website: "https://www.sustainext.ai",
          fax: 234567,
          employeecount: 100,
          revenue: 100000,
          currency: "USD",
          timezone: "+00:00",
          language: "English",
          date_format: "mm/dd/yyyy",
          framework: "GRI: With reference to",
        };
        break;

      case "location":
        endpoint = "/locationonlyview";
        entityType = "Location";
        payload = {
          name: formData.name,
          typelocation: formData.locationType,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          corporateentity: parentNode.name,
          currency: "USD",
          dateformat: "mm/dd/yyyy",
          phone: 9876543210,
          mobile: 9876543210,
          website: "https://www.sustainext.ai",
          fax: 234567,
          timezone: "+00:00",
          employeecount: 100,
          language: "English",
          revenue: 100000,
          area: 56775,
        };
        break;
    }

    try {
      await post(endpoint, payload);
      showToast(`${entityType} added successfully`);
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    } catch (error) {
      showToast(`Failed to add ${entityType.toLowerCase()}`, 'error');
      console.error("Error adding:", error);
    }
  };

  const renderLocationFields = () => {
    if (type !== "location") return null;

    return (
      <>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Type
          </label>
          <input
            type="text"
            name="locationType"
            value={formData.locationType}
            onChange={handleInputChange}
            className={`w-full border ${
              formErrors.locationType ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 text-sm`}
            placeholder="Type"
          />
          {formErrors.locationType && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.locationType}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className={`w-full border ${
              formErrors.country ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 text-sm`}
          >
            <option value="">Select Country</option>
            {Country.getAllCountries().map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
          {formErrors.country && (
            <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`w-full border ${
              formErrors.state ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 text-sm`}
            disabled={!formData.country}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
          {formErrors.state && (
            <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full border ${
              formErrors.city ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 text-sm`}
            disabled={!formData.state}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {formErrors.city && (
            <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
          )}
        </div>
      </>
    );
  };

  const renderParentInfo = () => {
    if (type === "organization") return null;

    return (
      <div className="mb-4">
        {type === "location" ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-start sm:space-x-6 space-y-4 sm:space-y-0">
            <div className="flex flex-col">
              <div className="text-sm text-gray-600 mb-1">Organization</div>
              <div className="inline-block px-3 py-1 rounded-md text-sm bg-blue-100 text-blue-800">
                {parentNode.organization}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-gray-600 mb-1">Corporate Entity</div>
              <div className="inline-block px-3 py-1 rounded-md text-sm bg-green-100 text-green-800">
                {parentNode.name}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-sm text-gray-600 mb-2">Organization</div>
            <div className="inline-block px-3 py-1 rounded-md text-sm bg-blue-100 text-blue-800">
              {parentNode.name}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] max-h-[90vh] table-scrollbar overflow-y-auto">
        <h2 className="text-xl font-medium mb-1">
          Quick Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Add {type} quickly with just the necessary details
        </p>

        {renderParentInfo()}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {type.charAt(0).toUpperCase() + type.slice(1)} Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full border ${
              formErrors.name ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 text-sm`}
            placeholder="Name"
          />
          {formErrors.name && (
            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
          )}
        </div>

        {renderLocationFields()}

        {type !== "location" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {(type === "organization" || type === "corporate") && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sector
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="">Select Sector</option>
                {industryList.map((industry) => (
                  <option key={industry.id} value={industry.value}>
                    {industry.industry}
                  </option>
                ))}
              </select>
            </div>

            {type === "corporate" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Industry
                </label>
                <select
                  name="subIndustry"
                  value={formData.subIndustry}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  disabled={!formData.sector}
                >
                  <option value="">Select Sub Industry</option>
                  {subIndustries.map((subIndustry) => (
                    <option key={subIndustry.id} value={subIndustry.value}>
                      {subIndustry.subIndustry}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        <button
          onClick={handleAddMoreDetails}
          className="text-blue-600 text-sm hover:text-blue-700 mb-6 flex items-center"
        >
          <span>Add More Details</span>
          <span className="ml-1">→</span>
        </button>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
