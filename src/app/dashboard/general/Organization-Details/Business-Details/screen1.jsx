"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import inputWidget2 from "../../../../shared/widgets/Input/inputWidget2";
import SectorstableWidget from "../../../../shared/widgets/Table/SectorstableWidget"
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
const widgets = {
  SectorstableWidget: SectorstableWidget,
};

const view_path = "gri-general-entities-list_of_entities-2-2-a";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Sectors: {
        type: "string",
        title: "Report the sector/sectors in which the organization is active",
      },
    },
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Sectors"],
    Sectors: {
      "ui:title": "Report the sector/sectors in which the organization is active",
      "ui:tooltip":
        "Please specify the sector/sectors in which the organization is active.e.g. Sectors can be identified according to categories, such as the public or private sector; orindustry-specific categories, such as the education sector or the financial sector.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "SectorstableWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },

    "ui:options": {
      orderable: false, // Prevent reordering of items
      addable: false, // Prevent adding items from UI
      removable: false, // Prevent removing items from UI
      layout: "horizontal", // Set layout to horizontal
    },
  },
};

const Screen1 = ({ selectedOrg, year, selectedCorp }) => {
  const initialData = [{ Sector: "Sector 1", Sub_industry: "Industry 1" },{ Sector: "Sector 2", Sub_industry: "Industry 2" },{ Sector: "Sector 4", Sub_industry: "" }];
  const [tabledata, settabledata] = useState(initialData);
  const [formData, setFormData] = useState(initialData);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const { open } = GlobalState();

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleChange = (e) => {
    setFormData(e.formData);
  };


  const updatedUiSchema = {
    ...uiSchema,
    items: {
      ...uiSchema.items,
      Sectors: {
        ...uiSchema.items.Sectors,
        "ui:options": {
          ...uiSchema.items.Sectors["ui:options"],
          tabledata, // Pass tabledata here
        },
      },
    },
  };
  const updateFormData = async () => {
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: formData,
      corporate: selectedCorp,
      organisation: selectedOrg,
      year,
    };
    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status === 200) {
        toast.success("Data added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        LoaderClose();
        loadFormData();
      } else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      }
    } catch (error) {
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      LoaderClose();
    }
  };

  // const loadFormData = async () => {
  //   LoaderOpen();
  //   setFormData([{}]);
  //   const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
  //   try {
  //     const response = await axiosInstance.get(url);
  //     console.log("API called successfully:", response.data);
  //     setRemoteSchema(response.data.form[0].schema);
  //     setRemoteUiSchema(response.data.form[0].ui_schema);
  //     setFormData(response.data.form_data[0].data);
  //   } catch (error) {
  //     setFormData([{}]);
  //   } finally {
  //     LoaderClose();
  //   }
  // };
  // useEffect(() => {
  //   if (selectedOrg && year) {
  //     loadFormData();
  //     toastShown.current = false;
  //   } else {
  //     if (!toastShown.current) {
  //       toastShown.current = true;
  //     }
  //   }
  // }, [selectedOrg, year, selectedCorp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // updateFormData();
    console.log("test form data", formData);
  };

  useEffect(() => {
    console.log('Initial formData:', formData); // Check initial formData
  }, []);

  useEffect(() => {
    console.log('Updated formData:', formData); // Log whenever formData updates
  }, [formData]);
  return (
    <>
      <div
        className="mx-2 p-3 mb-6 pb-6 rounded-md"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 text-[17px] text-gray-500 font-semibold mb-2">
            Organisation's sector/sectors
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e25`}
              data-tooltip-content="This section documents data corresponding to the sector/sectors in which the organization is active.  "
              className="mt-1.5 ml-2 text-[14px]"
            />
            <ReactTooltip
              id={`tooltip-$e25`}
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "left",
              }}
            ></ReactTooltip>
            </h2>
          </div>

          <div className="w-[20%]">
            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
              <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                GRI 2-6a
              </p>
            </div>
          </div>
        </div>
        {selectedOrg && year && (
          <p className="flex mx-2 text-sm text-gray-700">
           Report the sector/sectors in which the organization is active
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e29`}
              data-tooltip-content="Please specify the sector/sectors in which the organization is active.
e.g. Sectors can be identified according to categories, such as the public or private sector; or
industry-specific categories, such as the education sector or the financial sector. "
              className="mt-1.5 ml-2 text-[14px]"
            />
            <ReactTooltip
              id={`tooltip-$e29`}
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "left",
              }}
            ></ReactTooltip>
          </p>
        )}
        <div className="mx-2 mb-2">
          <Form
            schema={schema}
            uiSchema={updatedUiSchema.items.Sectors}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}

          />
        </div>
        <div className="flex justify-between right-1  mx-2">

        </div>
        <div className="mb-6">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              !selectedOrg || !year ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            // disabled={!selectedOrg || !year}
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

export default Screen1;
