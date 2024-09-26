"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import axiosInstance from "../../../utils/axiosMiddleware";
import EmissionWidget from "../../../shared/widgets/emissionWidget";
import { Oval } from "react-loader-spinner";
import { useEmissions } from "./EmissionsContext";
import CalculateSuccess from "./calculateSuccess";

const view_path = "gri-environment-emissions-301-a-scope-1";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Emission: {
        type: "string",
        title: "Emissionsscop1",
      },
    },
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Emission"],
    Emission: {
      "ui:widget": "EmissionWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    "ui:options": {
      orderable: false,
      addable: false,
      removable: false,
      layout: "horizontal",
    },
  },
};

const Scope1 = forwardRef(
  (
    { location, year, month, successCallback, countryCode, setAccordionOpen },
    ref
  ) => {
    const [formData, setFormData] = useState([{}]);
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [loopen, setLoOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const { climatiqData, setScope1Data } = useEmissions();
    const [localClimatiq, setLocalClimatiq] = useState(0);
    const [activityCache, setActivityCache] = useState({});

    useImperativeHandle(ref, () => ({
      updateFormData() {
        return updateFormData(formData);
      },
    }));

    useEffect(() => {
      setScope1Data(formData);
    }, [formData]);

    const LoaderOpen = () => {
      setLoOpen(true);
    };

    const LoaderClose = () => {
      setLoOpen(false);
    };

    const handleChange = (e) => {
      console.log("handleChange triggered");
      setFormData(e.formData);
      console.log("Updated form data in handleChange:", e.formData);
    };

    const handleCombinedWidgetChange = (
      index,
      field,
      value,
      activityId,
      unitType,
      name,
      url,
      filetype,
      size,
      uploadDateTime
    ) => {
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData];
        const currentEmission = updatedFormData[index]?.Emission || {};

        // Update the form data with the new file details
        updatedFormData[index] = {
          ...updatedFormData[index],
          Emission: {
            ...currentEmission,
            [field]: value,
            ...(activityId !== undefined && { activity_id: activityId }),
            ...(unitType !== undefined && { unit_type: unitType }),
            ...(name &&
              url &&
              filetype &&
              size &&
              uploadDateTime && {
                file: {
                  name,
                  url,
                  type: filetype,
                  size,
                  uploadDateTime,
                },
              }),
          },
        };

        return updatedFormData;
      });

      // Log to ensure the formData is updated correctly
      console.log("Updated form data:", formData);
    };

    const handleAddNew = () => {
      setFormData((prevFormData) => [...prevFormData, { Emission: {} }]);
      console.log(formData, "test data");
    };

    const handleRemoveRow = async (index) => {
      console.log(`Removing row at index: ${index}`); // Log for debugging
    
      const parsedIndex = parseInt(index, 10); // Parse the index just to be sure
    
      // First update the formData
      const updatedData = formData.filter((_, i) => i !== parsedIndex);
    
      setFormData(updatedData); // This updates the state immediately
    
      try {
        // Always call updateFormData, even if the form data is empty
        await updateFormData(updatedData); // Wait for updateFormData to complete
        successCallback(); // Trigger success callback after data is updated
    
        // Close the accordion or modal if the first row is deleted
        if (index === 0) {
          setAccordionOpen(false);
        }
      } catch (error) {
        console.error("Failed to update form data:", error);
      }
    };
    
    useEffect(() => {
      console.log("formData has been updated:", formData);
    }, [formData]);
    const updateFormData = async (formData) => {
      LoaderOpen();
      const data = {
        client_id: client_id,
        user_id: user_id,
        path: view_path,
        form_data: formData,
        location,
        year,
        month,
      };

      const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
      try {
        const response = await axiosInstance.post(url, { ...data });
      } catch (error) {
        setModalData({
          message: "Oops, something went wrong",
        });
      } finally {
        LoaderClose();
      }
    };

    const updateFormDatanew = (updatedData) => {
      setFormData(updatedData);
    };

    const updateCache = (subcategory, activities) => {
      setActivityCache((prevCache) => ({
        ...prevCache,
        [subcategory]: activities,
      }));
    };
    const loadFormData = async () => {
      LoaderOpen();
      setFormData([{}]);
      const base_url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=`;
      const url = `${base_url}${view_path}&&client_id=${client_id}&&user_id=${user_id}&&location=${location}&&year=${year}&&month=${month}`;

      axiosInstance
        .get(url)
        .then((response) => {
          setRemoteSchema(response.data.form[0].schema);
          setRemoteUiSchema(response.data.form[0].ui_schema);
          const form_parent = response.data.form_data;
          const f_data = form_parent[0].data;
          setFormData(f_data);

          LoaderClose();
        })
        .catch((error) => {
          console.log(error);
          LoaderClose();
        });
    };

    useEffect(() => {
      loadFormData();
    }, [year, month, location]);

    return (
      <>
        <div>
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={{
              EmissionWidget: (props) => (
                <EmissionWidget
                  {...props}
                  scope="scope1"
                  year={year}
                  countryCode={countryCode}
                  onChange={({
                    type,
                    value,
                    activityId,
                    unitType,
                    name,
                    url,
                    filetype,
                    size,
                    uploadDateTime,
                  }) =>
                    handleCombinedWidgetChange(
                      props.id.split("_")[1],
                      type,
                      value,
                      activityId,
                      unitType,
                      name,
                      url,
                      filetype,
                      size,
                      uploadDateTime
                    )
                  }
                  onRemove={handleRemoveRow}
                  index={props.id.split("_")[1]}
                  activityCache={activityCache}
                  updateCache={updateCache}
                />
              ),
            }}
          ></Form>
        </div>
        <div>
          <button
            className="mt-4  text-[#007EEF] px-4 py-2 rounded-md text-[14px]"
            onClick={handleAddNew}
          >
            + Add new
          </button>
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

        {modalData && (
          <CalculateSuccess
            data={modalData}
            onClose={() => setModalData(null)}
          />
        )}
      </>
    );
  }
);

export default Scope1;
