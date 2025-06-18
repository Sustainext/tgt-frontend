"use client";
import React, { useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Disclosureselection = ({ showToast, setView, fetchTcfdStatus }) => {
  const [disclosureData, setDisclosureData] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const selectedOrg = useSelector((state) => state.Tcfd.Organization);
  const selectedCorp = useSelector((state) => state.Tcfd.Corporate);
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const Back = () => setView("home");

  useEffect(() => {
    fetchDisclosures();
  }, [selectedOrg, selectedCorp]);
  const fetchDisclosures = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/tcfd_framework/tcfd-collect-disclosures/?organization=${selectedOrg}&corporate=${selectedCorp}`
      );

      if (res.data?.data) {
        setDisclosureData(res.data.data);

        // Auto-select those marked as `selected: true`
        const initiallySelected = [];
        Object.values(res.data.data).forEach((group) => {
          group.disclosures.forEach((disclosure) => {
            if (disclosure.selected) {
              initiallySelected.push(disclosure.id);
            }
          });
        });
        setSelectedIds(initiallySelected);
      }
    } catch (error) {
      console.error("Error fetching disclosures:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setLoading(true);

    if (selectedIds.length === 0) {
      setFormError("Please select at least one disclosure.");
      setLoading(false); // prevent infinite loader
      return;
    }

    setFormError("");

    try {
      const response = await axiosInstance.put(
        `${process.env.BACKEND_API_URL}/tcfd_framework/selected-disclosures/`,
        {
          organization: selectedOrg,
          corporate: selectedCorp,
          recommended_disclosures: selectedIds,
        }
      );

      if (response.status === 200) {
        const msg = response.data?.message;

        showToast(
          msg?.header || "Import Successful",
          msg?.body || "Data has been imported successfully.",
          msg?.gradient || "linear-gradient(to right, #F98845, #6ADF23)"
        );
        setView("home");
        fetchTcfdStatus();
        // Optionally reload disclosures if needed:
        // loadFormData();
      }
    } catch (error) {
      console.error("Error saving disclosures:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-[22px] font-bold gradient-text mb-2">
          TCFD Disclosure Selection
        </h2>
        <button
          className="flex items-center mb-2 text-sm text-gray-800 border px-3 py-1 rounded"
          onClick={Back}
        >
          <MdChevronLeft className="text-lg mr-1" />
          Back
        </button>
      </div>

      <div>
        <p className="text-[#343A40] text-[17px] font-semibold mb-4">
          Select TCFD Disclosures
        </p>
        <p className="text-[14px] text-[#667085] mb-2">
          Select the checkbox in the heading of each disclosure only if the
          recommended disclosure topic is material to your organization.
        </p>
        <p className="text-[14px] text-[#667085] mb-6 flex">
          <strong className="block me-1">Note:</strong> Under the Task Force on
          Climate-related Financial Disclosures (TCFD) framework, companies are
          expected to disclose information aligned with the 11 recommended
          disclosures or only on those that are deemed material.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Oval height={40} width={40} color="#2563EB" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg text-left bg-white">
            <thead className="text-gray-700 text-sm">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 w-1/2">
                  TCFD core elements
                </th>
                <th className="px-6 py-3 border-b border-gray-200">
                  Recommended Disclosures
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(disclosureData).map(([core, value]) => (
                <tr key={core} className="align-top border-t border-gray-200">
                  <td className="px-6 py-4 text-sm border-r border-gray-200">
                    <div className="font-medium text-[#667085] mb-1">
                      {core}
                    </div>
                    <div className="text-[#667085]">{value.description}</div>
                  </td>
                  <td className="px-4 py-4 text-sm relative">
                    {value.disclosures.map((disclosure) => (
                      <div
                        key={disclosure.id}
                        onClick={() => toggleSelection(disclosure.id)} // <- click anywhere
                        className="mb-4 flex text-sm cursor-pointer w-full gap-2"
                      >
                        <div>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(disclosure.id)}
                            readOnly // <- prevent React warning since we're controlling value
                            className="mt-1 form-checkbox h-[17px] w-[16px] cursor-pointer green-checkbox"
                          />
                        </div>
                        <div>{disclosure.description}</div>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {formError && (
        <p className="text-red-500 italic text-sm mt-6 text-right">
          {formError}
        </p>
      )}

      <div className="text-right mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded text-white font-medium ${
            saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Disclosureselection;
