"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import RadioWidget2 from "../../../../shared/widgets/Input/radioWidget2";
import { MdInfoOutline, MdKeyboardArrowDown } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { toast } from "react-toastify";

// 🟢 Custom Radio Widget
const widgets = { RadioWidget2 };

const view_path = "gri-environment-air-quality-ods_production-import-export";
const client_id = 1;
const user_id = 1;

// 🟢 Form Schema & UI Schema
const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      produceODS: {
        type: "string",
        title:
          "Does your organisation produce ODS in its processes, products and services?",
        enum: ["Yes", "No"],
      },
      importODS: {
        type: "string",
        title:
          "Does your organisation import ODS in its processes, products and services?",
        enum: ["Yes", "No"],
      },
      exportODS: {
        type: "string",
        title:
          "Does your organisation export ODS in its processes, products and services?",
        enum: ["Yes", "No"],
      },
      useODSFeedstock: {
        type: "string",
        title: "Does your organisation use ODS as feedstock?",
        enum: ["Yes", "No"],
      },
      destroyODS: {
        type: "string",
        title:
          "Does your organisation destroy ODS using approved technologies?",
        enum: ["Yes", "No"],
      },
    },
    required: [
      "produceODS",
      "importODS",
      "exportODS",
      "useODSFeedstock",
      "destroyODS",
    ],
  },
};

const uiSchema = {
  "ui:options": {
    addable: false, // Prevent adding new rows
    orderable: false, // Prevent reordering
    removable: false, // Prevent removal of entries
  },
  items: {
    produceODS: {
      "ui:title":
        "Does your organisation produce ODS in its processes, products and services?",
      "ui:widget": "RadioWidget2",
      "ui:options": { label: true },
      "ui:tooltip":
        "Indicate whether your organisation produce ODS in its processes, products and services.",
    },
    importODS: {
      "ui:title":
        "Does your organisation import ODS in its processes, products and services?",
      "ui:widget": "RadioWidget2",
      "ui:options": { label: true },
      "ui:tooltip":
        "Indicate whether your organisation import ODS in its processes, products and services.",
    },
    exportODS: {
      "ui:title":
        "Does your organisation export ODS in its processes, products and services?",
      "ui:widget": "RadioWidget2",
      "ui:options": { label: true },
      "ui:tooltip":
        "Indicate whether your organisation export ODS in its processes, products and services.",
    },
    useODSFeedstock: {
      "ui:title": "Does your organisation use ODS as feedstock?",
      "ui:widget": "RadioWidget2",
      "ui:options": { label: true },
      "ui:tooltip": "Indicate whether your organisation use ODS as feedstock.",
    },
    destroyODS: {
      "ui:title":
        "Does your organisation destroy ODS using approved technologies?",
      "ui:widget": "RadioWidget2",
      "ui:options": { label: true },
      "ui:tooltip":
        "Indicate whether your organisation destroy ODS using approved technologies?",
    },
  },
};

// 🟢 Accordion Item Component
const AccordionItem = ({
  title,
  children,
  tooltiptext,
  sdg,
  display,
  selectedOrg,
  setOrgMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();
  const handleClick = () => {
    if (!selectedOrg) {
      setOrgMessage("Please select an organization.");
      return;
    }
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 xl:mx-3 lg:mx-3 md:mx-3 2xl:mx-3 4k:mx-3 2k:mx-3 mx-1`}
    >
      <button
        className="py-3 text-left flex w-[100%]"
        onClick={handleClick} // Unique ID for the tooltip, spaces replaced by dashes
      >
        <div className="block w-full xl:flex lg:flex md:flex 2xl:flex 4k:flex">
          <div className="flex w-full xl:w-[75%] lg:w-[75%] md:w-[75%] 4k:w-[75%] 2xl:w-[75%]">
            <div className="flex w-[95%] xl:w-[75%] lg:w-[75%] md:w-[75%] 4k:w-[75%] 2xl:w-[75%] mb-2">
              <div className="flex items-center">
                <h5 className="text-[15px] text-[#344054] px-3 font-[500]">
                  {title}
                </h5>
              </div>
            </div>
            <div className="block xl:hidden lg:hidden md:hidden 2xl:hidden 4k:hidden  w-[5%]">
              <MdKeyboardArrowDown
                className={`text-2xl float-end me-1 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
          <div className="w-full xl:w-[25%] lg:w-[25%] 2xl:w-[25%] 4k:w-[25%] md:w-[25%]">
            <div
              className={`flex float-start xl:float-end lg:float-end 2xl:float-end md:float-end`}
            >
              {isOpen ? (
                <>
                  {sdg &&
                    sdg.map((sdgItem, index) => (
                      <div
                        key={index}
                        className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2"
                        style={{ display: display }}
                      >
                        <p className="text-[#0057A5] text-[10px] inline-block align-middle px-2 font-semibold">
                          {sdgItem}
                        </p>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  {sdg &&
                    sdg.map((sdgItem, index) => (
                      <div
                        key={index}
                        className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2"
                      >
                        <p className="text-[#0057A5] text-[10px] inline-block align-middle px-2 font-semibold">
                          {sdgItem}
                        </p>
                      </div>
                    ))}
                </>
              )}
              <MdKeyboardArrowDown
                className={`text-2xl hidden xl:block lg:block md:block 2xl:block 4k:block ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </button>
      {isOpen && <div className="py-4 px-3">{children}</div>}
    </div>
  );
};

// 🟢 Main Screen1 Component (Inside AccordionItem)
const Screen1 = forwardRef(
  ({ selectedOrg, year, selectedCorp, togglestatus, setOrgMessage }, ref) => {
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [formData, setFormData] = useState([{}]);
    const [loopen, setLoOpen] = useState(false);
    const { open } = GlobalState();
    const toastShown = useRef(false);

    const LoaderOpen = () => setLoOpen(true);
    const LoaderClose = () => setLoOpen(false);

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
      console.log("🟢 useEffect Triggered");
      console.log("selectedOrg:", selectedOrg);
      console.log("year:", year);
      console.log("selectedCorp:", selectedCorp);
      console.log("togglestatus:", togglestatus);

      if (selectedOrg && year && togglestatus) {
        if (togglestatus === "Corporate" && selectedCorp) {
          console.log(
            "✅ Calling loadFormData() - Corporate level with selectedCorp"
          );
          loadFormData();
        } else if (togglestatus === "Corporate" && !selectedCorp) {
          console.log(
            "⚠️ Clearing form data - Corporate selected but no selectedCorp"
          );
          setFormData([{}]);
          setRemoteSchema({});
          setRemoteUiSchema({});
        } else {
          console.log("✅ Calling loadFormData() - Organization level");
          loadFormData();
        }

        console.log("🔄 Resetting toastShown to false");
        toastShown.current = false;
      } else {
        if (!toastShown.current) {
          console.log("⚠️ Missing required fields: selectedOrg or year");
          toastShown.current = true;
        }
      }
    }, [selectedOrg, year, selectedCorp, togglestatus]);

    const handleChange = (e) => {
      setFormData(e.formData);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      updateFormData();
    };

    useImperativeHandle(ref, () => updateFormData);

    return (
      <AccordionItem
        title="ODS Production, Import & Export"
        tooltiptext="This section documents data corresponding to the production, import, export, and destruction of ODS."
        selectedOrg={selectedOrg}
        setOrgMessage={setOrgMessage}
        sdg={["GRI 305-6a", "GRI 305-6d"]}
      >
        <div className="mx-2">
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
          />
        </div>

        <div className={`${open ? "mb-[3rem]" : "mb-4"}`}>
          <button
            className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 float-end"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        {loopen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <Oval height={50} width={50} color="#00BFFF" />
          </div>
        )}
      </AccordionItem>
    );
  }
);

export default Screen1;
