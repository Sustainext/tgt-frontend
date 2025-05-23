"use client";
import React, { useState, useEffect, useRef,useMemo } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";

import LoctiondropdwonTable from "../../../../shared/widgets/Economic/loctiondropdwonTable";

const widgets = {
  LoctiondropdwonTable: LoctiondropdwonTable,
};

const view_path =
  "gri-economic-anti_corruption-comm_and_training-205-2a-governance_body_members";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "array", // Specify that Q1 is an array
        items: {
          type: "object", // Each item in Q1 is an object
          properties: {
            RegionName: { type: "string" },
            Totalnumberanticorruption: { type: "string" },
            Totalnumberbodymembers: { type: "string" },
          },
        },
      },
    },
  },
};

const uiSchema = {
  "ui:order": ["Q1"],
  items: {
    Q1: {
      "ui:widget": "LoctiondropdwonTable",
      "ui:options": {
        titles: [
          {
            title: "Location Name",
            tooltip:
              "Specify the name of the location where the organization’s anti-corruption policies and procedures have been communicated to governance body members.",
            widgettype: "select",
            tooltipdisplay: "block",
          },
          {
            title:
              "Total number of governance body members that the organization's anti-corruption policies and procedures have been communicated to",
            tooltip:
              "SMention the total number of employees that the organization's anti-corruption policies and procedures have been communicated to.",
            widgettype: "input",
            tooltipdisplay: "block",
          },
          {
            title: "Total number of governance body members in that region.",
            tooltip:
              "Mention the total number of governance body members in that region.",
            widgettype: "input",
            tooltipdisplay: "block",
          },
        ],
      },
    },
    "ui:options": {
      orderable: false,
      addable: true,
      removable: true,
    },
  },
};

const Screen1 = ({
  selectedOrg,
  year,
  selectedCorp,
  setDatarefresh,
  togglestatus,
}) => {
  const [formData, setFormData] = useState([
    {
      Q1: [
        {
          RegionName: "",
          Totalnumberanticorruption: "",
          Totalnumberbodymembers: "",
        },
      ],
    },
  ]);
  const [locationdata, setLocationdata] = useState(); // Initialize as empty array
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

  const updateFormData = async () => {
    const data = {
      client_id,
      user_id,
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
        setDatarefresh(1);
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
  const facthloctiondata = async () => {
    setLocationdata();
    const url = `${process.env.BACKEND_API_URL}/sustainapp/get_location_as_per_org_or_corp/?corporate=${selectedCorp}&organization=${selectedOrg}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("Location data:", response.data);
      setLocationdata(response.data);
    } catch (error) {
      setLocationdata();
    } finally {
      LoaderClose();
    }
  };
  const loadFormData = async () => {
    LoaderOpen();
    setFormData([{}]);

    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);

      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data);
    } catch (error) {
      setFormData([{}]);
    } finally {
      LoaderClose();
    }
  };
  useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        loadFormData();
        facthloctiondata();
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setFormData([
          {
            Q1: [
              {
                RegionName: "",
                Totalnumberanticorruption: "",
                Totalnumberbodymembers: "",
              },
            ],
          },
        ]);
        setRemoteSchema({});
        setRemoteUiSchema({});
      } else {
        loadFormData();
        facthloctiondata();
      }

      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [selectedOrg, year, selectedCorp, togglestatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData();
    console.log("Form data:", formData);
  };
  console.log("Location data: locationdata", locationdata);

  const customWidgets = useMemo(() => ({
            ...widgets,
            LoctiondropdwonTable: (props) => (
              <LoctiondropdwonTable
                {...props}
                locationdata={locationdata}
              />
            ),
          }), [widgets, locationdata]);
  return (
    <>
     <div
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md mt-8 xl:mt-0 lg:mt-0 md:mt-0 2xl:mt-0 4k:mt-0 2k:mt-0 "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex">
          <div className="w-[100%] xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] relative mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Total number of governance body members that the organization’s
              anti-corruption policies and procedures have been communicated to,
              broken down by region.
              <MdInfoOutline
                data-tooltip-id={`es26`}
                data-tooltip-html="Specify the total number of governance body members that the organization’s anti-corruption policies and procedures have been communicated to, broken down by region."
                className="mt-1.5 ml-2 text-[15px] w-[20%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
              />
              <ReactTooltip
                id={`es26`}
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
              />
            </h2>
          </div>
          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 205-2a
                </div>
              </div>
            </div>
          </div>
        </div>

        {Array.isArray(locationdata) && locationdata.length > 0 ? (
          <div className="mx-2">
            <Form
              schema={r_schema}
              uiSchema={r_ui_schema}
              formData={formData}
              onChange={handleChange}
              validator={validator}
              widgets={customWidgets}
            />
          </div>
        ) : (
          <div className="mx-2"></div>
        )}

        <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              (!selectedCorp && togglestatus === "Corporate") ||
              !selectedOrg ||
              !year
                ? "cursor-not-allowed opacity-90"
                : ""
            }`}
            onClick={handleSubmit}
            disabled={
              (togglestatus === "Corporate" && !selectedCorp) ||
              (togglestatus !== "Corporate" && (!selectedOrg || !year))
            }
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
