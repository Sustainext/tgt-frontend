import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BenefitsWidget from "../../../../shared/widgets/benefitsWidget";
import axiosInstance from "@/app/utils/axiosMiddleware";

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      benefits: { type: "string", title: "Benefits" },
    },
  },
};

const uiSchema = {
  "ui:widget": "BenefitsWidget",
};
const view_path = "gri-social-benefits-401-2a-benefits_provided_tab_2";
const client_id = 1;
const user_id = 1;
const Tab2 = ({ selectedOrg, selectedCorp, year }) => {
    const [formData, setFormData] = useState([{ benefits: [] }]); // Initialize with empty benefits array
    const [loopen, setLoOpen] = useState(false);
    const [locationdata, setLocationdata] = useState([]);
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const toastShown = useRef(false);
  
    const LoaderOpen = () => setLoOpen(true);
    const LoaderClose = () => setLoOpen(false);
  
    const updateFormData = async () => {
      LoaderOpen();
      const data = {
        client_id: 1,
        user_id: 1,
        path: view_path,
        form_data: formData,
        corporate: selectedCorp,
        organisation: selectedOrg,
        year,
      };
  
      try {
        const response = await axiosInstance.post(
          `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`,
          data
        );
        if (response.status === 200) {
          toast.success("Data added successfully", { autoClose: 3000 });
        } else {
          toast.error("Oops, something went wrong", { autoClose: 1000 });
        }
      } catch (error) {
        toast.error("Oops, something went wrong", { autoClose: 1000 });
      } finally {
        LoaderClose();
      }
    };
  
    const fetchLocationData = async () => {
      LoaderOpen();
      try {
        const response = await axiosInstance.get(
          `${process.env.BACKEND_API_URL}/sustainapp/get_location_as_per_org_or_corp/?corporate=${selectedCorp}&organization=${selectedOrg}`
        );
        setLocationdata(response.data);
      } catch (error) {
        console.error("Failed to fetch location data", error);
      } finally {
        LoaderClose();
      }
    };
    const loadFormData = async () => {
        LoaderOpen();
        setFormData([{ benefits: [] }]);
        const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
        try {
          const response = await axiosInstance.get(url);
          console.log("API called successfully:", response.data);
          setRemoteSchema(response.data.form[0].schema);
          setRemoteUiSchema(response.data.form[0].ui_schema);
          setFormData(response.data.form_data[0].data);
        } catch (error) {
          setFormData([{ benefits: [] }]);
        } finally {
          LoaderClose();
        }
      };
    
    useEffect(() => {
      if (selectedOrg && year) {
        loadFormData();
        fetchLocationData();
      
        toastShown.current = false;
      } else if (!toastShown.current) {
        toastShown.current = true;
      }
    }, [selectedOrg, year, selectedCorp]);
  
    const handleFormDataChange = (updatedBenefits) => {
      setFormData([{ benefits: updatedBenefits }]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("from data",formData)
      updateFormData();
    };
  
    return (
      <>
        <div>
          {locationdata.length > 0 ? (
        <div className="mx-2">
              <Form
                schema={r_schema}
                uiSchema={r_ui_schema}
                formData={formData}
                onChange={({ formData }) => setFormData(formData)}
                validator={validator}
                widgets={{
                  BenefitsWidget: (props) => (
                    <BenefitsWidget
                      {...props}
                      locationdata={locationdata}
                      initialBenefits={formData[0].benefits || []}
                      onBenefitsChange={(updatedBenefits) =>
                        handleFormDataChange(updatedBenefits)
                      }
                    />
                  ),
                }}
              />
            </div>
          ) : (
            <div className="mx-2"></div>
          )}
          <div className="mt-4 me-1">
            <button
              type="button"
              className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
                !selectedOrg || !year ? "cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={!selectedOrg || !year}
            >
              Submit
            </button>
          </div>
        </div>
        {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      </>
    );
  };
  
  export default Tab2;
