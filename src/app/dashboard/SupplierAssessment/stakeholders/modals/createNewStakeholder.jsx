"use client";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { MdAdd } from "react-icons/md";
import { Country, State, City } from "country-state-city";

const CreateStakeholder = ({ isModalOpen, setIsModalOpen }) => {
  const router = useRouter();
  const [supplierName, setSupplierName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [spoc, setSpoc] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [latError, setLatError] = useState("");
  const [lonError, setLonError] = useState("");
  const [stakeholderCreated, setStakeholderCreated] = useState(false);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const handleCountryChange = (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);

    const statesOfSelectedCountry = State.getStatesOfCountry(countryId);
    setStates(statesOfSelectedCountry);
  };

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    setSelectedState(stateId);

    const citiesOfSelectedState = City.getCitiesOfState(
      selectedCountry,
      stateId
    );
    setCities(citiesOfSelectedState);
    console.log(selectedCountry, event.target.value, citiesOfSelectedState);
  };

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
  };

  const getLatitudeDirection = (lat) => {
    if (lat === "") return "";
    if (lat > 0) return "N";
    if (lat < 0) return "S";
    return "";
  };

  const getLongitudeDirection = (lon) => {
    if (lon === "") return "";
    if (lon > 0) return "E";
    if (lon < 0) return "W";
    return "";
  };

  const handleLatitudeChange = (e) => {
    const value = e.target.value;
    setLatitude(value);

    if (value === "") {
      setLatError("");
    } else if (isNaN(value) || value < -90 || value > 90) {
      setLatError("Latitude must be between -90 and 90.");
    } else {
      setLatError("");
    }
  };

  const handleLongitudeChange = (e) => {
    const value = e.target.value;
    setLongitude(value);

    if (value === "") {
      setLonError("");
    } else if (isNaN(value) || value < -180 || value > 180) {
      setLonError("Longitude must be between -180 and 180.");
    } else {
      setLonError("");
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000080] z-50 mt-12">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[40%] max-w-3xl">
            {stakeholderCreated ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          d="M10 0.364746C15.5228 0.364746 20 4.8419 20 10.3647C20 15.8876 15.5228 20.3647 10 20.3647C4.47715 20.3647 0 15.8876 0 10.3647C0 4.8419 4.47715 0.364746 10 0.364746ZM14.198 7.4228C13.9811 7.20585 13.6443 7.18174 13.4007 7.35048L13.3141 7.4228L8.75 11.9872L6.69194 9.92889L6.60538 9.85657C6.3618 9.68783 6.02502 9.71193 5.80806 9.92889C5.5911 10.1458 5.56699 10.4826 5.73574 10.7262L5.80806 10.8128L8.30806 13.3128L8.39462 13.3851C8.60775 13.5327 8.89225 13.5327 9.10538 13.3851L9.19194 13.3128L14.198 8.30669L14.2703 8.22013C14.4391 7.97654 14.415 7.63976 14.198 7.4228Z"
                          fill="#54B054"
                        />
                      </svg>
                    </div>
                    <h2 className="text-black text-[18px] font-bold">
                      Stakeholder Created
                    </h2>
                  </div>

                  <button
                    className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setIsModalOpen(false);
                      setStakeholderCreated(false);
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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
                <p className="text-[#667085] text-[14px] mb-4">
                  New Stakeholder “Stakeholderszzz” has been created.
                </p>

                <div className="flex gap-3 mt-6 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setStakeholderCreated(false);
                    }}
                    className="bg-transparent text-[15px] text-[#344054] px-5 py-2 rounded-md border border-gray-300"
                  >
                    Back to Stakeholders List
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStakeholderCreated(false);
                    }}
                    className="bg-blue-500 flex gap-1 text-[15px] text-white px-5 py-2 rounded-md hover:bg-blue-600"
                  >
                    Add Another <MdAdd className="mt-0.5 w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-black text-[18px] font-bold">
                    Create New Stakeholder
                  </h2>

                  <button
                    className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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

                <p className="text-[#667085] text-[14px] mb-4">
                  Enter details for the new stakeholder
                </p>
                <form>
                  <div className="flex gap-4 w-full">
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="name"
                        className="block text-[13px] font-medium text-[#344054]"
                      >
                        Stakeholder Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        placeholder="Enter Supplier name"
                        className="mt-1 block px-3 py-2 w-full rounded-md border border-gray-300 text-sm"
                        required
                      />
                    </div>

                    <div className="mb-4 w-full">
                      <label
                        htmlFor="email"
                        className="block text-[13px] font-medium text-[#344054]"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Supplier email"
                        className="mt-1 block px-3 py-2 w-full rounded-md border border-gray-300 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-[13px] font-medium text-[#344054]"
                    >
                      Address
                    </label>
                    <textarea
                      rows={3}
                      id="address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      className={`border appearance-none text-sm border-gray-300 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full`}
                    />
                  </div>

                  <div className="flex gap-4 w-full">
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="country"
                        className="block text-[13px] font-medium text-[#344054]"
                      >
                        Country
                      </label>

                      <select
                        name="country"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="border border-gray-300 rounded-md w-full px-3 py-2 text-neutral-500 text-xs font-normal leading-tight"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="state"
                        className="block text-[13px] font-medium text-[#344054]"
                      >
                        State
                      </label>

                      <select
                        name="state"
                        value={selectedState}
                        onChange={handleStateChange}
                        className="border border-gray-300 rounded-md w-full px-3 py-2 text-neutral-500 text-xs font-normal leading-tight"
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="city"
                      className="block text-[13px] font-medium text-[#344054]"
                    >
                      City
                    </label>

                    <select
                      name="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      className="border border-gray-300 rounded-md w-full px-3 py-2 text-neutral-500 text-xs font-normal leading-tight"
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-4 w-full">
                    {/* Latitude Input */}
                    <div className="mb-4 w-full relative">
                      <label className="block text-[13px] font-medium text-[#344054]">
                        Latitude
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="latitude"
                          value={latitude}
                          onChange={handleLatitudeChange}
                          placeholder="Enter Latitude"
                          className={`mt-1 block px-3 py-2 w-full rounded-md border ${
                            latError ? "border-red-500" : "border-gray-300"
                          } text-sm`}
                          required
                        />
                        {/* Direction (N/S) beside input */}
                        <span className="absolute right-3 top-2 text-gray-500 text-[13px]">
                          {getLatitudeDirection(latitude)}
                        </span>
                      </div>
                      {latError && (
                        <p className="text-red-500 text-xs mt-1">{latError}</p>
                      )}
                    </div>

                    {/* Longitude Input */}
                    <div className="mb-4 w-full relative">
                      <label className="block text-[13px] font-medium text-[#344054]">
                        Longitude
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="longitude"
                          value={longitude}
                          onChange={handleLongitudeChange}
                          placeholder="Enter Longitude"
                          className={`mt-1 block px-3 py-2 w-full rounded-md border ${
                            lonError ? "border-red-500" : "border-gray-300"
                          } text-sm`}
                          required
                        />
                        {/* Direction (E/W) beside input */}
                        <span className="absolute right-3 top-2 text-gray-500 text-[13px]">
                          {getLongitudeDirection(longitude)}
                        </span>
                      </div>
                      {lonError && (
                        <p className="text-red-500 text-xs mt-1">{lonError}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="spoc"
                      className="block text-[13px] font-medium text-[#344054]"
                    >
                      SPOC
                    </label>
                    <input
                      type="text"
                      id="spoc"
                      value={spoc}
                      onChange={(e) => setSpoc(e.target.value)}
                      placeholder="Enter Spoc"
                      className="mt-1 block px-3 py-2 w-full rounded-md border border-gray-300 text-sm"
                      required
                    />
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setStakeholderCreated(true);
                      }}
                      className="bg-blue-500 text-white px-10 py-2 rounded-md hover:bg-blue-600"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateStakeholder;
